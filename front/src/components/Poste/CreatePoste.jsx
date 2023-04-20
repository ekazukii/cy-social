import HeaderProfil from "../Header-profil/Header-profil";
import TextArea from "../TextArea/TextArea";
import Button from "../Button/Button"
import classes from "./createPoste.module.css";
import React, { useRef, useState } from 'react';

/**
 * 
 * @param {Object} props
 * @param {Object} props.author
 * @param {Number} props.author.id
 * @param {String} props.author.name
 * @param {String} props.author.img
 * @param {Object} props.groups
 * @returns 
 */

export default function CreatePoste( props ) {
    const avatarRef = useRef(null);
    const [isHovering, setIsHovering] = useState(false);
   
    const handleHover = () => {
       setIsHovering(true);
     };
   
    const handleLeave = () => {
       setIsHovering(false);
     };

  return (
    <div className={classes["create-post-container"]}>
      {/* {props.groups.map((group, index) => (
        // <Message
        //   key={index}
        //   name={group.name}
        // />
      ))} */}
        <div className={classes["create-post-author"]}>
            <img
                src={props.author.profile_pic}
                alt={props.author.username}
                ref={avatarRef}
                onMouseEnter={handleHover} 
                onMouseLeave={handleLeave}
            />
            <div className={classes["hoverCard"]}>{isHovering && <HeaderProfil user={props.author}/>}</div>
        </div>
      <div className={classes["create-post-content"]}>
        <div className={classes["create-post-content-header"]}>
            Header / Choix du groupe
        </div>
        <div className={classes["create-post-content-body"]}>
            <TextArea rocket={false}/>
        </div>
        <div className={classes["create-post-content-footer"]}>
            <Button text="Envoyer" type="primary"/>
        </div>
      </div>
    </div>
  );
}
