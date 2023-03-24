import React, { useState } from 'react';
import Icon from "../Icon/Icon";
import Button from "../Button/Button";
import classes from "./header-profil.module.css";

export default function HeaderProfil(props) {
 return (
    <div className={classes["header-profil-container"]}>
        <div className={classes["header-profil-user"]}>
            <div className={classes["header-profil-user-pic"]}>
                <img
                src="/img/avatar.png"
                alt="user"
                />
                <span>{props.username}</span>
            </div> 
            <div className={classes["header-profil-user-details"]}>
                <span>{props.nbPoste} Postes publiés</span>
                <span>{props.nbFollow} Abonnements</span>
                <span>{props.nbFollower} Abonné</span>
                {props.isUser ? (<Button text="Suivre" type="primary"/>) : (<Button text="Paramètres" type="primary"/>)}
            </div>
        </div>
        <div className={classes["header-profil-group"]}> 
{/* Ajouter un affichage de groupe coooooooooool */}
        </div>
    </div>
  );
}