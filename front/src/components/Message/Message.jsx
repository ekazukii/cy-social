import classes from "./message.module.css";

export default function Message({ content, isSender, author }) {
  return (
    <p className={`${classes["message"]} ${isSender && classes["left"]}`}>
      {content}
    </p>
  );
}
