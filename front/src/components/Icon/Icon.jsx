import React, { useState } from 'react';
import classes from "./icon.module.css";

export default function Icon(props) {
    const [isClicked, setIsClicked] = useState(false);
  
    const handleClick = () => {
      setIsClicked(!isClicked);
    };
  
    const iconClass = isClicked ? classes['icon'] +' '+ classes['clicked'] : classes['icon'];
  
    return (
      <div className={iconClass + ' ' + classes[props.hoverColor]} onClick={handleClick}>
        <i className={isClicked ? props.iconClicked : props.icon}></i>
        <span className={classes["text-number"]}>{props.number}</span>
      </div>
    );
  }