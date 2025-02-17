import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Dashboard } from "./pages/Dashboard";
import { Alert } from "./pages/Alert";
import {ReportFire} from "./pages/ReportFire";
import About from "./pages/About";
import {Home} from "./pages/Home";
function App() {
  return (
    <div className="min-h-[800px] bg-white shadow-lg rounded-lg p-8">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/alert" element={<Alert />} />
          <Route path="/report-fire" element={<ReportFire />} />  
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
