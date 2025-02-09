import React from "react";
import { MapContainer, TileLayer, Circle, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Define TypeScript interface for wildfire data
interface Wildfire {
  id: number;
  lat: number;
  lng: number;
  intensity: "Moderate" | "High" | "Severe";
  location: string;
}

// Sample wildfire locations
const wildfireLocations: Wildfire[] = [
  { id: 1, lat: 34.0522, lng: -118.2437, intensity: "High", location: "Los Angeles, CA" },
  { id: 2, lat: 40.7128, lng: -74.006, intensity: "Moderate", location: "New York, NY" },
  { id: 3, lat: 37.7749, lng: -122.4194, intensity: "Severe", location: "San Francisco, CA" },
];

// Function to determine radius based on intensity
const getRadius = (intensity: Wildfire["intensity"]): number => {
  switch (intensity) {
    case "Severe":
      return 50000; // 50 km for severe fires
    case "High":
      return 30000; // 30 km for high risk
    case "Moderate":
      return 15000; // 15 km for moderate risk
    default:
      return 10000;
  }
};

// Function to determine color based on intensity
const getColor = (intensity: Wildfire["intensity"]): string => {
  switch (intensity) {
    case "Severe":
      return "darkred";
    case "High":
      return "red";
    case "Moderate":
      return "orange";
    default:
      return "gray";
  }
};

const FireMap: React.FC = () => {
  return (
    <MapContainer
      style={{ height: "500px", width: "100%" }}
      zoom={3} // Set zoom level
      center={[20, 0]} // Initial center
      scrollWheelZoom={true}
    >
      {/* OpenStreetMap Tile Layer */}
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Display Wildfire Locations */}
      {wildfireLocations.map((fire) => (
        <Circle
          key={fire.id}
          center={[fire.lat, fire.lng]}
          radius={getRadius(fire.intensity)} // Dynamic radius in meters
          color={getColor(fire.intensity)}
          fillColor={getColor(fire.intensity)}
          fillOpacity={0.5}
        >
          <Popup>
            <strong>🔥 Wildfire Alert</strong> <br />
            <b>Location:</b> {fire.location} <br />
            <b>Intensity:</b> {fire.intensity}
          </Popup>
        </Circle>
      ))}
    </MapContainer>
  );
};

export default FireMap;
