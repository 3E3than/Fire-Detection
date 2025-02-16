import { useState } from "react";
import axios from "axios";

export const ReportFire = () => {
    const [location, setLocation] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [severity, setSeverity] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [message, setMessage] = useState("");

    // Fetch location suggestions from OpenStreetMap Nominatim API
    const fetchLocations = async (query: string) => {
        if (query.length > 2) {  // Start searching after 3 characters
            const response = await axios.get(
                `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
            );
            setSuggestions(response.data);
        } else {
            setSuggestions([]);
        }
    };

    // Handle Image Upload
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setImage(event.target.files[0]);
        }
    };

    // Handle Form Submission
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault(); // Prevent page reload

        // Simulate form submission (Replace with actual backend logic)
        setMessage(" Fire report submitted successfully!");

        // Reset form fields
        setLocation("");
        setSeverity("");
        setImage(null);
        setSuggestions([]);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg">
                <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
                     Report Fire Incident
                </h2>

                {/* Success Message */}
                {message && (
                    <p className="bg-green-100 text-green-700 p-2 rounded-md text-center mb-4">
                        {message}
                    </p>
                )}

                <form className="space-y-4" onSubmit={handleSubmit}>
                    {/* Location Input with Autocomplete */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2"> Location</label>
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => {
                                setLocation(e.target.value);
                                fetchLocations(e.target.value);
                            }}
                            placeholder="Search Location"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-400 outline-none"
                        />
                        {suggestions.length > 0 && (
                            <ul className="bg-white border rounded-lg shadow-lg mt-2 max-h-40 overflow-auto">
                                {suggestions.map((place: any, index) => (
                                    <li
                                        key={index}
                                        className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                        onClick={() => {
                                            setLocation(place.display_name);
                                            setSuggestions([]);
                                        }}
                                    >
                                        {place.display_name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Severity Dropdown */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2"> Severity</label>
                        <select
                            value={severity}
                            onChange={(e) => setSeverity(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-400 outline-none"
                        >
                            <option value="">Select Severity</option>
                            <option value="Low">🟢 Low</option>
                            <option value="Medium">🟡 Medium</option>
                            <option value="High">🔴 High</option>
                        </select>
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">📷 Upload Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-400 outline-none"
                        />
                        {image && (
                            <p className="text-green-600 text-sm mt-2">
                                ✅ {image.name} selected
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                    >
                        <span> SUBMIT REPORT</span>
                    </button>
                </form>
            </div>
        </div>
    );
};
