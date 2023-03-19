import Message from "./Message";
import classes from "./conversation.module.css";

export default function Conversation({ messages, author }) {
  return (
    <div className={classes["conversation-container"]}>
      {messages.map((message, index) => (
        <Message
          key={index}
          content={message.content}
          author={message.author}
          isSender={message.author === author}
        />
      ))}
    </div>
  );
}
