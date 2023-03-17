import React, { useState } from 'react';
import classes from "./icon.module.css";
import Bubble from '../Bubble/Bubble';

export default function Icon(props) {
    const [isClicked, setIsClicked] = useState(false);
  
    const handleClick = () => {
      setIsClicked(!isClicked);
    };
  
    const iconClass = isClicked ? classes['icon'] +' '+ classes['clicked'] : classes['icon'];
  
    return (
      <div className={classes.container}>
      <div className={iconClass + ' ' + classes[props.hoverColor]} onClick={handleClick}>
        <i className={isClicked ? props.iconClicked : props.icon}></i>
        {/*<span className={classes["text-number"]}>{props.number}</span>*/}
      </div>
      <Bubble number="3"/>
      </div>
    );
  }