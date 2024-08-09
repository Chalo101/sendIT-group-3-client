import React from "react";
import "./MyOrders.css";

function MyOrdersCard({
  id,
  item,
  description,
  weight,
  destination,
  status,
  removeCourse,
}) {
  function handleDelete() {
    removeCourse(id);
  }

  return (
    <div className="myorderscard">
      {/* <button className="close" onClick={handleDelete}>
        X
      </button> */}
      <p>Item: {item}</p>
      <p>Description: {description}</p>
      <p>Weight: {weight}</p>
      <p>Destination: {destination}</p>
      <button onClick={handleDelete}>Cancel order</button>
      <p>Status: {status}</p>
      <button>Change Destination</button>
    </div>
  );
}

export default MyOrdersCard;
