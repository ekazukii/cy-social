import classes from "./recap.module.css";
import Icon from "../Icon/Icon"

/**
 * 
 * @param {Object} props 
 * @param {Object} props.group
 * @param {Boolean} props.isLinkToGroup
 * @returns 
 */
export default function Recap(props) {

    const moveToUser = () => {
        window.location.replace(`/group/${props.group.id}`);
      }

    return (
      <>
      <div className = {classes["recap-container"] + " " + classes["recap-group"]} style={{ backgroundColor: props.indice % 2 === 0 ? "rgb(210,210,210)" : "" }} onClick={props.isLinkToGroup && moveToPost}>
        <div className={classes["recap-left"]}>
            <img
                src={props.group.img}
                alt={props.group.name}
            />
        </div>
        <div className={classes["recap-mid"]}>
                <div>
                    <span>{props.group.name}</span>
                    {props.group.isPrivate && <Icon icon="fi fi-rr-lock"/>}
                </div>
                <div>
                    <span>{props.group.description}</span>
                </div>
        </div>
        <div className={classes["recap-right"]}>
            <div className={classes["recap-right-top"]}>
                <span>{props.group.nbPosts}</span>
                <Icon icon="fi fi-rr-poll-h"/>
            </div>
            <div className={classes["recap-right-bottom"]}>
                <span>{props.group.nbMembers}</span>
                <Icon icon="fi fi-rr-user"/>
            </div>
        </div>
      </div>
      </>
    );
  }