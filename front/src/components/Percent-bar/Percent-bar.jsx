import classes from './percent-bar.module.css';

export default function PercentBar(props) {
  const { yesPercent, noPercent, otherPercent } = props;

  return (
    <div className={classes["percent-bar"]}>
      <div
        className={classes["percent-bar-inner"] + " " + classes["percent-bar-yes"]}
        style={{ width: `${yesPercent}%` }}
      >
        {yesPercent}%
      </div>
      <div
        className={classes["percent-bar-inner"] + " " + classes["percent-bar-other"]}
        style={{ width: `${otherPercent}%` }}
      >
        {otherPercent}%
      </div>
      <div
        className={classes["percent-bar-inner"] + " " + classes["percent-bar-no"]}
        style={{ width: `${noPercent}%` }}
      >
        {noPercent}%
      </div>
    </div>
  );
}