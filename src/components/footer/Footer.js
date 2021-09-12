import React from "react";

import "./footer.css";

function Footer() {
  return (
    <div id="footer-div">
      <span>&#169;</span>
      <a
        href="https://github.com/MFAP-1/sigma-finance"
        style={{ color: "white", paddingRight: "10px" }}
      >
        Sigma Finance.
      </a>
      <span>Copyright 2021: Manoel and Raul.</span>
    </div>
  );
}

export default Footer;
