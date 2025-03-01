import { Play } from "lucide-react"; // Import the Play icon

const LiveMonitoring = () => {
    return (
        <div className="flex flex-col">
            <span className="text-sm">Live Monitoring</span>
            <div className="flex items-center gap-1 text-xs text-green-600">
                {/* Play icon with a dot */}
                <Play className="h-3 w-3 text-green-500" />
                <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></span>
                <span>Active now</span>
            </div>
        </div>
    );
};

export default LiveMonitoring;
