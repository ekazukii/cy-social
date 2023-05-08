import React, { useState } from 'react';
import classes from './banner.module.css';
import Icon from '../Icon/Icon';
import NiceAvatar from 'react-nice-avatar';

/**
 *
 * @param {Object} user
 * @param {String} user.profile_pic
 * @param {String} user.username
 * @param {String} user.name
 * @param {Number} user.nbPosts
 * @param {Number} user.nbFollows
 * @param {Number} user.nbFollowers
 * @returns
 */
export default function HeaderProfil({ user }) {
  return (
    <div className={classes['header-profil-container']}>
      <div className={classes['header-profil-top']}>
        <img src="/img/banner.png" alt={user.name} />
        <span>@{user.username}</span>
      </div>
      <div className={classes['header-profil-mid']}>
        <div className={classes['header-profil-user-pic']}>
          <NiceAvatar style={{ width: '4rem', height: '4rem' }} {...JSON.parse(user.profile_pic)} id={'nice-avatar'} />
        </div>
        <div className={classes['header-profil-user-details']}>
          <div className={classes['header-profil-user-details-name']}>{user.name}</div>
          <div className={classes['header-profil-user-details-bio']}>
            <span>Ajouter une bio?</span>
          </div>
          {/* {user.isUser ? (<Button text="Suivre" type="primary"/>) : (<Button text="Paramètres" type="primary"/>)} */}
        </div>
      </div>
      <div className={classes['header-profil-bottom']}>
        <span>{user.nbPosts} Postes publiés</span>
        <span>{user.nbFollows} Abonnements</span>
        <span>{user.nbFollowers} Abonnés</span>
      </div>
    </div>
  );
}
