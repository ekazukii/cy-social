import classes from './recapConv.module.css';
import NiceAvatar from 'react-nice-avatar';

/**
 *
 * @param {Object} props
 * @param {String} props.author
 * @param {String} props.content
 * @param {String} props.title
 * @param {Date} props.time
 * @param {Date} props.pic
 * @returns
 */
export default function RecapConv(props) {
  const handleClick = () => {
    props.onClick();
  };

  return (
    <div className={classes['container']}>
      <div className={classes['img-grp-conv']}>
        <NiceAvatar style={{ width: '4rem', height: '4rem' }} {...JSON.parse(props.image)} />
      </div>
      <div className={classes['prevu-conv']} onClick={handleClick}>
        <div className={classes['info-conv']}>
          <div className={classes['info-conv-title']}>
            <span>{props.title}</span>
          </div>
          <div className={classes['info-conv-time']}>
            <span>{props.time}</span>
          </div>
        </div>
        <div className={classes['content-conv']}>
          <p>
            <span>{props.author} :</span> {props.content.substr(0, 30)}...
          </p>
        </div>
      </div>
    </div>
  );
}
