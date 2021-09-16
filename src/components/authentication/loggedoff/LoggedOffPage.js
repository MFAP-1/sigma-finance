import React from "react";
import { Link } from "react-router-dom";

function LoggedOffPage() {
  return (
    <div>
      <div className="asset-form-box" style={{ width: "40vw" }}>
        <i class="fas fa-sign-in-alt fa-5x"></i>
        <h2>
          Opps..!
          <br />
          Sorry. This content is only available for loggedIn users.
        </h2>
      </div>
      <div style={{ marginTop: "3vh" }}>
        <Link to="/login" className="no-link-decoration-black">
          <button style={{ width: "calc(40vw + 2rem)" }}>Login</button>
        </Link>
      </div>
    </div>
  );
}

export default LoggedOffPage;
