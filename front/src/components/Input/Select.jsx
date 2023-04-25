import classes from './input.module.css';

/**
 *
 * @param {Object} props
 * @param {String} props.value
 * @param {Boolean} props.isValid
 * @param {Boolean} props.large
 * @param {Number} props.id
 * @param {Function} props.onChange
 * @param {String} props.label
 * @param {Array} props.data
 * @param {Object} props.data[i]
 * @param {String} props.data[i].key
 * @param {String} props.data[i].value
 * @returns
 */
export default function Input(props) {
  if (props.value !== undefined && props.isValid !== undefined)
    return (
      <div className={`${classes['input-container']} ${props.large && classes['large']} `}>
        <label htmlFor={props.id}>{props.label}</label>
        <input
          id={props.id}
          type={props.type}
          placeholder={props.placeholder}
          onChange={props.onChange}
          value={props.value}
          className={!props.isValid ? classes.invalid : ''}
        />
      </div>
    );

  return (
    <div className={`${classes['select-container']} ${props.large && classes['large']} `}>
      <label htmlFor={props.id}>{props.label}</label>
      <select
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={e => props.onChange(e.target.value)}
      >
        {props.data.map(item => (
          <option key={item.key} value={item.key}>
            {item.value}
          </option>
        ))}
      </select>
    </div>
  );
}
