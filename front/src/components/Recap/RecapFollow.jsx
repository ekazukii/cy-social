import classes from './recapFollow.module.css';
import Icon from '../Icon/Icon';
import { getBaseUrl } from '../../utils/config';
import { useState } from 'react';
import NiceAvatar from 'react-nice-avatar';

/**
 *
 * @param {Object} props
 * @param {Object} props.user
 * @param {Object} props.follower
 * @param {Boolean} props.isFollow
 * @param {Boolean} props.addButton
 * @returns
 */
export default function RecapFollow(props) {
  const [icon, setIcon] = useState(props.isFollow ? 'fi fi-sr-door-open' : 'fi fi-sr-add');
  const [add, setAdd] = useState(props.isFollow);

  const moveToUser = () => {
    window.location.replace(`/profil/${props.user.id}`);
  };

  return (
    <>
      <div
        className={classes['recap-container'] + ' ' + classes['recap-user']}
        style={{ backgroundColor: props.indice % 2 === 0 ? 'rgb(210,210,210)' : '' }}
      >
        <div className={classes['recap-left']}>
          <NiceAvatar
            style={{ width: '4rem', height: '4rem' }}
            {...JSON.parse(props.user.profile_pic)}
            id={'nice-avatar'}
          />
        </div>
        <div className={classes['recap-mid']}>
          <div>
            <span>{props.user.name}</span>
          </div>
          <div>
            <span>@{props.user.username}</span>
          </div>
        </div>
        <div className={classes['recap-right']}>
          <div className={classes['recap-right-top']}>
            <span>{props.user.nbPosts}</span>
            <Icon icon="fi fi-rr-poll-h" notClickable={true} />
          </div>
          <div className={classes['recap-right-bottom']}>
            <span>{props.user.nbFollowers}</span>
            <Icon icon="fi fi-rr-user" notClickable={true} />
          </div>
        </div>
        {props.addButton && (
          <div className={classes['recap-button']}>
            <Icon
              icon="fi fi-sr-eye"
              iconClicked="fi fi-sr-eye"
              hoverColor="icon-will-be-blue"
              handleClick={() => {
                moveToUser();
              }}
            />
            {props.user.id != props.follower.id &&
              (add ? (
                <Icon
                  icon={icon}
                  iconClicked={icon}
                  hoverColor="icon-will-be-blue"
                  handleClick={() => {
                    fetch(`${getBaseUrl()}/user/unfollow`, {
                      method: 'DELETE',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({
                        userId: props.user.id,
                        followerId: props.follower.id
                      })
                    }).then(response => {
                      console.log(response);
                      if (response.ok) {
                        // Si la réponse est OK, afficher une icône de plus
                        setIcon('fi fi-sr-add');
                        setAdd(false);
                      } else {
                        // Si la réponse est KO, afficher une icône de porte
                        setIcon('fi fi-sr-door-open');
                      }
                    });
                  }}
                />
              ) : (
                <Icon
                  icon={icon}
                  iconClicked={icon}
                  hoverColor="icon-will-be-blue"
                  handleClick={() => {
                    fetch(`${getBaseUrl()}/user/follow`, {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({
                        userId: props.user.id,
                        followerId: props.follower.id
                      })
                    }).then(response => {
                      console.log(response);
                      if (response.ok) {
                        // Si la réponse est OK, afficher une icône de plus
                        setIcon('fi fi-sr-door-open');
                        setAdd(true);
                      } else {
                        // Si la réponse est KO, afficher une icône de porte
                        setIcon('fi fi-sr-add');
                      }
                    });
                  }}
                />
              ))}
          </div>
        )}
      </div>
    </>
  );
}
