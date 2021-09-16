import { Link } from "react-router-dom";

import cellphone_demo from "../../assets/images/cellphone.webp";
import sigmaIcon from "../../assets/images/logo512.png";

function SigmaFinancePresentation() {
  return (
    <div className="container-OurCompany">
      <div className="title-div">
        <div>
          <div className="logo-div-homepage">
            <img src={sigmaIcon} alt="sigma-icon" id="logoImg" />
            <h1>Sigma Finance</h1>
          </div>
          <h2 style={{ fontStyle: "italic" }}>Your finances in one place</h2>
        </div>
        <div>
          <img
            src={cellphone_demo}
            alt="Background vector created by rawpixel.com - www.freepik.com"
            style={{ height: "15vh" }}
          />
        </div>
      </div>
      <div className="companys-presentation-aux-div">
        <table className="features-table">
          <thead>
            <tr>MAIN FEATURES</tr>
          </thead>
          <tbody>
            <tr>Multi-currency portfolio</tr>
            <tr>100% automated tracking</tr>
            <tr>Statistics and comparisons</tr>
            <tr>Dynamic graphs</tr>
            <tr>Currency convertion</tr>
            <tr>Monetary correction</tr>
            <tr>Top trending investment news</tr>
            <tr>Stock finder</tr>
            <tr>Crypto finder</tr>
          </tbody>
        </table>
      </div>
      <h2>What are you waiting for?</h2>
      <Link to="/signup" className="no-link-decoration-black">
        <button className="presentation-signup-button">Sign me up</button>
      </Link>
    </div>
  );
}

export default SigmaFinancePresentation;
