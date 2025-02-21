import ee
import joblib
import numpy as np
from geopy.geocoders import Nominatim
from datetime import date, timedelta
import logging
from typing import Optional, Tuple, List, Dict, Any

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# Constants for scale values
NDVI_SCALE = 250
LST_SCALE = 1000
BURNED_AREA_SCALE = 1000

def authenticate_gee() -> None:
    """Authenticate and initialize Google Earth Engine."""
    try:
        logging.info("Authenticating Google Earth Engine...")
        ee.Authenticate()
        ee.Initialize(project='ee-ignisai')
        logging.info("Google Earth Engine initialized.")
    except Exception as e:
        logging.error("Failed to authenticate Earth Engine: %s", e)
        raise

def get_city_bounds(city_name: str, country_code: Optional[str] = None) -> Optional[Dict[str, float]]:
    """Retrieve the bounding box coordinates of a city."""
    try:
        query = f"{city_name}, {country_code}" if country_code else city_name
        logging.info("Fetching bounds for %s", query)
        geolocator = Nominatim(user_agent="geo_bounds_finder")
        location = geolocator.geocode(query, exactly_one=True)
        
        if location and "boundingbox" in location.raw:
            min_lat, max_lat, min_lon, max_lon = map(float, location.raw["boundingbox"])
            logging.info("Bounds obtained: (%s, %s, %s, %s)", min_lat, max_lat, min_lon, max_lon)
            return {
                "minlat": min_lat,
                "maxlat": max_lat,
                "minlong": min_lon,
                "maxlong": max_lon
            }
        logging.error("City coordinates not found for query: %s", query)
        return None
    except Exception as e:
        logging.error("Error in get_city_bounds: %s", e)
        return None

def fetch_satellite_data(city: str, country_code: str) -> Tuple[Optional[List[float]], Optional[str]]:
    """Fetch NDVI, LST, and Burned Area data from Google Earth Engine."""
    try:
        logging.info("Fetching satellite data for %s, %s...", city, country_code)
        city_bounds = get_city_bounds(city, country_code)
        if not city_bounds:
            return None, "City coordinates not found"
        
        # Define date ranges
        today_ = date.today() - timedelta(days=1)
        prevWeek_ = today_ - timedelta(days=14)
        prevMonth_ = today_ - timedelta(days=45)
        logging.info("Time period - Today: %s, PrevWeek: %s, PrevMonth: %s", today_, prevWeek_, prevMonth_)

        today = ee.Date(str(today_))
        prevWeek = ee.Date(str(prevWeek_))
        prevMonth = ee.Date(str(prevMonth_))

        AREA = ee.Geometry.Rectangle([
            city_bounds['minlong'],
            city_bounds['minlat'],
            city_bounds['maxlong'],
            city_bounds['maxlat']
        ])
        logging.info("Defined city area from bounding box.")

        # Fetch NDVI (Monthly)
        ndvi_dataset = ee.ImageCollection("MODIS/061/MOD13Q1") \
            .filterDate(prevMonth, prevWeek) \
            .select('NDVI')
        scaled_ndvi_dataset = ndvi_dataset.map(lambda image: image.divide(10000))
        logging.info("Fetched and normalized NDVI dataset.")

        # Fetch LST (Weekly)
        lst_dataset = ee.ImageCollection("MODIS/061/MOD11A1") \
            .filterDate(prevWeek, today) \
            .select('LST_Day_1km')
        logging.info("Fetched LST dataset.")

        # Fetch Burned Area (Weekly)
        burned_area_dataset = ee.ImageCollection("MODIS/061/MOD14A1") \
            .filterDate(prevWeek, today) \
            .select('FireMask')
        logging.info("Fetched Burned Area dataset.")

        # Compute mean values
        logging.info("Computing mean values for NDVI, LST, and Burned Area...")
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
            logging.info("Computed means - NDVI: %s, LST: %s, Burned Area: %s", finalNDVI, finalLST, finalBURNED)
        except Exception as inner_e:
            logging.error("Error extracting satellite data: %s", inner_e)
            return None, "Failed to fetch satellite data"

        return [finalNDVI, finalLST, finalBURNED], None
    except Exception as e:
        logging.error("Error in fetch_satellite_data: %s", e)
        return None, "Error in fetching satellite data"

def load_model() -> Tuple[Any, Any]:
    """Load the trained model and scaler."""
    try:
        logging.info("Loading model and scaler...")
        model = joblib.load("ai/models/random_forest_model.joblib")
        scaler = joblib.load("ai/models/scaler.joblib")
        logging.info("Model and scaler loaded.")
        return model, scaler
    except Exception as e:
        logging.error("Error loading model and scaler: %s", e)
        raise

def predict_fire(features: List[float]) -> Tuple[Any, float]:
    """Predict wildfire risk using the trained model."""
    try:
        logging.info("Predicting wildfire risk...")
        model, scaler = load_model()
        scaled_features = scaler.transform(np.array([features]))
        prediction = model.predict(scaled_features)[0]
        probability = model.predict_proba(scaled_features)[0].max()
        logging.info("Prediction: %s, Probability: %s", prediction, probability)
        return prediction, probability
    except Exception as e:
        logging.error("Error in predict_fire: %s", e)
        raise

def get_fire_predictions(locations: List[Any]) -> List[List[Any]]:
    """
    Process multiple locations and return a 2D array:
    [ [Location, Fire or Not, Confidence], ... ]
    """
    results = []
    try:
        logging.info("Starting fire prediction process...")
        authenticate_gee()
        for location in locations:
            try:
                city = location.city
                country_code = location.country_code
                logging.info("Processing location: %s, %s", city, country_code)
                features, error = fetch_satellite_data(city, country_code)
                if error:
                    logging.error("Error for %s, %s: %s", city, country_code, error)
                    results.append([f"{city}, {country_code}", "Error", error])
                    continue

                prediction, probability = predict_fire(features)
                results.append([f"{city}, {country_code}", prediction, probability])
                logging.info("Result for %s, %s: Prediction = %s, Confidence = %s",
                             city, country_code, prediction, probability)
            except Exception as loc_e:
                logging.error("Error processing location %s, %s: %s",
                              location.city, location.country_code, loc_e)
                results.append([f"{location.city}, {location.country_code}", "Error", "Processing Error"])
        logging.info("Fire prediction process completed.")
        return results
    except Exception as e:
        logging.error("Critical error in get_fire_predictions: %s", e)
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
        logging.info(result)
