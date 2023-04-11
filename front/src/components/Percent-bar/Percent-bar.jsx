import classes from './percent-bar.module.css';

export default function PercentBar(props) {
  const { yesNumber, noNumber, otherNumber } = props;

  const totalVote = yesNumber + noNumber + otherNumber;
  const yesPercent = (yesNumber / totalVote) * 100;
  const noPercent = (noNumber / totalVote) * 100;
  const otherPercent = (otherNumber / totalVote) * 100;

  return (
    <div className={classes["percent-bar"]}>
      <div
        className={classes["percent-bar-inner"] + " " + classes["percent-bar-yes"]}
        style={{ width: `${yesPercent}%` }}
      >
        {yesNumber}
      </div>
      <div
        className={classes["percent-bar-inner"] + " " + classes["percent-bar-other"]}
        style={{ width: `${otherPercent}%` }}
      >
        {otherNumber}
      </div>
      <div
        className={classes["percent-bar-inner"] + " " + classes["percent-bar-no"]}
        style={{ width: `${noPercent}%` }}
      >
        {noNumber}
      </div>
    </div>
  );
}