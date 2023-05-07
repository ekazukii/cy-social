import Notifications from './Notifications';
import classes from './containerNotif.module.css';
import { forwardRef } from 'react';

/**
 *
 * @param {Object[]} notifications
 * @param {Number} notifications.id - L'id de la notification
 * @param {Number} notifications.idAuthor L'id de l'auteur
 * @param {String} notifications.author Auteur responsable de la notification
 * @param {String} notifications.content Contenue de la notification
 * @param {Date} notifications.time Date de publication à l'origine de la notification
 * @param {String} notifications.link Lien qui redirige vers l'objet à l'origine de la notification
 * @param {String} notifications.type Type de la notification : Commentaire, Message, Post etc...
 * @param {Object} ref
 * @returns
 */
export default forwardRef(function containerNotif({ notifications }, ref) {
  return (
    <div ref={ref} className={classes['containerNotif-container']}>
      {notifications.map((notif, index) => (
        <Notifications
          key={index}
          content={notif.title}
          author={notif.username}
          time={`${new Date(notif.creation).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          })} - ${new Date(notif.creation).toLocaleDateString()}`}
          type={notif.type}
          link={notif.link}
          image={notif['profile_pic']}
          id={notif.id}
        />
      ))}
    </div>
  );
});
