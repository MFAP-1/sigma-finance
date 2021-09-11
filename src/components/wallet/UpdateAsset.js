import React from "react";
import axios from "axios";

import AssetForm from "./AssetForm";

import "./addAsset.css";

class UpdateAsset extends React.Component {
  state = {
    // comes from props
    _id: "",
    username: "",
    //comes from form!
    assetName: "",
    assetSymbol: "",
    quantity: 0,
    unitPrice: 0,
    dateBought: "",
  };

  componentDidMount = async () => {
    try {
      const response = await axios.get(
        `https://ironrest.herokuapp.com/sigmaFinanceAssets/${this.props.match.params.userId}`
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
    // if (event.target.type === "checkbox") {
    //   return this.setState({ [event.target.name]: event.target.checked });
    // }
    return this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault(); // preventing the reload
    // const updatedObj = {
    //   _id: this.state._id,
    //   username: this.state.username,
    //   assetName: this.state.assetName,
    //   assetSymbol: this.state.assetSymbol,
    //   quantity: this.state.quantity,
    //   unitPrice: this.state.unitPrice,
    //   dateBought: this.state.dateBought,
    // };
    try {
      const response = await axios.put(
        `https://ironrest.herokuapp.com/sigmaFinanceAssets/${this.props.match.params.userId}`,
        this.state
      );
      console.log(response);
      this.props.history.push("/wallet");
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    console.log("state no Upadate:", this.state); // ---------------------DEBUGGUER
    return (
      <div className="center-content add-asset-box">
        <h1>Check the select asset for updating</h1>
        <AssetForm
          state={this.state}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
        />
      </div>
    );
  }
}

export default UpdateAsset;
