import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Circle, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { baseurl } from "../lib/baseurl";

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

const FireMap: React.FC = () => {
  const [wildfireLocations, setWildfireLocations] = useState<Wildfire[]>([]);
  const [mapView, setMapView] = useState<"standard" | "satellite">("standard"); // State for map view
  const [hoveredLocation, setHoveredLocation] = useState<{ lat: number; lng: number } | null>(null); // State for hovered location
  const [temperature, setTemperature] = useState<string | null>(null); // State for temperature

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
      console.log("Fetching temperature for:", lat, lng); // Debugging
      const response = await axios.get(`${baseurl}/api/weather`, {
        params: { lat, lng },
      });
      console.log("Temperature response:", response.data); // Debugging
      setTemperature(response.data.temperature); // Assuming the API returns temperature in the response
    } catch (error) {
      console.error("Error fetching temperature", error);
    }
  };

  // Handle hover on a location
  const handleHover = (lat: number, lng: number) => {
    setHoveredLocation({ lat, lng });
    setTimeout(() => {
      if (hoveredLocation?.lat === lat && hoveredLocation?.lng === lng) {
        fetchTemperature(lat, lng); // Fetch temperature after a delay
      }
    }, 2000); // 2 seconds delay
  };

  // Handle mouse leave
  const handleMouseLeave = () => {
    setHoveredLocation(null);
    setTemperature(null);
  };

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
      </div>

      {/* Map Container */}
      <MapContainer
        key={mapView} // Force re-render when mapView changes
        style={{ height: "500px", width: "100%" }}
        zoom={3}
        center={[20, 0]}
        scrollWheelZoom={true}
      >
        {/* Tile Layer Based on Selected View */}
        {mapView === "standard" ? (
          <>
            {/* OpenStreetMap with Labels */}
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
          </>
        ) : (
          <>
            {/* Google Satellite with Labels */}
            <TileLayer
              url="http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}" // Google Satellite with labels
              maxZoom={20}
              subdomains={["mt0", "mt1", "mt2", "mt3"]}
            />
          </>
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
            eventHandlers={{
              mouseover: () => handleHover(fire.latitude, fire.longitude),
              mouseout: handleMouseLeave,
            }}
          >
            <Popup>
              <strong>🔥 Wildfire Alert</strong> <br />
              <b>Location:</b> {fire.location} <br />
              <b>Status:</b> {fire.status} <br />
              {temperature && (
                <>
                  <b>Temperature:</b> {temperature}°C
                </>
              )}
            </Popup>
          </Circle>
        ))}
      </MapContainer>
    </div>
  );
};

export default FireMap;