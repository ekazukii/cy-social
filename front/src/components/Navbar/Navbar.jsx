import "./navbar.css";
import Button from "../Button/Button";
import { useEffect, useState } from "react";

export default function Navbar({ isConnected }) {
  return (
    <nav>
      <img
        src="https://user-images.githubusercontent.com/28058068/225023680-440646b9-9f7f-45cd-993b-abfbdeb69ba1.png"
        alt="logo"
        width="80rem"
        onClick={() => setCount(count + 1)}
      />
      {isConnected ? (
        <div className="button-group">
          <Button text={"Profile"} type={"primary"} />
          <Button text={"Message"} />
          <Button text={"Déconnexion"} />
        </div>
      ) : (
        <Button text={"Connexion"} />
      )}
    </nav>
  );
}
