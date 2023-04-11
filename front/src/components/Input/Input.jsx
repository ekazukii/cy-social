import classes from "./input.module.css";

/**
 * 
 * @param {Object} props 
 * @param {String} props.value 
 * @param {Boolean} props.isValid 
 * @param {Boolean} props.large
 * @param {Number} props.id 
 * @param {String} props.type
 * @param {String} props.placeholder 
 * @param {String} props.onChange 
 * @param {String} props.label
 * @returns 
 */
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
