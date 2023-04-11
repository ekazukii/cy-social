import classes from "./button.module.css";

export default function Button({ text, type, handleClick, link }) {
  return (
    <a href={link}>
      <button onClick={handleClick} className={classes[type]}>
        {text}
      </button>
    </a>
  );
}
