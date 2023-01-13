import React, { useContext } from "react";
import SmallButton from "../Components/UI/SmallButton";
import { ThemeContext } from "./index";

function SelectGenre(props) {
  const theme = useContext(ThemeContext);

  // Array of available genres
  const genres = [
    { genre: "science fiction", label: "Science Fiction" },
    { genre: "adventure", label: "Adventure" },
    { genre: "fantasy", label: "Fantasy" },
  ];

  return (
    <div>
      <h4>Choose a Genre! (choose 1)</h4>
      <div>
        {genres.map((genre) => (
          <SmallButton
            disabled={props.isLoading}
            type="button"
            onClick={() => props.selectGenre(genre.genre)}
            // Add the "selected" class to the button if the genre is selected
          >
            {genre.label}
          </SmallButton>
        ))}
      </div>
    </div>
  );
}

export default SelectGenre;
