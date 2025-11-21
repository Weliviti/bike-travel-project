import React from "react";
import videoFile from "../assets/myvideo.mp4"; // <-- update the path & name if needed

function Home() {
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>🏡 Home Page</h1>
      <p>Welcome to my father's bike travel adventures!</p>

      {/* Description above the video */}
      <h2 style={{ marginTop: "30px", marginBottom: "15px" }}>
        📹 A glimpse into the journey — enjoy the ride!
      </h2>

      {/* Video */}
      <video
        src={videoFile}
        controls
        autoPlay
        muted
        loop
        style={{
          width: "70%",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
        }}
      />
    </div>
  );
}

export default Home;
