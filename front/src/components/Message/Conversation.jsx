import Message from "./Message";
import classes from "./conversation.module.css";
import React, { useRef, useEffect } from 'react';

export default function Conversation({ messages, author }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current.scrollIntoView();
  }, []);

  return (
    <div className={classes["conversation-container"]}>
      {messages.map((message, index) => (
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
