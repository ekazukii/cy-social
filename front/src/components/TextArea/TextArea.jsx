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
export default function TextArea({ placeholder, rocket = true, label, onChange }) {
  return (
    <>
      <div className={rocket ? classes['container'] : classes['no-rocket-container']}>
        {label && <label>{label}</label>}
        <textarea
          className={rocket ? classes['content-area'] : ''}
          placeholder={placeholder}
          onChange={e => onChange(e.target.value)}
        ></textarea>
        {rocket && (
          <div className={classes['send-area']}>
            <ImageAnimated imageAnimated="/img/rocket-unscreen.gif" imageFixed="/img/rocket.png" />
          </div>
        )}
      </div>
    </>
  );
}
