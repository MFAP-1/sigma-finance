import React from "react";
import axios from "axios";

import TextInput from "../../forms/TextInput";

import "../authentication.css";

class SignUpForm extends React.Component {
  state = {
    name: "",
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault(); // preventing the reload

    // checking the length of the username
    if (this.state.name.length <= 3) {
      alert("This username is too short. Try a longer one.");
      return 0;
    }

    // Fetching the users from the API to check if it already exists
    let existUser = false;
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
    // In case where the user doesn´t exist, post it to the API
    if (!existUser) {
      try {
        await axios.post(
          "https://ironrest.herokuapp.com/sigmaFinanceUsers",
          this.state
        );
        this.props.history.push("/login");
      } catch (err) {
        console.error(err);
      }
      // In case where the user do exist, alert the screen
    } else {
      alert("This username is taken. Try a new one");
      this.setState({ name: "" });
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="authentication-form-box">
        <TextInput
          type="text"
          placeholder="Create a username"
          name="name"
          onChange={this.handleChange}
          value={this.state.name}
          required
        />
        <button type="submit">Submit new user</button>
      </form>
    );
  }
}

export default SignUpForm;
