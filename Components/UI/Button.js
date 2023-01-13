import { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../../pages";
import classes from "./Button.module.css";

function Button(props) {
  const theme = useContext(ThemeContext);
  const [newTheme, setNewTheme] = useState(null);

  useEffect(() => {
    setNewTheme(theme);
  }, [theme]);

  return (
    <button
      disabled={props.disabled}
      type="button"
      className={`${
        newTheme === "adventure"
          ? [classes.button, classes.adventure].join(" ")
          : newTheme === "fantasy"
          ? [classes.button, classes.fantasy].join(" ")
          : newTheme === "science fiction"
          ? [classes.button, classes.scifi].join(" ")
          : ""
      }`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

export default Button;
