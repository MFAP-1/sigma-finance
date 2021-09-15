function SelectInput(props) {
  return (
    <div>
      <label htmlFor={props.id}>{props.label}</label>
      <select
        id={props.id}
        className={props.className}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        required={props.required}
      >
        <option value="" key="placeholder" disabled hidden>
          {props.placeholder}
        </option>
        {props.items.map((item) => {
          return <option key={item}>{item}</option>;
        })}
      </select>
    </div>
  );
}

export default SelectInput;
