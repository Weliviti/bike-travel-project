import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <h3>Bike Traveler</h3>
      <p>
        Connecting travelers and adventurers across the world.<br />
        &copy; {new Date().getFullYear()} Bike Traveler. All rights reserved.
      </p>
      <div className="social-links">
        <a href="#">Facebook</a>
        <a href="#">Instagram</a>
        <a href="#">Twitter</a>
      </div>
    </footer>
  );
}

export default Footer;
