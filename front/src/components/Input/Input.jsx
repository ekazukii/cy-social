import classes from "./input.module.css";

export default function Input(props) {
  if (props.value !== undefined && props.isValid !== undefined)
    return (
      <div
        className={`${classes["input-container"]} ${
          props.large && classes["large"]
        } `}
      >
        <label htmlFor={props.id}>{props.label}</label>
        <input
          id={props.id}
          type={props.type}
          placeholder={props.placeholder}
          onChange={props.onChange}
          value={props.value}
          className={!props.isValid ? classes.invalid : ""}
        />
      </div>
    );

  return (
    <div
      className={`${classes["input-container"]} ${
        props.large && classes["large"]
      } `}
    >
      <label htmlFor={props.id}>{props.label}</label>
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={props.onChange}
      />
    </div>
  );
}
