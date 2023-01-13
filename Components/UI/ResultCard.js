import classes from "./ResultCard.module.css";

function ResultCard(props) {
  return (
    <div className="result-card">
      <h4 className="result-card-heading">{props.title}</h4>
      <div className="result-card-content">{props.children}</div>
    </div>
  );
}

export default ResultCard;
