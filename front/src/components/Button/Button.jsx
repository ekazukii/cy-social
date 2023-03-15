import classes from "./button.module.css";

export default function Button({ text, type, handleClick }) {
  return (
    <button onClick={handleClick} className={classes[type]}>
      {text}
    </button>
  );
}