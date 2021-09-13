import React from "react";

import LoginForm from "./LoginForm";

function LoginPage(props) {
  return (
    <div>
      <div className="center-content">
        <h2>To login, please enter your username:</h2>
        <LoginForm
          history={props.history}
          updateLoginState={props.updateLoginState}
        />
      </div>
    </div>
  );
}

export default LoginPage;
