import React, { useRef, useState } from 'react';
import Icon from '../Icon/Icon';
import PercentBar from '../Percent-bar/Percent-bar';
import classes from './poste.module.css';
import HeaderProfil from '../Header-profil/Header-profil';
import { getBaseUrl } from '../../utils/config';

/**
 *
 * @param {Object} props
 * @param {Object} props.poste
 * @param {Number} props.poste.id
 * @param {Date} props.poste.date_publi
 * @param {String} props.poste.content
 * @param {String} props.poste.img
 * @param {Number} props.poste.view_count
 * @param {Number} props.poste.comments
 * @param {Number} props.poste.likes
 * @param {Number} props.poste.votes_against
 * @param {Number} props.poste.votes_neutral
 * @param {Number} props.poste.votes_for
 * @param {Object} props.user
 * @param {String} props.user.name
 * @param {String} props.user.username
 * @param {Number} props.user.nbPoste
 * @param {Number} props.user.nbFollow
 * @param {Number} props.user.nbFollower
 * @param {String} props.username
 * @param {Number} props.nbPoste
 * @param {Boolean} props.isLinkToPost
 * @param {Number}
 * @returns
 */
export default function Poste(props) {
  const avatarRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  const handleHover = () => {
    setIsHovering(true);
  };

  const handleLeave = () => {
    setIsHovering(false);
  };

  const moveToPost = () => {
    window.location.replace(`/post/${props.poste.id}`);
  };
  return (
    <div className={classes['post-container']} key={props.poste.id}>
      <div className={classes['post-user']}>
        <img
          src={props.user.profile_pic}
          alt={props.user.name}
          ref={avatarRef}
          onMouseEnter={handleHover}
          onMouseLeave={handleLeave}
        />
        <div className={classes['hoverCard']}>{isHovering && <HeaderProfil user={props.user} />}</div>
      </div>
      <div className={classes['post-content']}>
        <div className={classes['post-header']}>
          <div className={classes['post-name-user']}>
            <span>{props.user.name}</span>
          </div>
          <div className={classes['post-detail-user']}>
            <span>{props.user.username}</span>
          </div>
          <div className={classes['post-head-separator']}>
            <span>·</span>
          </div>
          <div className={classes['post-time']}>
            <span>{props.poste.date_publi}</span>
          </div>
        </div>
        <div
          className={classes['post-body']}
          onClick={props.isLinkToPost && moveToPost}
          style={props.isLinkToPost ? { cursor: 'pointer' } : {}}
        >
          <div className={classes['post-body-text']}>
            <p>{props.poste.content}</p>
          </div>
          <div className={classes['post-body-img']}>
            <img src={props.poste.img} alt="img" width="50%" />
          </div>
          <div className={classes['post-body-survey']}>
            <PercentBar
              yesNumber={props.poste.votes_for}
              otherNumber={props.poste.votes_neutral}
              noNumber={props.poste.votes_against}
            />
          </div>
        </div>
        <div className={classes['post-react']}>
          <Icon
            icon="fi fi-rr-heart"
            iconClicked="fi fi-sr-heart"
            hoverColor="icon-will-be-red"
            stats={props.poste.likes}
            handleClick={isClicked => {
              console.log('IS CLICKED');
              if (isClicked) {
                fetch(`${getBaseUrl()}/post/like`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    id: props.poste.id,
                    user: 1
                  })
                });
              } else {
                fetch(`${getBaseUrl()}/post/like`, {
                  method: 'DELETE',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    id: props.poste.id,
                    user: 1
                  })
                });
              }
            }}
          />
          <Icon icon="fi fi-rr-comment-alt-middle" hoverColor="icon-will-be-blue" stats={props.poste.comments} />
          <Icon icon="fi fi-rr-stats" hoverColor="icon-will-be-green" stats={props.poste.view_count} />
        </div>
      </div>
    </div>
  );
}

Poste.defaultProps = {
  isLinkToPost: true
};
