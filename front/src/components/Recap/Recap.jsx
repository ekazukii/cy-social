import classes from './recap.module.css';
import Icon from '../Icon/Icon';
import Button from '../Button/Button';
import { getBaseUrl } from '../../utils/config';
import { useState } from 'react';

/**
 *
 * @param {Object} props
 * @param {Object} props.group
 * @param {Boolean} props.isLinkToGroup
 * @returns
 */
export default function Recap(props) {
  const [icon, setIcon] = useState(props.isInGroup ? 'fi fi-sr-door-open' : 'fi fi-sr-add');

  const moveToPost = () => {
    window.location.replace(`/group/${props.group.id}`);
  };

  return (
    <>
      <div
        className={classes['recap-container'] + ' ' + classes['recap-group']}
        style={{
          backgroundColor: props.indice % 2 === 0 ? 'rgb(210,210,210)' : '',
          cursor: props.isLinkToGroup ? 'pointer' : 'default'
        }}
        onClick={props.isLinkToGroup ? moveToPost : undefined}
      >
        <div className={classes['recap-left']}>
          <img src={props.group.img} alt={props.group.name} width={'4rem'} height={'4rem'} />
        </div>
        <div className={classes['recap-mid']}>
          <div>
            <span>{props.group.name}</span>
            {props.group.isPrivate && <Icon icon="fi fi-rr-lock" />}
          </div>
          <div>
            <span>{props.group.description}</span>
          </div>
        </div>
        <div className={classes['recap-right']}>
          <div className={classes['recap-right-top']}>
            <span>{props.group.nbPosts}</span>
            <Icon icon="fi fi-rr-poll-h" />
          </div>
          <div className={classes['recap-right-bottom']}>
            <span>{props.group.nbMembers}</span>
            <Icon icon="fi fi-rr-user" />
          </div>
        </div>
        {props.addButton && (
          <div className={classes['recap-button']}>
            <Icon
              icon="fi fi-sr-eye"
              iconClicked="fi fi-sr-eye"
              hoverColor="icon-will-be-blue"
              handleClick={() => {
                moveToPost();
              }}
            />
            {props.isInGroup ? (
              <Icon
                icon={icon}
                iconClicked={icon}
                hoverColor="icon-will-be-blue"
                handleClick={() => {
                  fetch(`${getBaseUrl()}/group/leave`, {
                    method: 'DELETE',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                      id_group: props.group.id,
                      id_user: props.user.id
                    })
                  }).then(response => {
                    if (response.ok) {
                      // Si la réponse est OK, afficher une icône de plus
                      setIcon('fi fi-sr-add');
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
                  fetch(`${getBaseUrl()}/group/follow`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                      id_group: props.group.id,
                      id_user: props.user.id
                    })
                  }).then(response => {
                    if (response.ok) {
                      // Si la réponse est OK, afficher une icône de plus
                      setIcon('fi fi-sr-door-open');
                    } else {
                      // Si la réponse est KO, afficher une icône de porte
                      setIcon('fi fi-sr-add');
                    }
                  });
                }}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
}
