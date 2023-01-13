import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../../pages";
import classes from "./SubmitButton.module.css";

function SubmitButton(props) {
  const theme = useContext(ThemeContext);
  const [newTheme, setNewTheme] = useState(null);

  useEffect(() => {
    setNewTheme(theme);
  }, [theme]);

  return (
    <button
      type="submit"
      className={`${
        newTheme === "adventure"
          ? [classes.button, classes.adventure].join(" ")
          : newTheme === "fantasy"
          ? [classes.button, classes.fantasy].join(" ")
          : newTheme === "science fiction"
          ? [classes.button, classes.scifi].join(" ")
          : ""
      }`}
    >
      {props.children}
    </button>
  );
}

export default SubmitButton;
