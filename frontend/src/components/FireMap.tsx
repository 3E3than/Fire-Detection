import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Circle, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { baseurl } from "../lib/baseurl";
import LiveMonitoring from "./LiveMonitoring";

// Define TypeScript interface for wildfire data
interface Wildfire {
  id: number;
  location: string;
  latitude: number;
  longitude: number;
  radius: number;
  status: "Ongoing" | "Inactive";
}

// Function to determine color based on status
const getColor = (status: Wildfire["status"]): string => {
  switch (status) {
    case "Ongoing":
      return "red";
    case "Inactive":
      return "gray";
    default:
      return "blue";
  }
};

// Component to handle map events
const MapEventHandler = ({ onHover }: { onHover: (lat: number, lng: number) => void }) => {
  useMapEvents({
    mousemove: (e) => {
      onHover(e.latlng.lat, e.latlng.lng);
    }
  });
  return null;
};

const FireMap: React.FC = () => {
  const [wildfireLocations, setWildfireLocations] = useState<Wildfire[]>([]);
  const [mapView, setMapView] = useState<"standard" | "satellite">("standard");
  const [hoveredLocation, setHoveredLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [temperature, setTemperature] = useState<string | null>(null);
  const [showTempPopup, setShowTempPopup] = useState(false);
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch wildfire data from API using axios
  useEffect(() => {
    const fetchWildfireData = async () => {
      try {
        const response = await axios.get(`${baseurl}/api/wildfire`);
        setWildfireLocations(response.data);
      } catch (error) {
        console.error("Error fetching wildfire data", error);
      }
    };

    fetchWildfireData();
  }, []);

  // Function to fetch temperature for a specific location
  const fetchTemperature = async (lat: number, lng: number) => {
    try {
      const response = await axios.get(`https://api.open-meteo.com/v1/forecast`, {
        params: {
          latitude: lat,
          longitude: lng,
          current_weather: true,
        },
      });
      setTemperature(response.data.current_weather.temperature.toFixed(1));
      setShowTempPopup(true);
    } catch (error) {
      console.error("Error fetching temperature", error);
      setTemperature(null);
      setShowTempPopup(false);
    }
  };

  // Handle hover on the map
  const handleMapHover = (lat: number, lng: number) => {
    setHoveredLocation({ lat, lng });
    
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
    }
    
    hoverTimerRef.current = setTimeout(() => {
      fetchTemperature(lat, lng);
    }, 500);
  };

  // Clear temperature popup when location changes significantly
  useEffect(() => {
    if (hoveredLocation && showTempPopup) {
      const handleMouseMove = () => {
        setShowTempPopup(false);
      };
      
      window.addEventListener('mousemove', handleMouseMove);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, [showTempPopup, hoveredLocation]);

  return (
    <div>
      {/* Map View Filter */}
      <div className="mb-4 flex space-x-4 m-2">
        <button
          onClick={() => setMapView("standard")}
          className={`px-4 py-2 rounded-lg ${mapView === "standard"
            ? "bg-orange-500 text-white"
            : "bg-gray-200 text-gray-700"
          }`}
        >
          Standard View
        </button>
        <button
          onClick={() => setMapView("satellite")}
          className={`px-4 py-2 rounded-lg ${mapView === "satellite"
            ? "bg-orange-500 text-white"
            : "bg-gray-200 text-gray-700"
          }`}
        >
          Satellite View
        </button>
        <span> 
          <LiveMonitoring></LiveMonitoring>
        </span>
      </div>

      {/* Map Container */}
      <div className="relative">
        <MapContainer
          key={mapView}
          style={{ height: "500px", width: "100%" }}
          zoom={3}
          center={[20, 0]}
          scrollWheelZoom={true}
        >
          <MapEventHandler onHover={handleMapHover} />
          
          {/* Tile Layer Based on Selected View */}
          {mapView === "standard" ? (
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
          ) : (
            <TileLayer
              url="http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}"
              maxZoom={20}
              subdomains={["mt0", "mt1", "mt2", "mt3"]}
            />
          )}

          {/* Display Wildfire Locations */}
          {wildfireLocations.map((fire) => (
            <Circle
              key={fire.id}
              center={[fire.latitude, fire.longitude]}
              radius={fire.radius}
              color={getColor(fire.status)}
              fillColor={getColor(fire.status)}
              fillOpacity={0.5}
            >
              <Popup>
                <div className="p-2 rounded-md">
                  <strong className="text-red-600">🔥 Wildfire Alert</strong>
                  <div className="mt-1">
                    <b>Location:</b> {fire.location}
                  </div>
                  <div>
                    <b>Status:</b> <span className={fire.status === "Ongoing" ? "text-red-500" : "text-gray-500"}>{fire.status}</span>
                  </div>
                </div>
              </Popup>
            </Circle>
          ))}
        </MapContainer>
        
        {/* Floating temperature display */}
        {showTempPopup && hoveredLocation && temperature !== null && (
          <div 
            className="absolute bg-white rounded-lg shadow-lg p-3 z-[1000] border-2 border-orange-400"
            style={{
              top: '20px',
              right: '20px',
            }}
          >
            <div className="flex items-center">
              <div className="text-orange-500 mr-2 text-xl">
                {parseInt(temperature) > 30 ? '🔥' : parseInt(temperature) > 20 ? '☀️' : parseInt(temperature) > 10 ? '🌤️' : '❄️'}
              </div>
              <div>
                <div className="text-sm text-gray-500">Current Temperature</div>
                <div className="text-2xl font-bold">{temperature}°C</div>
                <div className="text-xs text-gray-400">
                  at {hoveredLocation.lat.toFixed(3)}, {hoveredLocation.lng.toFixed(3)}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FireMap;