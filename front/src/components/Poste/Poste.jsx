import React, { useState } from 'react';
import Icon from "../Icon/Icon";
import PercentBar from "../Percent-bar/Percent-bar";
import classes from "./poste.module.css";

export default function Poste(props) {
 return (
    <div className={classes["post-container"]}>
        <div className={classes["post-user"]}>
            <img
            src="/img/avatar.png"
            alt="user"
            />
        </div>
        <div className={classes["post-content"]}>
            <div className={classes["post-header"]}>
                <div className={classes["post-name-user"]}>
                    <span>Baillet Tom</span>
                </div>
                <div className={classes["post-detail-user"]}>
                    <span>@Youbuze</span>
                </div>
                <div className={classes["post-head-separator"]}>
                    <span>·</span>
                </div>
                <div className={classes["post-time"]}>
                    <span>13h</span>
                </div>
            </div>
            <div className={classes["post-body"]}>
                <div className={classes["post-body-text"]}>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis rem, veritatis ut cum iste dignissimos eveniet eos quod fugiat laborum, facilis libero similique? Molestiae eligendi repudiandae ad at distinctio numquam.</p>
                </div>
                <div className={classes["post-body-img"]}>
                <img
                src="/img/test_post_img.jpg"
                alt="img"
                width="50%"
                />
                </div>
                <div className={classes["post-body-survey"]}>
                    <PercentBar yesPercent={60} otherPercent={10} noPercent={30} />
                </div>
            </div>
            <div className={classes["post-react"]}>
                <Icon icon="fi fi-rr-heart" iconClicked="fi fi-sr-heart" hoverColor="icon-will-be-red" number="10"/>
                <Icon icon="fi fi-rr-comment-alt-middle" hoverColor="icon-will-be-blue"/>
                <Icon icon="fi fi-rr-stats" hoverColor="icon-will-be-green"/>
            </div>
        </div>
    </div>
  );
}