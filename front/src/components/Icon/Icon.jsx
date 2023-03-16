import classes from "./icon.module.css";

export default function Button({ svg, type, handleClick }) {
    return (
      <button onClick={handleClick} className={classes[type]}>
        {text}
      </button>
    );
  }