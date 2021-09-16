import React from "react";
import axios from "axios";

import LoadingAnimation from "../loading/LoadingAnimation";

class DeleteAsset extends React.Component {
  componentDidMount = async () => {
    try {
      await axios.delete(
        `https://ironrest.herokuapp.com/sigmaFinanceAssets/${this.props.match.params.assetId}`
      );
      this.props.history.push("/wallet");
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    return (
      <div className="asset-form-box">
        Deleting...
        <br />
        <LoadingAnimation />
      </div>
    );
  }
}

export default DeleteAsset;
