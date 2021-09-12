import React from "react";
import axios from "axios";

import AssetForm from "./AssetForm";

import "./assetForm.css";

class AddAsset extends React.Component {
  state = {
    // comes from props
    username: "",
    //comes from form!
    assetType: "",
    currency: "",
    assetName: "",
    assetSymbol: "",
    quantity: 0,
    unitPrice: 0,
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
      const response = await axios.post(
        "https://ironrest.herokuapp.com/sigmaFinanceAssets",
        this.state
      );
      console.log(response);
      this.props.history.push("/wallet");
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    return (
      <div className="center-content add-asset-box">
        <h2>Add a new asset to your portfolio</h2>
        <AssetForm
          state={this.state}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
        />
      </div>
    );
  }
}

export default AddAsset;
