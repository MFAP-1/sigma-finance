import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import ManualUpdateForm from "./ManualUpdateForm";
import LoggedOffPage from "../../authentication/loggedoff/LoggedOffPage";

class ManualUpdateAsset extends React.Component {
  state = {
    // comes from props (read-only)
    _id: "",
    username: "",
    //comes from API (read-only)!
    assetType: "",
    currency: "",
    assetName: "",
    assetSymbol: "",
    unitPrice: "",
    dateBought: "",
    // new value from form
    manualUpdatedUnitPrice: "",
    dateManualUpdate: "",
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

  needsManualUpdate = () => {
    if (
      this.state.assetType === "Stock Fund" ||
      this.state.assetType === "ETF" ||
      this.state.assetType === "Other" ||
      this.state.assetType === "Bond"
    ) {
      return true;
    }
    return false;
  };

  renderManualUpdateForm = () => {
    return (
      <div className="asset-form-box">
        <h2>Input the current value for the asset</h2>
        <ManualUpdateForm
          state={this.state}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
        />
      </div>
    );
  };

  noNeedForManualUpdateForm = () => {
    return (
      <div>
        <div className="asset-form-box">
          <h2>
            For this asset, there is no need for Manual Update.
            <br /> It is 100% automated (check detailed section).
          </h2>
        </div>
        <div style={{ marginTop: "3vh" }}>
          <Link to="/wallet" className="no-link-decoration-black">
            <i className="fas fa-wallet"></i> Back to Portfolio
          </Link>
        </div>
      </div>
    );
  };

  render() {
    return this.props.loggedIn ? (
      <div>
        {this.needsManualUpdate()
          ? this.renderManualUpdateForm()
          : this.noNeedForManualUpdateForm()}
      </div>
    ) : (
      <LoggedOffPage />
    );
  }
}

export default ManualUpdateAsset;
