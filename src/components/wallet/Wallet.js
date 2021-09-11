import React from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// import Header from "../header/Header";
// import Footer from "../footer/Footer";

class Wallet extends React.Component {
  // state = {
  //   username: "",
  // };

  // componentDidMount = () => {
  //   this.setState({ username: this.props.match.params.userName });
  // };

  render() {
    console.log("username na wallet", this.props.username);
    return (
      <div>
        <div className="center-content">
          <h1>Welcome to your wallet {this.props.username}</h1>
          {/* <h1>Welcome to your wallet</h1> */}
        </div>
      </div>
    );
  }
}

export default Wallet;
