import React, { useState } from 'react';
import classes from "./icon.module.css";
import Bubble from '../Bubble/Bubble';

export default function Icon(props) {
    const [isClicked, setIsClicked] = useState(false);
  
    const handleClick = () => {
      setIsClicked(!isClicked);
      typeof props.handleClick === "function" && props.handleClick()
    };
  
    const iconClass = isClicked ? classes['icon'] +' '+ classes['clicked'] : classes['icon'];

    return (
      <div className={classes.container + " " + classes[props.className]}>
      <div className={iconClass + ' ' + classes[props.hoverColor]} onClick={handleClick}>
        <i className={isClicked ? props.iconClicked : props.icon}></i>
        {/*<span className={classes["text-number"]}>{props.number}</span>*/}
      </div>
      {props.isNotified && <Bubble number={props.number}/>}
      </div>
    );
  }