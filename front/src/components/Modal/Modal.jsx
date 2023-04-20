import React, { useState } from 'react';
import Button from "../Button/Button";
import classes from "./modal.module.css";

/**
 * 
 * @param {Object} props 
 * @param {String} props.title
 * @param {String} props.children
 * @returns 
 */
export default function Modal(props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Button text={props.textButton} type={"primary"} handleClick={toggleModal}/>
      {isOpen && (
        <div className={classes["modal-overlay"]}>
          <div className={classes["modal"]}>
            <div className={classes["modal-header"]}>
              <h2>{props.title}</h2>
              <Button text={"X"} type={"secondary"} handleClick={toggleModal}/>
            </div>
            <div className={classes["modal-content"]}>{props.children}</div>
          </div>
        </div>
      )}
    </>
  );
}