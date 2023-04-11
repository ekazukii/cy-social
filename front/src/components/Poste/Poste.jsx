import React, { useRef, useState } from 'react';
import Icon from "../Icon/Icon";
import PercentBar from "../Percent-bar/Percent-bar";
import classes from "./poste.module.css";
import HeaderProfil from "../Header-profil/Header-profil"

/**
 * 
 * @param {Object} props 
 * @param {String} props.username
 * @param {Number} props.nbPoste
 * @param {Number} 
 * @returns 
 */
export default function Poste(props) {
 const avatarRef = useRef(null);
 const [isHovering, setIsHovering] = useState(false);

 const handleHover = () => {
    setIsHovering(true);
  };

 const handleLeave = () => {
    setIsHovering(false);
  };

 return (
    <div className={classes["post-container"]}>
        <div className={classes["post-user"]}>
            <img
            src="/img/avatar.png"
            alt="user"
            ref={avatarRef}
            onMouseEnter={handleHover} 
            onMouseLeave={handleLeave}
            />
            <div className={classes["hoverCard"]}>{isHovering && <HeaderProfil username={props.username} nbPoste={props.nbPoste} nbFollow={props.nbFollow} nbFollower={props.nbFollower}/>}</div>
        </div>
        <div className={classes["post-content"]}>
            <div className={classes["post-header"]}>
                <div className={classes["post-name-user"]}>
                    <span>{props.name}</span>
                </div>
                <div className={classes["post-detail-user"]}>
                    <span>{props.username}</span>
                </div>
                <div className={classes["post-head-separator"]}>
                    <span>·</span>
                </div>
                <div className={classes["post-time"]}>
                    <span>{props.datePublished}</span>
                </div>
            </div>
            <div className={classes["post-body"]}>
                <div className={classes["post-body-text"]}>
                    <p>{props.content}</p>
                </div>
                <div className={classes["post-body-img"]}>
                <img
                src="/img/test_post_img.jpg"
                alt="img"
                width="50%"
                />
                </div>
                <div className={classes["post-body-survey"]}>
                    <PercentBar yesPercent={props.yesPercent} otherPercent={props.otherPercent} noPercent={props.noPercent} />
                </div>
            </div>
            <div className={classes["post-react"]}>
                <Icon icon="fi fi-rr-heart" iconClicked="fi fi-sr-heart" hoverColor="icon-will-be-red" number={props.nbLike}/>
                <Icon icon="fi fi-rr-comment-alt-middle" hoverColor="icon-will-be-blue" number={props.nbComment}/>
                <Icon icon="fi fi-rr-stats" hoverColor="icon-will-be-green" number={props.nbrVue}/>
            </div>
        </div>
    </div>
  );
}