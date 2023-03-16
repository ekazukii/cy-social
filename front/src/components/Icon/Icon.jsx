import classes from "./icon.module.css";

export default function Icon({ type, handleClick }) {
    return (
      <i onClick={handleClick} className={type}/>
    );
  }