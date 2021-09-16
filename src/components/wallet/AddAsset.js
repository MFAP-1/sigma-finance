import React from "react";
import axios from "axios";

import AssetForm from "./AssetForm";
import LoggedOffPage from "../authentication/loggedoff/LoggedOffPage";

import "./assetForm.css";

class AddAsset extends React.Component {
  state = {
    // comes from props (read-only)
    username: "",
    //comes from form!
    assetType: "",
    currency: "",
    investmentIndicator: "",
    assetName: "",
    assetSymbol: "",
    quantity: "",
    unitPrice: "",
    dateBought: "",
    additionalComments: "",
  };

  componentDidMount = () => {
    this.setState({ username: this.props.username });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault(); // preventing the reload
    try {
      await axios.post(
        "https://ironrest.herokuapp.com/sigmaFinanceAssets",
        this.state
      );
      this.props.history.push("/wallet");
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    return this.props.loggedIn ? (
      <div className="asset-form-box">
        <h2>Add a new asset to your portfolio</h2>
        <AssetForm
          state={this.state}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
        />
      </div>
    ) : (
      <LoggedOffPage />
    );
  }
}

export default AddAsset;
