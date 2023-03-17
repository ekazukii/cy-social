import classes from './bubble.module.css';

export default function Bubble(props) {
  return (
    <div className={classes.container}>
      <span className={classes.number}>{props.number}</span>
    </div>
  );
}