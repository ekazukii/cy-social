import React, { useState } from 'react';
import Button from "../Button/Button";
import classes from "./login.module.css";

export default function Modal(props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Button text={"Ouvrir la modal"} type={"primary"} handleClick={toggleModal}/>
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