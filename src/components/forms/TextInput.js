import React from "react";
function TextInput(props) {
  return (
    <div>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        type={props.type}
        id={props.id}
        min={props.min}
        name={props.name}
        onChange={props.onChange}
        value={props.value}
        required={props.required}
        placeholder={props.placeholder}
      />
      {props.hint ? <div>{props.hint}</div> : null}
    </div>
  );
}

export default TextInput;
