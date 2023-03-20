import classes from "./navbar.module.css";
import Button from "../Button/Button";
import Icon from '../Icon/Icon';
import Input from "../Input/Input";
import { useEffect, useState } from "react";

export default function Navbar({ isConnected, isNotified, numberNotif }) {
  return (
    <nav>
      <img
        src="https://user-images.githubusercontent.com/28058068/225023680-440646b9-9f7f-45cd-993b-abfbdeb69ba1.png"
        alt="logo"
        width="80rem"
        onClick={() => setCount(count + 1)}
      />
      {isConnected ? (
        <div className={classes["button-group"]}>
          <Icon className="iconNotif" icon="fi fi-rr-bell" iconClicked="fi fi-sr-bell" hoverColor="icon-will-be-blue" isNotified={isNotified} number={numberNotif}/>
          <Button text={"Profile"} type={"primary"} />
          <Button text={"Message"} />
          <Button text={"Déconnexion"} />
        </div>
      ) : (
        <Button text={"Connexion"} type={"primary"} />
      )}
    </nav>
  );
}
