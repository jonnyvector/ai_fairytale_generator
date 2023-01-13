import classes from "./ContentWrapper.module.css";

function ContentWrapper(props) {
  return <div className={classes.content}>{props.children}</div>;
}

export default ContentWrapper;
