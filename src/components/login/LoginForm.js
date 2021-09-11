import React from "react";
import axios from "axios";

import TextInput from "../forms/TextInput";

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
        if (user.name.toLowerCase() === this.state.name.toLowerCase()) {
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
    // console.log(this.state.name);
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Enter your name</label>
            <div>
              <TextInput
                className="input"
                type="text"
                placeholder="Insert a username"
                name="name"
                onChange={this.handleChange}
                value={this.state.name}
              />
            </div>
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    );
  }
}

export default LoginForm;
