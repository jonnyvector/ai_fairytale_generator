import { useState, useContext, useEffect } from "react";
import { ThemeContext } from "../../pages";
import classes from "./SmallButton.module.css";

function SmallButton(props) {
  const theme = useContext(ThemeContext);
  const [selectedId, setSelectedId] = useState(null);
  const handleClick = () => {
    props.onClick();
    setSelectedId(props.id);
  };

  const [newTheme, setNewTheme] = useState(null);

  useEffect(() => {
    setNewTheme(theme);
  }, [theme]);

  return (
    <button
      disabled={props.disabled}
      type="button"
      onClick={handleClick}
      isClicked={props.isClicked}
      className={`${
        newTheme === "science fiction" && props.isClicked
          ? [classes.button, classes.scifi, classes["scifi-selected"]].join(" ")
          : newTheme === "science fiction" && !props.isClicked
          ? [classes.button, classes.scifi].join(" ")
          : newTheme === "fantasy" && props.isClicked
          ? [classes.button, classes.fantasy, classes["fantasy-selected"]].join(
              " "
            )
          : newTheme === "fantasy" && !props.isClicked
          ? [classes.button, classes.fantasy].join(" ")
          : newTheme === "adventure" && props.isClicked
          ? [
              classes.button,
              classes.adventure,
              classes["adventure-selected"],
            ].join(" ")
          : newTheme === "adventure" && !props.isClicked
          ? [classes.button, classes.adventure].join(" ")
          : classes.button
      }`}
    >
      {props.children}
    </button>
  );
}

export default SmallButton;
