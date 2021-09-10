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
        if (user.name.toLowerCase() === this.state.name.toLowerCase()) {
          console.log("entrou no if");
          existUser = true;
        }
        return user;
      });
      console.log("existingUser", existUser);
    } catch (err) {
      console.error(err);
    }
    // In case where the user exist, enter the APP into the wallet
    if (existUser) {
      this.props.history.push(`/wallet/${existUser}`);
      // In case where the user doesn't exist, alert the screen and prevent login
    } else {
      alert(
        "This username doesn't exist. Don't you remember you own username?"
      );
      this.setState({ name: "" });
    }
  };

  render() {
    console.log(this.state.name);
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
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    );
  }
}

export default LoginForm;
