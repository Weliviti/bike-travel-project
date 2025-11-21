import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./pages/Navbar";

import Home from "./pages/Home";
import Bikes from "./pages/Bikes";
import Travelled from "./pages/Travelled";
import MapView from "./pages/MapView";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bikes" element={<Bikes />} />
        <Route path="/travelled" element={<Travelled />} />
        <Route path="/map" element={<MapView />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
