import React from "react";

const About = () => {
    
    return (
        <div className="container mx-auto px-6 py-12">
            {/* Introduction Section */}
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Wildfire Detection Matters</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Wildfires cause massive destruction to the environment, wildlife, and human lives.
                    Early detection using AI and IoT can help prevent disasters and save lives.
                </p>
            </div>

            {/* Key Features Section */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <FeatureCard
                    icon="🔥"
                    title="Real-Time Detection"
                    description="AI-powered image processing detects wildfires in real-time and sends alerts instantly."
                />
                <FeatureCard
                    icon="📍"
                    title="Live Location Tracking"
                    description="Geotagged reports ensure precise location tracking for quick emergency response."
                />
                <FeatureCard
                    icon="🛡️"
                    title="Community Safety"
                    description="Users can report fire incidents, helping authorities respond faster."
                />
                <FeatureCard
                    icon="🤖"
                    title="AI & IoT Integration"
                    description="Our system leverages AI & IoT for automated fire detection and cloud-based alerts."
                />
                <FeatureCard
                    icon="📊"
                    title="Impact & Benefits"
                    description="Reducing wildfire spread, protecting communities, and preventing environmental damage."
                />
            </div>

            {/* How It Works Section */}
            <div className="mt-12 text-center">
                <h3 className="text-2xl font-bold text-gray-800">How Our System Works</h3>
                <p className="text-gray-600 max-w-3xl mx-auto mt-2">
                    Our platform uses satellite imagery, drone footage, and real-time camera feeds processed by AI to detect fire outbreaks.
                    IoT devices and GPS tracking ensure accurate location monitoring, enabling fast emergency responses.
                </p>
            </div>

            {/* Call to Action */}
            <div className="mt-12 text-center bg-orange-100 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-gray-800">Join Us in Preventing Wildfires</h3>
                <p className="text-gray-600">Stay alert, report incidents, and help us safeguard lives and nature.</p>
                <button className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition">
                    Get Involved
                </button>
            </div>

            {/* Meet the Developers Section */}
            <div className="mt-12 text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Meet the Developers</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <DeveloperCard name="Amrit N. Auji" role="AI & Backend Developer" />
                    <DeveloperCard name="Team Member 2" role="Frontend Developer" />
                    <DeveloperCard name="Team Member 3" role="UI/UX Designer" />
                    <DeveloperCard name="Team Member 4" role="Project Manager" />
                </div>
            </div>
        </div>
    );
};

// Feature Card Component
const FeatureCard = ({ icon, title, description }) => (
    <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center">
        <div className="text-4xl mb-3">{icon}</div>
        <h4 className="font-bold text-lg mb-2">{title}</h4>
        <p className="text-gray-600">{description}</p>
    </div>
);

// Developer Card Component
const DeveloperCard = ({ name, role }) => (
    <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center">
        <div className="w-20 h-20 bg-gray-300 rounded-full mb-3"></div>
        <h4 className="font-bold text-lg">{name}</h4>
        <p className="text-gray-600">{role}</p>
    </div>
);

export default About;
