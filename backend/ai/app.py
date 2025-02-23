import ee
import joblib
import numpy as np
from geopy.geocoders import Nominatim
from datetime import date, timedelta
from typing import Optional, Tuple, List, Dict, Any
from functools import lru_cache
import os
import sys

# Add the parent directory to Python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from src.logger import logger

# Constants for scale values
NDVI_SCALE = 250
LST_SCALE = 1000
BURNED_AREA_SCALE = 1000

# Initialize geolocator and model/scaler cache
geolocator = Nominatim(user_agent="geo_bounds_finder")
_model = None
_scaler = None

# Caching bounding box to avoid multiple API calls for the same city
@lru_cache(maxsize=100)  # Cache for 100 locations
def get_city_bounds(city_name: str, country_code: Optional[str] = None) -> Optional[Dict[str, float]]:
    """Retrieve the bounding box coordinates of a city."""
    try:
        query = f"{city_name}, {country_code}" if country_code else city_name
        logger.info("Fetching bounds for %s", query)
        location = geolocator.geocode(query, exactly_one=True)
        
        if location and "boundingbox" in location.raw:
            min_lat, max_lat, min_lon, max_lon = map(float, location.raw["boundingbox"])
            logger.info("Bounds obtained: (%s, %s, %s, %s)", min_lat, max_lat, min_lon, max_lon)
            return {
                "minlat": min_lat,
                "maxlat": max_lat,
                "minlong": min_lon,
                "maxlong": max_lon
            }
        logger.error("City coordinates not found for query: %s", query)
        return None
    except Exception as e:
        logger.error("Error in get_city_bounds: %s", e)
        return None

def authenticate_gee() -> None:
    """Authenticate and initialize Google Earth Engine."""
    try:
        logger.info("Authenticating Google Earth Engine...")
        ee.Authenticate()
        ee.Initialize(project='ee-ignisai')
        logger.info("Google Earth Engine initialized.")
    except Exception as e:
        logger.error("Failed to authenticate Earth Engine: %s", e)
        raise

def fetch_satellite_data(city: str, country_code: str) -> Tuple[Optional[List[float]], Optional[str]]:
    """Fetch NDVI, LST, and Burned Area data from Google Earth Engine."""
    try:
        logger.info("Fetching satellite data for %s, %s...", city, country_code)
        city_bounds = get_city_bounds(city, country_code)
        if not city_bounds:
            return None, "City coordinates not found"
        
        # Define date ranges
        today_ = date.today() - timedelta(days=1)
        prevWeek_ = today_ - timedelta(days=14)
        prevMonth_ = today_ - timedelta(days=45)
        logger.info("Time period - Today: %s, PrevWeek: %s, PrevMonth: %s", today_, prevWeek_, prevMonth_)

        today = ee.Date(str(today_))
        prevWeek = ee.Date(str(prevWeek_))
        prevMonth = ee.Date(str(prevMonth_))

        AREA = ee.Geometry.Rectangle([
            city_bounds['minlong'],
            city_bounds['minlat'],
            city_bounds['maxlong'],
            city_bounds['maxlat']
        ])
        logger.info("Defined city area from bounding box.")

        # Fetch NDVI (Monthly)
        ndvi_dataset = ee.ImageCollection("MODIS/061/MOD13Q1") \
            .filterDate(prevMonth, prevWeek) \
            .select('NDVI')
        scaled_ndvi_dataset = ndvi_dataset.map(lambda image: image.divide(10000))
        logger.info("Fetched and normalized NDVI dataset.")

        # Fetch LST (Weekly)
        lst_dataset = ee.ImageCollection("MODIS/061/MOD11A1") \
            .filterDate(prevWeek, today) \
            .select('LST_Day_1km')
        logger.info("Fetched LST dataset.")

        # Fetch Burned Area (Weekly)
        burned_area_dataset = ee.ImageCollection("MODIS/061/MOD14A1") \
            .filterDate(prevWeek, today) \
            .select('FireMask')
        logger.info("Fetched Burned Area dataset.")

        # Compute mean values
        logger.info("Computing mean values for NDVI, LST, and Burned Area...")
        ndvi_mean = scaled_ndvi_dataset.mean().reduceRegion(
            reducer=ee.Reducer.mean(),
            geometry=AREA,
            scale=NDVI_SCALE,
            maxPixels=1e13
        )
        lst_mean = lst_dataset.mean().reduceRegion(
            reducer=ee.Reducer.mean(),
            geometry=AREA,
            scale=LST_SCALE,
            maxPixels=1e13
        )
        burned_area_mean = burned_area_dataset.mean().reduceRegion(
            reducer=ee.Reducer.mean(),
            geometry=AREA,
            scale=BURNED_AREA_SCALE,
            maxPixels=1e13
        )
        
        try:
            finalNDVI = list(ndvi_mean.getInfo().values())[0]
            finalLST = list(lst_mean.getInfo().values())[0]
            finalBURNED = list(burned_area_mean.getInfo().values())[0]
            logger.info("Computed means - NDVI: %s, LST: %s, Burned Area: %s", finalNDVI, finalLST, finalBURNED)
        except Exception as inner_e:
            logger.error("Error extracting satellite data: %s", inner_e)
            return None, "Failed to fetch satellite data"

        return [finalNDVI, finalLST, finalBURNED], None
    except Exception as e:
        logger.error("Error in fetch_satellite_data: %s", e)
        return None, "Error in fetching satellite data"

def load_model() -> Tuple[Any, Any]:
    """Load the trained model and scaler if not already loaded."""
    global _model, _scaler
    try:
        if _model is None or _scaler is None:
            logger.info("Loading model and scaler...")
            _model = joblib.load("ai/models/random_forest_model.joblib")
            _scaler = joblib.load("ai/models/scaler.joblib")
            logger.info("Model and scaler loaded.")
        return _model, _scaler
    except Exception as e:
        logger.error("Error loading model and scaler: %s", e)
        raise

def predict_fire(features: List[float]) -> Tuple[Any, float]:
    """Predict wildfire risk using the trained model."""
    try:
        logger.info("Predicting wildfire risk...")
        model, scaler = load_model()
        scaled_features = scaler.transform(np.array([features]))
        prediction = model.predict(scaled_features)[0]
        probability = model.predict_proba(scaled_features)[0].max()
        logger.info("Prediction: %s, Probability: %s", prediction, probability)
        return prediction, probability
    except Exception as e:
        logger.error("Error in predict_fire: %s", e)
        raise

def get_fire_predictions(locations: List[Any]) -> List[List[Any]]:
    """
    Process multiple locations and return a 2D array:
    [ [Location, Fire or Not, Confidence], ... ]
    """
    results = []
    try:
        logger.info("Starting fire prediction process...")
        authenticate_gee()
        for location in locations:
            try:
                city = location.city
                country_code = location.country_code
                logger.info("Processing location: %s, %s", city, country_code)
                features, error = fetch_satellite_data(city, country_code)
                if error:
                    logger.error("Error for %s, %s: %s", city, country_code, error)
                    results.append([f"{city}, {country_code}", "Error", error])
                    continue

                prediction, probability = predict_fire(features)
                results.append([f"{city}, {country_code}", prediction, probability])
                logger.info("Result for %s, %s: Prediction = %s, Confidence = %s",
                             city, country_code, prediction, probability)
            except Exception as loc_e:
                logger.error("Error processing location %s, %s: %s",
                              location.city, location.country_code, loc_e)
                results.append([f"{location.city}, {location.country_code}", "Error", "Processing Error"])
        logger.info("Fire prediction process completed.")
        return results
    except Exception as e:
        logger.error("Critical error in get_fire_predictions: %s", e)
        return [["Global", "Error", "Critical failure"]]

if __name__ == '__main__':
    # Sample placeholder for testing get_fire_predictions
    class Location:
        def __init__(self, city: str, country_code: str) -> None:
            self.city = city
            self.country_code = country_code

    sample_locations = [
        Location("San Francisco", "US"),
        Location("NonexistentCity", "XX")
    ]
    results = get_fire_predictions(sample_locations)
    for result in results:
        logger.info(result)