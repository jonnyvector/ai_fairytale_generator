import classes from "./LoadingCard.module.css";
function LoadingCard(props) {
  return (
    <div className={classes.typewriter}>
      <h3>Your Story is Being Written! ✏️</h3>
    </div>
  );
}

export default LoadingCard;
