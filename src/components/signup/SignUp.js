import React from "react";
import axios from "axios";

import TextInput from "../forms/TextInput";

class SignUp extends React.Component {
  state = {
    name: "",
    // id: "",
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
      console.log("objeto recebido do axios", response.data);
      response.data.map((user) => {
        console.log(
          "user:",
          user,
          "this name é:",
          this.state.name,
          "user.name vale:",
          user.name
        );
        if (user.name === this.state.name) {
          console.log("entrou no if");
          existUser = true;
        }
        return user;
      });
      console.log("existingUser", existUser);
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
      } catch (err) {
        console.error(err);
      }
      // In case where the user do exist, alert the screen
    } else {
      alert("This username is taken. Try a new one");
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
                placeholder="Nome do usuário"
                name="name"
                onChange={this.handleChange}
                value={this.state.name}
              />
            </div>
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default SignUp;
