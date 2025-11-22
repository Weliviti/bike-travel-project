import React from "react";
import bikeVideo from "../assets/intro_vedio.mp4";
import sideImage from "../assets/images/im1.jpg"; // <-- your new image

function Home() {
  return (
    <div style={{ padding: "30px", textAlign: "center" }}>
      <h1>Welcome to the Home Page</h1>

      <video
        src={bikeVideo}
        controls
        autoPlay
        muted
        loop
        style={{
          width: "60%",
          borderRadius: "16px",
          marginBottom: "30px",
        }}
      />

      {/* Two-column layout */}
      <div
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "40px",
    flexWrap: "wrap", // responsive
    marginTop: "30px",
  }}
>
  {/* Image side */}
  <div style={{ flex: "1 1 40%", textAlign: "center" }}>
    <img
      src={sideImage}
      alt="Journey"
      style={{ width: "100%", maxWidth: "400px", borderRadius: "16px" }}
    />
  </div>

  {/* Quote side */}
  <div style={{ flex: "1 1 50%", maxWidth: "500px" }}>
    <h2>The Aim of This Journey</h2>
    <p style={{ fontSize: "18px", fontStyle: "italic", color: "#1D3557" }}>
  “Traveling Titan is more than a ride—it’s a journey that unites riders across the globe, sparks adventure, and forges unforgettable memories.”
</p>
  </div>
</div>
    </div>
  );
}

export default Home;
