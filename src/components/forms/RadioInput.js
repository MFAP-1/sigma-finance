function RadioInput(props) {
  return (
    <div>
      <input
        type="radio"
        name={props.name}
        id={props.id}
        value={props.value}
        checked={props.checked}
        onChange={props.onChange}
      />
      <label htmlFor={props.id}>{props.label}</label>
    </div>
  );
}

export default RadioInput;
