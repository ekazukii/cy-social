import Message from "./Message";
import classes from "./conversation.module.css";
import React, { useRef, useEffect } from 'react';

/**
 * 
 * @param {Object} props
 * @param {Object} props.author
 * @param {Number} props.author
 * @param {Object} props.groups
 * @returns 
 */

export default function CreatePoste( props ) {
  return (
    <div className={classes["create-post-container"]}>
      {props.groups.map((message, index) => (
        <Message
          key={index}
          content={message.content}
          author={message.author}
          isSender={message.author === author}
          ref={messagesEndRef}
        />
      ))}
      <div style={{ float:"left", clear: "both" }} ref={messagesEndRef} />
    </div>
  );
}
