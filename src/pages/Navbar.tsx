import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: "20px", background: "#222", color: "white" }}>
      <h2>Bike Traveler</h2>
      <ul style={{ display: "flex", gap: "20px", listStyle: "none" }}>
        <li><Link to="/" style={{ color: "white" }}>Home</Link></li>
        <li><Link to="/bikes" style={{ color: "white" }}>Used Bikes</Link></li>
        <li><Link to="/travelled" style={{ color: "white" }}>Travelled Places</Link></li>
        <li><Link to="/map" style={{ color: "white" }}>Map</Link></li>
        <li><Link to="/about" style={{ color: "white" }}>About</Link></li>
        <li><Link to="/contact" style={{ color: "white" }}>Contact</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
