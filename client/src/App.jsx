import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Auction from "./pages/Auction";
import Phoenix from "./pages/Phoenix";
import Falcons from "./pages/Falcons";
import Titans from "./pages/Titans";
import Legends from "./pages/Legends";
import Captain from "./pages/Captain";
import Events from "./pages/Events";
import Results from "./pages/Results";
import Display from "./pages/Display";
import ControlCenter from "./pages/ControlCenter";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auction" element={<Auction />} />
        <Route path="/captain" element={<Captain />} />
        <Route path="/events" element={<Events />} />
        <Route path="/phoenix" element={<Phoenix />} />
        <Route path="/phonix" element={<Phoenix />} />
        <Route path="/falcons" element={<Falcons />} />
        <Route path="/titans" element={<Titans />} />
        <Route path="/legends" element={<Legends />} />
        <Route path="/results" element={<Results />} />
        <Route path="/display" element={<Display />} />
        <Route path="/control" element={<ControlCenter />} />
        <Route path="/control-center" element={<ControlCenter />} />
      </Routes>
    </div>
  );
}

export default App;
