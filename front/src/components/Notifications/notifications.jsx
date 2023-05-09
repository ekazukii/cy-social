import classes from './notifications.module.css';
import Icon from '../Icon/Icon';
import { getBaseUrl } from '../../utils/config';
import NiceAvatar from 'react-nice-avatar';
//<NiceAvatar style={{ width: '4rem', height: '4rem' }} {...JSON.parse(props.image)} id={'nice-avatar'} />

/**
 *
 * @param {Object} props
 * @param {String} props.author
 * @param {Date} props.time
 * @param {String} props.content
 * @param {String} props.img link of img
 * @param {String} props.read
 * @returns
 */
export default function Notifications(props) {
  const clickNotif = async e => {
    const data = await fetch(getBaseUrl() + '/notif', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: props.id_notif
      })
    });

    if (data.ok) window.location.replace(location.origin + props.link);
  };

  return (
    <div className={classes['notif-container']} onClick={clickNotif}>
      <div className={classes['notif-pic-author']}>
        <NiceAvatar style={{ width: '4rem', height: '4rem' }} {...JSON.parse(props.image)} id={'nice-avatar'} />
      </div>
      <div className={classes['notif-body']}>
        <div className={classes['notif-detail']}>
          <div className={classes['notif-detail-author']}>
            <span>{props.author}</span>
          </div>
          <div className={classes['notif-detail-time']}>
            <span>{props.time}</span>
          </div>
        </div>

        <div className={classes['notif-content']}>
          <p>{props.content}</p>
        </div>
      </div>
      <Icon icon="fi fi-rr-trash" />
    </div>
  );
}
