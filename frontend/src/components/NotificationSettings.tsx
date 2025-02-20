import { useState } from "react";
import axios from "axios";
import AsyncSelect from "react-select/async";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { baseurl } from "../lib/baseurl";
import { toast } from "react-toastify";

interface Location {
  lat: number;
  lng: number;
}

const LocationPicker: React.FC<{ setLocation: (location: Location) => void }> = ({ setLocation }) => {
  useMapEvents({
    click(e) {
      setLocation({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
};

const fetchLocations = async (inputValue: string) => {
  if (!inputValue) return [];
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${inputValue}`
  );
  const data = await response.json();
  return data.map((location: any) => ({
    label: location.display_name,
    value: { lat: parseFloat(location.lat), lng: parseFloat(location.lon) },
  }));
};

export default function WildfireNotificationSettings() {
  const [email, setEmail] = useState<string>("");
  const [location, setLocation] = useState<Location | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<{ value: Location; label: string } | null>(null);

  const handleLocationChange = (selectedOption: { value: Location; label: string }) => {
    setSelectedPlace(selectedOption);
    setLocation(selectedOption.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !location) {
      toast.error("Please enter your email and select a location.");
      return;
    }

    try {
      await axios.post(`${baseurl}/api/store-location/`, {
        email,
        latitude: location.lat,
        longitude: location.lng,
      });
      toast.success("Subscription successful!");
      setEmail("");
      setLocation(null);
      setSelectedPlace(null);
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error("Failed to subscribe. Please try again.");
    }
  };

  return (
    <div className="space-y-6 p-6 rounded-lg">
      <h3 className="font-medium">Get Wildfire Notifications</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border focus:outline-none focus:ring-2"
          required
        />

        <div>
          <h4 className="font-medium">Select Location</h4>
          <AsyncSelect
            loadOptions={fetchLocations}
            onChange={handleLocationChange}
            className="mt-2"
            menuPortalTarget={document.body}
            styles={{
              menuPortal: (base) => ({ ...base, zIndex: 9999 }),
            }}
            value={selectedPlace}
            placeholder="Search for a location"
          />
        </div>

        <MapContainer
          center={[27.7172, 85.324]}
          zoom={2}
          className="h-64 w-full rounded-lg"
          style={{ zIndex: 1 }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {location && <Marker position={[location.lat, location.lng]} />}
          <LocationPicker setLocation={setLocation} />
        </MapContainer>

        <button
          type="submit"
          className="w-full p-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
}
