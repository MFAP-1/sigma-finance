import React from "react";
import axios from "axios";

import AssetForm from "./AssetForm";

import "./addAsset.css";

class AddAsset extends React.Component {
  state = {
    username: "", // comes from props
    assetName: "", //comes from form!
    assetSymbol: "",
    quantity: 0,
    unitPrice: 0,
    dateBought: "",
  };

  componentDidMount = () => {
    this.setState({ username: this.props.username });
  };

  handleChange = (event) => {
    // if (event.target.type === "checkbox") {
    //   return this.setState({ [event.target.name]: event.target.checked });
    // }
    return this.setState({ [event.target.name]: event.target.value });
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
    console.log("username na addAsset:", this.state.username);
    return (
      <div className="center-content add-asset-box">
        <h1>Add a new asset to your protfolio</h1>
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
