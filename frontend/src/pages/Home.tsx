import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import FireGlobe from "../components/FireGlobe"; // Import the FireGlobe component
import { baseurl } from "../lib/baseurl"; // Assuming this is the base URL for your API

export const Home = () => {
  const [fireData, setFireData] = useState<{
    lat: number;
    lng: number;
    status: string;
    size: number; // Size is in km (1 unit = 1 km)
    color: string;
  }[]>([]);

  useEffect(() => {
    // Fetch data from the backend using axios
    const fetchFireData = async () => {
      try {
        const response = await axios.get(`${baseurl}/api/wildfire`);
        const formattedData = response.data.map((fire: {
          latitude: number;
          longitude: number;
          radius: number; // radius in meters
          status: string;
        }) => {
          // Convert radius from meters to kilometers
          const size = fire.radius / 10000; // Convert radius to kilometers

          // Determine color based on the fire status
          let color = "gray"; // Default color
          switch (fire.status) {
            case "Ongoing":
              color = "red"; // Red for ongoing fires
              break;
            case "Inactive":
              color = "gray"; // Orange for inactive fires
              break;
            default:
              color = "blue"; // Gray for unknown status
              break;
          }

          return {
            lat: fire.latitude,
            lng: fire.longitude,
            status: fire.status,
            size, // size in km
            color,
          };
        });
        setFireData(formattedData); // Set the formatted data into the state
      } catch (error) {
        console.error("Error fetching wildfire data:", error);
      }
    };

    fetchFireData(); // Fetch data when the component mounts
  }, []);

  return (
    <div id="webcrumbs">
      <div className="w-full bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl overflow-hidden">
        <main className="p-12">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            {/* Left Section: Text Content and Buttons */}
            <div className="flex-1 space-y-6 mb-48">
              <h2 className="text-5xl font-bold leading-tight">
                Real-Time Wildfire Detection & Monitoring
              </h2>
              <p className="text-lg">
                Stay ahead of wildfires with IgnisAI, an AI-powered platform
                designed to detect, monitor, and predict wildfires in real time.
              </p>
              <div className="flex gap-4">
                <Link to="/dashboard">
                  <button className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-3 rounded-full hover:scale-105 transition-transform">
                    Dashboard
                  </button>
                </Link>
                <Link to="/about">
                  <button className="border-2 border-orange-500 px-8 py-3 rounded-full hover:bg-orange-50 transition-colors">
                    Learn More
                  </button>
                </Link>
              </div>
            </div>

            {/* Right Section: Globe and Features Grid */}
            <div className="flex-1 w-full pb-72">
              {/* Globe Container */}
              <div className="w-full h-[500px] lg:h-[600px]">
                <FireGlobe fireData={fireData} />
              </div>

              {/* Features Grid */}
            </div>
          </div>
        </main>
        <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Live Dashboard Card */}
            <div className="bg-orange-50 p-6 rounded-xl hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-orange-500 text-4xl mb-4">dashboard</span>
              <h3 className="font-semibold text-xl mb-2">Live Dashboard</h3>
              <p className="text-gray-600 mb-4">
                Access a comprehensive view of active wildfires with real-time updates. Track fire locations,
                sizes, and statuses on an interactive map.
              </p>
              <ul className="list-disc list-inside text-sm text-gray-600">
                <li>Real-time fire tracking</li>
                <li>Interactive map with filters</li>
                <li>Historical data analysis</li>
              </ul>
            </div>

            {/* Instant Alerts Card */}
            <div className="bg-orange-50 p-6 rounded-xl hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-orange-500 text-4xl mb-4">warning</span>
              <h3 className="font-semibold text-xl mb-2">Instant Alerts</h3>
              <p className="text-gray-600 mb-4">
                Receive real-time notifications about new wildfires, status changes, and critical updates
                directly to your device.
              </p>
              <ul className="list-disc list-inside text-sm text-gray-600">
                <li>Customizable alert settings</li>
                <li>Push notifications and emails</li>
                <li>Critical event warnings</li>
              </ul>
            </div>

            {/* AI Predictions Card */}
            <div className="bg-orange-50 p-6 rounded-xl hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-orange-500 text-4xl mb-4">psychology</span>
              <h3 className="font-semibold text-xl mb-2">AI Predictions</h3>
              <p className="text-gray-600 mb-4">
                Leverage advanced machine learning models to predict wildfire behavior, spread patterns,
                and potential impact areas.
              </p>
              <ul className="list-disc list-inside text-sm text-gray-600">
                <li>Fire spread simulations</li>
                <li>Risk assessment tools</li>
                <li>Scenario planning</li>
              </ul>
            </div>

            {/* Data Integration Card */}
            <div className="bg-orange-50 p-6 rounded-xl hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-orange-500 text-4xl mb-4">satellite_alt</span>
              <h3 className="font-semibold text-xl mb-2">Data Integration</h3>
              <p className="text-gray-600 mb-4">
                Integrate data from multiple sources, including satellites, weather stations, and ground
                sensors, for a holistic view of wildfire activity.
              </p>
              <ul className="list-disc list-inside text-sm text-gray-600">
                <li>Satellite imagery analysis</li>
                <li>Weather data integration</li>
                <li>Ground sensor networks</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
