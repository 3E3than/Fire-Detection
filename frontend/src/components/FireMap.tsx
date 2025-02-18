import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Circle, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { baseurl } from "../lib/baseurl"; // Import the baseurl

// Define TypeScript interface for wildfire data
interface Wildfire {
  id: number;
  location: string;
  latitude: number;
  longitude: number;
  radius: number;
  status: "Ongoing" | "Inactive"; // status can be Ongoing or Inactive
}

// Function to determine color based on status
const getColor = (status: Wildfire["status"]): string => {
  switch (status) {
    case "Ongoing":
      return "red"; // Red for ongoing wildfires
    case "Inactive":
      return "gray"; // Gray for inactive wildfires
    default:
      return "blue"; // Default to blue if something unexpected occurs
  }
};

const FireMap: React.FC = () => {
  const [wildfireLocations, setWildfireLocations] = useState<Wildfire[]>([]);

  // Fetch wildfire data from API using axios
  useEffect(() => {
    const fetchWildfireData = async () => {
      try {
        const response = await axios.get(`${baseurl}/api/wildfire`);
        setWildfireLocations(response.data); // Set the wildfire data in state
      } catch (error) {
        console.error("Error fetching wildfire data", error);
      }
    };

    fetchWildfireData();
  }, []); // Empty dependency array to fetch data once on component mount

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
          center={[fire.latitude, fire.longitude]} // Use latitude and longitude from API
          radius={fire.radius} // Use radius from API (in meters)
          color={getColor(fire.status)} // Dynamic color based on status
          fillColor={getColor(fire.status)}
          fillOpacity={0.5}
        >
          <Popup>
            <strong>🔥 Wildfire Alert</strong> <br />
            <b>Location:</b> {fire.location} <br />
            <b>Status:</b> {fire.status}
          </Popup>
        </Circle>
      ))}
    </MapContainer>
  );
};

export default FireMap;
