import classes from './textarea.module.css';
import Icon from "../Icon/Icon"
import ImageAnimated from "../ImageAnimated/ImageAnimated"

export default function TextArea() {
  return (
    <>
    <div className={classes["container"]}>
        <textarea className={classes["content-area"]} placeholder="Aa"></textarea>
        <div className={classes["send-area"]}>
            <ImageAnimated imageAnimated = "/img/rocket-unscreen.gif" imageFixed = "/img/rocket.png"/>
        </div>
    </div>
    </>
  );
}