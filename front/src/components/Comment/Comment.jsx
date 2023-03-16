import React, { useState } from 'react';
import Icon from "../Icon/Icon";
import classes from "./comment.module.css";

export default function Comment(props) { 
    return (
       <div className={classes["comment-container"]}>
        <div className={classes["comment-first"]}>
           <div className={classes["comment-user"]}>
               <img
               src="/img/avatar.png"
               alt="user"
               />
           </div>
           <div className={classes["comment-content"]}>
               <div className={classes["comment-header"]}>
                   <div className={classes["comment-header-first"]}>
                       <div className={classes["comment-name-user"]}>
                           <span>{props.name}</span>
                       </div>
                       <div className={classes["comment-detail-user"]}>
                           <span>{props.username}</span>
                       </div>
                       <div className={classes["comment-head-separator"]}>
                           <span>·</span>
                       </div>
                       <div className={classes["comment-time"]}>
                           <span>{props.time}</span>
                       </div>
                   </div>
                   <div className={classes["comment-header-second"]}>
                       <span>En réponse à {props.recipient}</span>
                   </div>
               </div>
               <div className={classes["comment-body"]}>
                   <p>{props.content}</p>
               </div>
               <div className={classes["comment-react"]}>
                   <Icon icon="fi fi-rr-heart" iconClicked="fi fi-sr-heart" hoverColor="icon-will-be-red" number="10"/>
                   <Icon icon="fi fi-rr-comment-alt-middle" hoverColor="icon-will-be-blue" number="300"/>
                   <Icon icon="fi fi-rr-stats" hoverColor="icon-will-be-green" number="1 205"/>
               </div>
           </div>
           </div>
           <div className={classes["comment-response"]}>
                <CommentResponse comments={props.comments} />
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
  