import classes from './textarea.module.css';
import Icon from '../Icon/Icon';
import ImageAnimated from '../ImageAnimated/ImageAnimated';
//import { placeholder } from '@uiw/react-codemirror';

/**
 *
 * @param {Boolean} rocket
 * @param {String} placeholder
 * @returns
 */
export default function TextArea({
  placeholder,
  rocket = true,
  label,
  onChange,
  resize = true,
  rows = 3,
  darkMode = true,
  onSubmit
}) {
  let containerClasses = rocket ? classes['container'] : classes['no-rocket-container'];
  containerClasses += darkMode ? ' ' + classes['dark-mode'] : '';

  return (
    <div className={containerClasses}>
      {label && <label>{label}</label>}
      <textarea
        className={rocket ? classes['content-area'] : ''}
        placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
        style={{ resize: resize ? 'both' : 'none' }}
        rows={rows}
      ></textarea>
      {rocket && (
        <div className={classes['send-area']}>
          <ImageAnimated
            imageAnimated="/img/rocket-unscreen.gif"
            imageFixed="/img/rocket.png"
            onClick={() => onSubmit && onSubmit()}
          />
        </div>
      )}
    </div>
  );
}
