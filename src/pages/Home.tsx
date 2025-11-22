import React from "react";
import bikeVideo from "../assets/intro_vedio.mp4"; // <-- your video file

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
    </div>
  );
}

export default Home;
