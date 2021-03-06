import React from "react";
import axios from "axios";

import TextInput from "../../forms/TextInput";

import "../authentication.css";

class LoginForm extends React.Component {
  state = {
    name: "",
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault(); // preventing the reload
    let existUser = false;
    // Fetching the users from the API to check if it already exists
    try {
      const response = await axios.get(
        "https://ironrest.herokuapp.com/sigmaFinanceUsers"
      );
      response.data.map((user) => {
        if (user.name === this.state.name) {
          existUser = true;
        }
        return user;
      });
    } catch (err) {
      console.error(err);
    }
    // In case where the user exist, enter the APP into the wallet
    if (existUser) {
      this.props.updateLoginState(this.state.name);
      this.props.history.push(`/wallet`);
      // In case where the user doesn't exist, alert the screen and prevent login
    } else {
      alert(
        "This username doesn't exist. Don't you remember you own username?"
      );
      this.setState({ name: "" });
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="authentication-form-box">
        <TextInput
          type="text"
          placeholder="Your username"
          name="name"
          onChange={this.handleChange}
          value={this.state.name}
          required
        />
        <button type="submit">Login</button>
      </form>
    );
  }
}

export default LoginForm;
