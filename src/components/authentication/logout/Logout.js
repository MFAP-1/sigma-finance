import React from "react";

function Logout(props) {
  const terminateSession = () => {
    // setTimeout(() => {
    props.updateLoginState("");
    props.history.push("/");
    // }, 2000);
  };
  return (
    <div>
      It was a pleasure having you
      {terminateSession()}
    </div>
  );
}

export default Logout;
