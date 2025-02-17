import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import FireGlobe from "../components/FireGlobe"; // Import the FireGlobe component

export const Home = () => {
  const [fireData, setFireData] = useState<{ lat: number; lng: number }[]>([]);

  useEffect(() => {
    // Mock data for fire locations (replace with real API call)
    const mockFireData = [
      { lat: 37.7749, lng: -122.4194 }, // San Francisco
      { lat: 34.0522, lng: -118.2437 }, // Los Angeles
      { lat: 40.7128, lng: -74.006 },  // New York
      { lat: 51.5074, lng: -0.1278 },  // London
      { lat: 48.8566, lng: 2.3522 },   // Paris
      { lat: 35.6895, lng: 139.6917 }, // Tokyo
    ];
    setFireData(mockFireData);

    // If using a real API:
    /*
    fetch('https://firms.modaps.eosdis.nasa.gov/api/area/csv/...')
      .then(response => response.json())
      .then(data => {
        const formattedData = data.map(fire => ({
          lat: fire.latitude,
          lng: fire.longitude,
        }));
        setFireData(formattedData);
      })
      .catch(error => console.error('Error fetching fire data:', error));
    */
  }, []);

  return (
    <div id="webcrumbs">
      <div className="w-full bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl overflow-hidden">
        <main className="p-12">
          <div className="flex gap-6 items-center">
            <div className="flex-1 space-y-6 pb-96 ">
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

            <div className="flex-1">
              {/* Replace the 2D map with the FireGlobe component */}
              <div className=" ml-40 w-full h-full ">
                <FireGlobe fireData={fireData} />
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow mt-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-orange-50 p-4 rounded-xl hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-orange-500 text-3xl">
                      dashboard
                    </span>
                    <h3 className="font-semibold mt-2">Live Dashboard</h3>
                    <p className="text-sm">
                      Comprehensive view of active wildfires
                    </p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-xl hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-orange-500 text-3xl">
                      warning
                    </span>
                    <h3 className="font-semibold mt-2">Instant Alerts</h3>
                    <p className="text-sm">Real-time notifications</p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-xl hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-orange-500 text-3xl">
                      psychology
                    </span>
                    <h3 className="font-semibold mt-2">AI Predictions</h3>
                    <p className="text-sm">Machine learning forecasts</p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-xl hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-orange-500 text-3xl">
                      satellite_alt
                    </span>
                    <h3 className="font-semibold mt-2">Data Integration</h3>
                    <p className="text-sm">Multi-source information</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};