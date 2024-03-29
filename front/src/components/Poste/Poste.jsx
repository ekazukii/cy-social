import React, { useRef, useState } from 'react';
import Icon from '../Icon/Icon';
import PercentBar from '../Percent-bar/Percent-bar';
import classes from './poste.module.css';
import HeaderProfil from '../Header-profil/Header-profil';
import Modal from '../Modal/Modal';
import TextArea from '../TextArea/TextArea';
import Button from '../Button/Button';
import NiceAvatar from 'react-nice-avatar';
import { useSession } from '../../hooks/useSession';
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
  const { user, isLoggedIn, setSession, login, refreshData, logout } = useSession();

  const handleHover = () => {
    setIsHovering(true);
  };

  const handleLeave = () => {
    setIsHovering(false);
  };

  const moveToPost = () => {
    window.location.replace(`/post/${props.poste.id}`);
  };

  const moveToUser = id => {
    window.location.replace(`/profil/${id}`);
  };

  const textStyle = {
    textDecoration: isHovering ? 'underline' : 'none',
    cursor: 'pointer'
  };
  return (
    <div className={classes['post-container']} key={props.poste.id}>
      <div className={classes['post-user']}>
        <div>
          <div
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
            ref={avatarRef}
            onClick={() => moveToUser(props.user.id)}
          >
            <NiceAvatar style={{ width: '4rem', height: '4rem' }} {...JSON.parse(props.user.profile_pic)} />
          </div>
          <div className={classes['hoverCard']}>{isHovering && <HeaderProfil user={props.user} />}</div>
        </div>
      </div>
      <div className={classes['post-content']}>
        <div className={classes['post-header']}>
          <div
            className={classes['post-name-user']}
            style={textStyle}
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
            onClick={() => moveToUser(props.user.id)}
          >
            <span>{props.user.name}</span>
          </div>
          <div
            className={classes['post-detail-user']}
            style={textStyle}
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
            onClick={() => moveToUser(props.user.id)}
          >
            <span>@{props.user.username}</span>
          </div>
          <div className={classes['post-head-separator']}>
            <span>·</span>
          </div>
          <div className={classes['post-time']}>
            <span style={{ marginLeft: '0.25rem' }}>
              {new Date(props.poste.date_publi).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -{' '}
              {new Date(props.poste.date_publi).toLocaleDateString()}
            </span>
          </div>
        </div>
        <div className={classes['post-body']}>
          <div
            className={classes['post-body-text']}
            onClick={props.isLinkToPost && moveToPost}
            style={props.isLinkToPost ? { cursor: 'pointer' } : {}}
          >
            <p>{props.poste.content}</p>
          </div>
          <div
            className={classes['post-body-img']}
            onClick={props.isLinkToPost && moveToPost}
            style={props.isLinkToPost ? { cursor: 'pointer' } : {}}
          >
            {props.poste.img && <img src={props.poste.img} alt="img" width="50%" />}
          </div>
          <div className={classes['post-body-survey']}>
            <PercentBar
              yesNumber={props.poste.votes_for}
              otherNumber={props.poste.votes_neutral}
              noNumber={props.poste.votes_against}
              id_poste={props.poste.id}
            />
          </div>
        </div>
        <div className={classes['post-react']}>
          <Modal
            title={'Ajouter un commentaire'}
            children={
              <>
                <TextArea
                  rocket={false}
                  dark={false}
                  placeholder="Je propose l'installation d'une machine à café afin de ..."
                  label={'Description détaillé'}
                  onChange={val => setPostContent(val)}
                />

                <Button
                  text="Envoyer"
                  handleClick={() => {
                    fetch(`${getBaseUrl()}/post`, {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({
                        title: postName,
                        group: postGroup,
                        img: postImg,
                        dateEnd: postVoteEndDate,
                        content: postContent,
                        description: postContent,
                        authorId: props.author?.id?.toString() || '1'
                      })
                    });
                  }}
                />
              </>
            }
            trigger={
              <Icon
                notClickable={true}
                icon="fi fi-rr-comment-alt-middle"
                hoverColor="icon-will-be-blue"
                stats={props.poste.comments}
              />
            }
          />
          <Icon
            icon="fi fi-rr-heart"
            iconClicked="fi fi-sr-heart"
            hoverColor="icon-will-be-red"
            stats={props.poste.likes}
            handleClick={isClicked => {
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
                    user: user.id
                  })
                });
              }
            }}
          />
          <Icon icon="fi fi-rr-stats" hoverColor="icon-will-be-green" stats={props.poste.view_count} />
          {Number(props.user?.id) == user?.id && (
            <Icon
              icon="fi fi-rr-trash"
              iconClicked="fi fi-rr-trash"
              hoverColor="icon-will-be-red"
              handleClick={async () => {
                await fetch(`${getBaseUrl()}/post`, {
                  method: 'DELETE',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    id: props.poste.id
                  })
                });
                props.updatePosts();
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

Poste.defaultProps = {
  isLinkToPost: true
};
