import classes from './textarea.module.css';
import ImageAnimated from '../ImageAnimated/ImageAnimated';
import React, { useState } from 'react';
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
  const [value, setValue] = useState('');

  function handleClick(e) {
    onSubmit && onSubmit(e);
    setValue('');
  }

  function handleChange(e) {
    onChange && onChange(e.target.value);
    setValue(e.target.value);
  }

  return (
    <div className={containerClasses}>
      {label && <label>{label}</label>}
      <textarea
        className={rocket ? classes['content-area'] : ''}
        placeholder={placeholder}
        onChange={handleChange}
        style={{ resize: resize ? 'both' : 'none' }}
        rows={rows}
        value={value}
      ></textarea>
      {rocket && (
        <div className={classes['send-area']}>
          <ImageAnimated imageAnimated="/img/rocket-unscreen.gif" imageFixed="/img/rocket.png" onClick={handleClick} />
        </div>
      )}
    </div>
  );
}
