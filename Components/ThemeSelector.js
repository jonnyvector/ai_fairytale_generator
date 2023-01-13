import SmallButton from "./UI/SmallButton";

function ThemeSelector(props) {
  // Render the theme selector form
  return (
    <div>
      <div>
        <SmallButton
          disabled={props.isLoading}
          type="button"
          name="theme"
          id="adventure"
          checked={props.theme === "adventure"}
          value="adventure"
          isClicked={props.theme === "adventure"}
          onClick={() => props.setTheme("adventure")}
        >
          Adventure
        </SmallButton>
        <SmallButton
          disabled={props.isLoading}
          type="button"
          name="theme"
          id="fantasy"
          checked={props.theme === "fantasy"}
          value="fantasy"
          isClicked={props.theme === "fantasy"}
          onClick={() => props.setTheme("fantasy")}
        >
          Fantasy
        </SmallButton>
        <SmallButton
          disabled={props.isLoading}
          type="button"
          name="theme"
          id="science-fiction"
          checked={props.theme === "science fiction"}
          value="science fiction"
          isClicked={props.theme === "science fiction"}
          onClick={() => props.setTheme("science fiction")}
        >
          Science Fiction
        </SmallButton>
      </div>
    </div>
  );
}

export default ThemeSelector;
