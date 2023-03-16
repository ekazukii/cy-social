import classes from "../../../public/css/uicons-regular-rounded.css";

export default function Icon({ type, handleClick }) {
    return (
      <i onClick={handleClick} className={classes[type]}/>
    );
  }