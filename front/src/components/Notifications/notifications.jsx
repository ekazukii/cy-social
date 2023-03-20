import classes from "./notifications.module.css";

/**
 * 
 * @param {Object} props 
 * @param {String} props.author
 * @param {Date} props.time
 * @param {String} props.content
 * @param {String} props.img link of img
 * @returns 
 */
export default function Notifications(props) {
    return (
      <div className = {classes["notif-container"]}>
        <div className={classes["notif-pic-author"]}>
            <img
               src="/img/avatar.png"
               alt="user"
            />
        </div>
        <div className={classes["notif-body"]}>
            <div className={classes["notif-detail"]}>
                <div className={classes["notif-detail-author"]}><span>{props.author}</span></div>
                <div className={classes["notif-detail-time"]}><span>{props.time}</span></div>
            </div>
            <div className={classes["notif-content"]}>
                <p>{props.content}</p>
            </div>
        </div>
      </div>
    );
  }