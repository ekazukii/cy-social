import React, { useState } from 'react';
import classes from './banner.module.css';
import Icon from '../Icon/Icon';
import NiceAvatar from 'react-nice-avatar';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import Input from '../Input/Input';
import { getBaseUrl } from '../../utils/config';
import { useSession } from '../../hooks/useSession';

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
export default function HeaderProfil({ user, group }) {
  const moveToFollow = (id) => {
    window.location.replace(`/follows/${id}`);
  };

  const moveToFollower = (id) => {
    window.location.replace(`/followers/${id}`);
  }
  return (
    <>
      {user && (
        <div className={classes['header-profil-container']}>
          <div className={classes['header-profil-top']}>
            <img src="/img/banner.png" alt={user.name} />
            <span>@{user.username}</span>
          </div>
          <div className={classes['header-profil-mid']}>
            <div className={classes['header-profil-user-pic']}>
              <NiceAvatar
                style={{ width: '4rem', height: '4rem' }}
                {...JSON.parse(user.profile_pic)}
                id={'nice-avatar'}
              />
            </div>
            <div className={classes['header-profil-user-details']}>
              <div className={classes['header-profil-user-details-name']}>{user.name}</div>
              <div className={classes['header-profil-user-details-bio']}>
                <Modal trigger={<Button type={'primary'} text={'Envoyer un message'} />} title="Créer une conversation">
                  <Input type={'text'} label={'Nom de la conversation'} />
                  <Input type={'text'} label={'Username du destinataire'} value={user.username} isValid />
                  <Button
                    handleClick={async () => {
                      fetch(getBaseUrl() + '/conversation', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                          title: 'Test name',
                          id_user: user.id,
                          id_author: selfUser?.id
                        })
                      });
                    }}
                    text={'Créer'}
                  />
                </Modal>
              </div>
              {/* {user.isUser ? (<Button text="Suivre" type="primary"/>) : (<Button text="Paramètres" type="primary"/>)} */}
            </div>
          </div>
          <div className={classes['header-profil-bottom']}>
            <span>{user.nbPosts} Postes publiés</span>
            <span onClick={() => moveToFollower(user.id)}>{user.nbFollows} Abonnements</span>
            <span onClick={() => moveToFollow(user.id)}>{user.nbFollowers} Abonnés</span>
          </div>
        </div>
      )}

      {group && (
        <div className={classes['header-profil-container']} style={{ marginBottom: '1.75rem' }}>
          <div className={classes['header-profil-top']}>
            <img src="/img/banner.png" alt={group.name} />
            <span>@{group.name}</span>
          </div>
          <div className={classes['header-profil-mid']}>
            <div className={classes['header-profil-user-pic']}>
              <img src={group.img} alt={group.name} />
            </div>
            <div className={classes['header-profil-user-details']}>
              <div className={classes['header-profil-user-details-name']}>
                {new Date(group.date_crea).toLocaleDateString()}
              </div>
              <div className={classes['header-profil-user-details-bio']}>
                <span>{group.description}</span>
              </div>
              {/* {user.isUser ? (<Button text="Suivre" type="primary"/>) : (<Button text="Paramètres" type="primary"/>)} */}
            </div>
          </div>
          <div className={classes['header-profil-bottom']}>
            <span>{group.nbPosts} Postes publiés</span>
            <span>{group.nbMembers} Membres</span>
            <span>{group.is_private ? 'Groupe public' : 'Groupe privé'}</span>
          </div>
        </div>
      )}
    </>
  );
}
