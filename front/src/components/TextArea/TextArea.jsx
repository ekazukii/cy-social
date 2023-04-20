import classes from './textarea.module.css';
import Icon from "../Icon/Icon"
import ImageAnimated from "../ImageAnimated/ImageAnimated"

/**
 * 
 * @param {Boolean} rocket 
 * @returns 
 */
export default function TextArea( {rocket = true}) {
  return (
    <>
    <div className={classes["container"]}>
        <textarea className={classes["content-area"]} placeholder="Aa"></textarea>
        {rocket && 
          <div className={classes["send-area"]}>
              <ImageAnimated imageAnimated = "/img/rocket-unscreen.gif" imageFixed = "/img/rocket.png"/>
          </div>
        }
    </div>
    </>
  );
}