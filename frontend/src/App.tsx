import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Dashboard } from "./pages/Dashboard";
import { Alert } from "./pages/Alert";

function App() {
  return (
    <div className=' min-h-[800px] bg-white shadow-lg rounded-lg p-8'>

    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/alert" element={<Alert />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
