import React from "react";

import SignUpForm from "./SignUpForm";

function SignUpPage(props) {
  return (
    <div>
      <div className="center-content">
        <h2>New Here? Please sign up below</h2>
        <SignUpForm history={props.history} />
      </div>
    </div>
  );
}

export default SignUpPage;
