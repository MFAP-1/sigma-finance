import React from "react";
import axios from "axios";

import TextInput from "../forms/TextInput";

class SignUpForm extends React.Component {
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
    // In case where the user doesn´t exist, post it to the API
    if (!existUser) {
      try {
        const response = await axios.post(
          "https://ironrest.herokuapp.com/sigmaFinanceUsers",
          this.state
        );
        console.log(response);
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
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Enter your name</label>
            <div>
              <TextInput
                className="input"
                type="text"
                placeholder="Create a username"
                name="name"
                onChange={this.handleChange}
                value={this.state.name}
              />
            </div>
          </div>
          <div>
            <button type="submit">Submit new user</button>
          </div>
        </form>
      </div>
    );
  }
}

export default SignUpForm;
