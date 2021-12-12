import { Link } from "react-router-dom";

import cellphone_demo from "../../assets/images/vetor2.png"
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
            style={{ height: "22vh" }}
          />
        </div>
      </div>
      <div className="companys-presentation-aux-div" >
        <ul className="features-table" >
         
            <li className="title-feature" >MAIN FEATURES</li>
            <li className="li-feature">Multi-currency portfolio</li>
            <li className="li-feature">100% automated tracking</li>
            <li className="li-feature">Statistics and comparisons</li>
            <li className="li-feature">Dynamic graphs</li>
            <li className="li-feature">Currency convertion</li>
            <li className="li-feature">Monetary correction</li>
            <li className="li-feature">Top trending investment news</li>
            <li className="li-feature">Stock finder</li>
            <li className="li-feature li-last">Crypto finder</li>
          
     </ul>
      </div>
      <h2>What are you waiting for?</h2>
      <Link to="/signup" className="no-link-decoration-black">
        <button className="presentation-signup-button">Sign me up</button>
      </Link>
    </div>
  );
}

export default SigmaFinancePresentation;
