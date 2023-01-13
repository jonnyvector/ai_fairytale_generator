import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../pages";
import classes from "./Wrapper.module.css";
function Wrapper(props) {
  const theme = useContext(ThemeContext);
  const [newTheme, setNewTheme] = useState(null);

  useEffect(() => {
    setNewTheme(theme);
  }, [theme]);

  return (
    <div
      className={`${
        newTheme === "science fiction"
          ? [classes.wrapper, classes.scifi].join(" ")
          : newTheme === "adventure"
          ? [classes.wrapper, classes.adventure].join(" ")
          : newTheme === "fantasy"
          ? [classes.wrapper, classes.fantasy].join(" ")
          : classes.wrapper
      }`}
    >
      {props.children}
    </div>
  );
}

export default Wrapper;
