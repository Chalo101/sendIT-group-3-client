import React from "react";
import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div className="error-page">
      <h1>Oops!</h1>
      <h2>ERROR 404 - PAGE NOT FOUND</h2>
      <p>
        Sorry, the page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <Link to="/Homepage">
        <button className="home-button">GO TO HOMEPAGE</button>
      </Link>
    </div>
  );
}

export default ErrorPage;