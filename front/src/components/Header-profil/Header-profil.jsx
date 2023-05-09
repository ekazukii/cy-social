import React from 'react';
import classes from './header-profil.module.css';
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
      <div className={classes['header-profil-user']}>
        <div className={classes['header-profil-user-pic']}>
          <NiceAvatar style={{ width: '4rem', height: '4rem' }} {...JSON.parse(user.profile_pic)} id={'nice-avatar'} />
          <span>{user.username}</span>
        </div>
        <div className={classes['header-profil-user-details']}>
          <span>{user.nbPosts} Postes publiés</span>
          <span>{user.nbFollows} Abonnements</span>
          <span>{user.nbFollowers} Abonné</span>
          {/* {user.isUser ? (<Button text="Suivre" type="primary"/>) : (<Button text="Paramètres" type="primary"/>)} */}
        </div>
      </div>
      <div className={classes['header-profil-group']}>{/* Ajouter un affichage de groupe coooooooooool */}</div>
    </div>
  );
}
