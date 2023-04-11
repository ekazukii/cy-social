import classes from "./navbar.module.css";
import Button from "../Button/Button";
import Icon from '../Icon/Icon';
import Input from "../Input/Input";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import { useEffect, useState, useRef } from "react";
import ContainerNotif from "../Notifications/ContainerNotif";

export default function Navbar({ isConnected, isNotified, numberNotif }) {
  const [afficherDiv, setAfficherDiv] = useState(false);

  const toggleClick = () => {
    setAfficherDiv(!afficherDiv)
  }

  const ref = useRef();
  const ref2 = useRef();

  useOnClickOutside([ref, ref2], () => setAfficherDiv(false));

  const Notif = [
    {
      author: "@Youbuze",
      time: "15/05/2001",
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis libero dolorum ad.",
    },
    {
      author: "@Youbuze",
      time: "15/05/2001",
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis libero dolorum ad.",
    },
  ]

  return (
    <>
      <nav ref={ref}>
        <img
          src="https://user-images.githubusercontent.com/28058068/225023680-440646b9-9f7f-45cd-993b-abfbdeb69ba1.png"
          alt="logo"
          width="80rem"
          onClick={() => setCount(count + 1)}
        />
        {isConnected ? (
          <div className={classes["button-group"]}>
            <Icon className="iconNotif" icon="fi fi-rr-bell" iconClicked="fi fi-sr-bell" hoverColor="icon-will-be-blue" isNotified={isNotified} number={numberNotif} handleClick={toggleClick} />
            <Button text={"Profile"} type={"primary"} link={"/profil"} />
            <Button text={"Message"} link={"/messagerie"}/>
            <Button text={"Déconnexion"} />
          </div>
        ) : (
          <Button text={"Connexion"} type={"primary"} />
        )}
      </nav>
      {afficherDiv && (
        <div className={classes["notifSum"]}>
          <ContainerNotif ref={ref2}  notifications={Notif}/>
        </div>
      )}
    </>
  );
}
