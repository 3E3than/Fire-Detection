import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Dashboard } from "./pages/Dashboard";
import { Alert } from "./pages/Alert";
import { ReportFire } from "./pages/ReportFire";
import { About } from "./pages/About";
import { Home } from "./pages/Home";
import { Login } from "./components/Login";
import { ToastContainer, toast } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

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
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>

      {/* Toast Container to display the toast messages */}
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
