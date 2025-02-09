import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { Alert } from "./pages/Alert";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/alert" element={<Alert />} />
      </Routes>
    </Router>
  );
}

export default App;
