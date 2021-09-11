import React from "react";
import axios from "axios";

class DeleteAsset extends React.Component {
  componentDidMount = async () => {
    try {
      const response = axios.delete(
        `https://ironrest.herokuapp.com/sigmaFinanceAssets/${this.props.match.params.userId}`
      );
      console.log(response);
      this.props.history.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    return <div>deleting...</div>;
  }
}

export default DeleteAsset;
