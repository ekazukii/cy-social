import classes from './recapfav.module.css';
import Icon from '../Icon/Icon';
import PercentBar from '../Percent-bar/Percent-bar';
import { extractFirstSentence } from '../../utils/extractFirstSentence';

/**
 *
 * @param {Object} props
 * @param {Object} props.post
 * @returns
 */
export default function RecapFav(props) {
  if (props.content === undefined) return <></>;
  return (
    <>
      <div
        className={classes['recap-container'] + ' ' + classes['recap-fav']}
        style={{ backgroundColor: props.indice % 2 === 0 ? 'rgb(210,210,210)' : '' }}
      >
        <div className={classes['recap-left']}>
          <div className={classes['recap-left-top']}>
            <span>{extractFirstSentence(props.post.content)}</span>
          </div>
          <div className={classes['recap-left-bottom']}>
            <PercentBar
              yesNumber={props.post.votes_for}
              otherNumber={props.post.votes_neutral}
              noNumber={props.post.votes_against}
              id_poste={props.poste.id}
            />
          </div>
        </div>
        <div className={classes['recap-right']}>
          <Icon icon="fi fi-rr-heart" stats={props.post.likes} />
          <Icon icon="fi fi-rr-comment-alt-middle" stats={props.post.comments} />
          <Icon icon="fi fi-rr-stats" stats={props.post.view_count} />
        </div>
      </div>
    </>
  );
}
