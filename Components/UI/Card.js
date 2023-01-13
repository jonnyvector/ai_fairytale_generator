import { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../../pages";
import classes from "./Card.module.css";

function Card(props) {
  const theme = useContext(ThemeContext);
  const [newTheme, setNewTheme] = useState(null);

  useEffect(() => {
    setNewTheme(theme);
  }, [theme]);

  return (
    <div
      className={`${
        newTheme === "science fiction"
          ? [classes.card, classes.scifi].join(" ")
          : newTheme === "fantasy"
          ? [classes.card, classes.fantasy].join(" ")
          : newTheme === "adventure"
          ? [classes.card, classes.adventure].join(" ")
          : classes.card
      }`}
    >
      <h4 className={classes.heading}>{props.title}</h4>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
}

export default Card;
