import React, { useState } from 'react';
import classes from './icon.module.css';
import Bubble from '../Bubble/Bubble';

/**
 *
 * @param {Object} props
 * @param {String} props.className
 * @param {String} props.hoverColor
 * @param {String} props.icon
 * @param {String} props.iconClicked
 * @param {Number} props.number
 * @param {Number} props.stats
 * @param {Boolean} props.isNotified
 * @param {Boolean} props.notClickable
 * @returns
 */
export default function Icon(props) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    if (props.notClickable) return;
    setIsClicked(!isClicked);
    typeof props.handleClick === 'function' && props.handleClick();
  };

  const iconClass = isClicked ? classes['icon'] + ' ' + classes['clicked'] : classes['icon'];

  return (
    <div className={classes.container + ' ' + classes[props.className]}>
      <div
        className={iconClass + ' ' + classes[props.hoverColor]}
        style={{ fontSize: props.font_size, lineHeight: props.line_height, color: props.color }}
        onClick={handleClick}
      >
        <i className={isClicked ? props.iconClicked : props.icon}></i>
        {props.stats && <span className={classes['text-number']}>{props.stats}</span>}
      </div>
      {props.isNotified && <Bubble number={props.number} />}
    </div>
  );
}

Icon.defaultProps = {
  font_size: '1rem',
  line_height: '1rem',
  color: "black"
};
