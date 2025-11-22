import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>Bike Traveler</h2>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/bikes">Used Bikes</Link></li>
        <li><Link to="/travelled">Travelled Places</Link></li>
        <li><Link to="/map">Map</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
