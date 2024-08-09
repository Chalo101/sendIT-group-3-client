import React from "react";
import "./Homepage.css";
import deliveryMan from "../assets/delivery_man.png";

function Homepage() {
  return (
    <div className="homepage">
      <div className="content">
        <h1>Welcome to SendIT</h1>
        <p>Your trusted partner in seamless parcel deliveries. We offer reliable and efficient courier services tailored to meet your needs, ensuring your packages are delivered on time, every time.</p>
        <button className="primary-button">Send a Parcel</button>
      </div>
      <div className="image-container">
        <img src={deliveryMan} alt="Delivery Man" />
      </div>
    </div>
  );
}

export default Homepage;
