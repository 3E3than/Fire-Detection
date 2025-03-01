import { Radio } from "lucide-react"; // Import a live broadcast icon

const LiveMonitoring = () => {
    return (
        <div className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-600 text-white px-4 py-2 rounded-full shadow-lg">
            {/* Icon for Live Monitoring */}
            <Radio className="h-5 w-5 animate-pulse" />

            {/* Live Monitoring Text */}
            <span className="font-bold text-lg text-red-100 uppercase">Live Monitoring</span>

            {/* Status Indicator */}
            <div className="flex items-center gap-1 text-xs text-green-200">
                <span className="h-2.5 w-2.5 rounded-full bg-green-400 animate-pulse"></span>
                <span className="text-green-200 font-semibold animate-pulse">Active now</span>
            </div>
        </div>
    );
};

export default LiveMonitoring;
