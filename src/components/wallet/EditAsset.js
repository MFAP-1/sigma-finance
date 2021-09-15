import React from "react";
import axios from "axios";

import AssetForm from "./AssetForm";

import "./assetForm.css";

class EditAsset extends React.Component {
  state = {
    // comes from props (read-only)
    _id: "",
    username: "",
    //comes from from API to be edited in the form form!
    assetType: "",
    currency: "",
    investmentIndicator: "",
    assetName: "",
    assetSymbol: "",
    quantity: 0,
    unitPrice: 0,
    dateBought: "",
    additionalComments: "",
  };

  // Loading the current asset information into the state
  componentDidMount = async () => {
    try {
      const response = await axios.get(
        `https://ironrest.herokuapp.com/sigmaFinanceAssets/${this.props.match.params.assetId}`
      );
      this.setState({ ...response.data });
      this.setState({
        _id: this.props.match.params.userId,
        username: this.props.username,
      });
    } catch (err) {
      console.error(err);
    }
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  // to update the asset in the API based on its id
  handleSubmit = async (event) => {
    event.preventDefault(); // preventing the reload
    try {
      await axios.put(
        `https://ironrest.herokuapp.com/sigmaFinanceAssets/${this.props.match.params.assetId}`,
        this.state
      );
      this.props.history.push("/wallet");
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    return (
      <div className="center-content add-asset-box">
        <h2>Check the selected asset for updating</h2>
        <AssetForm
          state={this.state}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
        />
      </div>
    );
  }
}

export default EditAsset;
