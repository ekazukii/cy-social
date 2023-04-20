import React, { useState, useRef } from 'react';
import Icon from "../Icon/Icon";
import classes from "./comment.module.css";
import HeaderProfil from "../Header-profil/Header-profil"

/**
 * 
 * @param {Object} props 
 * @param {Object} props.userSender
 * @param {Obhect} props.userReceiver
 * @param {Object} props.comment
 * @returns 
 */
export default function Comment(props) { 
    const avatarRef = useRef(null);
    const [isHovering, setIsHovering] = useState(false);
   
    const handleHover = () => {
       setIsHovering(true);
     };
   
    const handleLeave = () => {
       setIsHovering(false);
     };

    return (
       <div className={classes["comment-container"]}>
        <div className={classes["comment-first"]}>
           <div className={classes["comment-user"]}>
            <img
                src={props.userSender.profile_pic}
                alt={props.userSender.name}
                ref={avatarRef}
                onMouseEnter={handleHover} 
                onMouseLeave={handleLeave}
                />
                <div className={classes["hoverCard"]}>{isHovering && <HeaderProfil user={props.userSender}/>}</div>
           </div>
           <div className={classes["comment-content"]}>
               <div className={classes["comment-header"]}>
                   <div className={classes["comment-header-first"]}>
                       <div className={classes["comment-name-user"]}>
                           <span>{props.userSender.name}</span>
                       </div>
                       <div className={classes["comment-detail-user"]}>
                           <span>{props.userSender.username}</span>
                       </div>
                       <div className={classes["comment-head-separator"]}>
                           <span>·</span>
                       </div>
                       <div className={classes["comment-time"]}>
                           <span>{props.comment.date}</span>
                       </div>
                   </div>
                   <div className={classes["comment-header-second"]}>
                       <span>En réponse à {props.userReceiver.username}</span>
                   </div>
               </div>
               <div className={classes["comment-body"]}>
                   <p>{props.comment.content}</p>
               </div>
               <div className={classes["comment-react"]}>
                   <Icon icon="fi fi-rr-heart" iconClicked="fi fi-sr-heart" hoverColor="icon-will-be-red" number="10"/>
                   <Icon icon="fi fi-rr-comment-alt-middle" hoverColor="icon-will-be-blue" number="300"/>
                   <Icon icon="fi fi-rr-stats" hoverColor="icon-will-be-green" number="1 205"/>
               </div>
           </div>
           </div>
           <div className={classes["comment-response"]}>
                <CommentResponse comments={(props.comment.id_comment > 0) ? props.comment : []} />
           </div>
       </div>
     );
   }
   
  
   function CommentResponse({comments}) {
    return (
      <div>
        {comments.map((comment) => (
          <Comment name={comment.name} username={comment.username} time={comment.time} recipient={comment.recipient} content={comment.content} comments={comment.comments}/>
        ))}
      </div>
    );
  }
  