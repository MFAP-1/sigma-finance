import React from "react";
function TextInput(props) {
  return (
    <div>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        type={props.type}
        id={props.id}
        className={props.className}
        min={props.min}
        max={props.max}
        step={props.step}
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
