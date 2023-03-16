import classes from "./input.module.css";

export default function Input(props) {
    return (
      <div className={classes["input-container"]}>
        <label htmlFor={props.id}>{props.label}</label>
        <input id={props.id} type={props.type} placeholder={props.placeholder} />
      </div>
    );
  }