import React, { useState, useContext, useEffect } from "react";
import { ThemeContext } from "../pages/index";
import classes from "./AddCharacter.module.css";
import Card from "./UI/Card";
import SmallButton from "./UI/SmallButton";
import Button from "./UI/Button";
import SubmitButton from "./UI/SubmitButton";
import DeleteButton from "./UI/DeleteButton";

function AddCharacter(props) {
  // Create state variables for the list of characters and available attribute tags
  const [characters, setCharacters] = useState([
    { name: "", form: "", tags: [] },
  ]);
  const [availableTags, setAvailableTags] = useState([
    "Smart",
    "Strong",
    "Beautiful",
    "Brave",
    "Funny",
    "Evil",
    "Wicked",
    "Helpful",
    "Honest",
    "Loyal",
  ]);
  const [availableForms, setAvailableForms] = useState([
    "Human",
    "Knight",
    "Princess",
    "Superhero",
    "Robot",
    "Alien",
    "Monster",
    "Dinosaur",
    "Tiger",
  ]);
  const [role, setRole] = useState("");

  const theme = useContext(ThemeContext);
  const [newTheme, setNewTheme] = useState(null);

  useEffect(() => {
    setNewTheme(theme);
  }, [theme]);

  // Function to handle when an attribute tag is selected or unselected for a character
  function toggleTag(characterIndex, tag) {
    // Check if the tag is already selected
    const character = characters[characterIndex];
    const tagIndex = character.tags.indexOf(tag);
    if (tagIndex > -1) {
      // If the tag is already selected, remove it from the list
      const newTags = [...character.tags];
      newTags.splice(tagIndex, 1);
      setCharacters([
        ...characters.slice(0, characterIndex),
        { ...character, tags: newTags },
        ...characters.slice(characterIndex + 1),
      ]);
    } else {
      // If the tag is not already selected, add it to the list
      setCharacters([
        ...characters.slice(0, characterIndex),
        { ...character, tags: [...character.tags, tag] },
        ...characters.slice(characterIndex + 1),
      ]);
    }
  }

  // Function to handle when the name of a character is changed
  function handleNameChange(characterIndex, name) {
    setCharacters([
      ...characters.slice(0, characterIndex),
      { ...characters[characterIndex], name },
      ...characters.slice(characterIndex + 1),
    ]);
  }

  // Render the character form
  return (
    <Card>
      {props.characters.map((character, characterIndex) => (
        <div className={classes.character} key={characterIndex}>
          <label className={classes.heading}>
            Character {characterIndex + 1} Name
          </label>
          <div className={classes["input-remove"]}>
            <input
              placeholder="Enter a name"
              disabled={props.isLoading}
              className={classes.input}
              value={character.name}
              onChange={(e) => props.nameChange(characterIndex, e.target.value)}
            />
            {props.characters.length > 1 && (
              <button
                disabled={props.isLoading}
                className={classes["delete-button"]}
                type="button"
                onClick={() => props.removeCharacter(characterIndex)}
              >
                <DeleteButton
                  strokeLineWidth={2}
                  color={`${
                    newTheme === "science fiction"
                      ? "#5932e6"
                      : newTheme === "fantasy"
                      ? "#3f3454"
                      : newTheme === "adventure"
                      ? "#d38900"
                      : ""
                  }`}
                />
              </button>
            )}
          </div>
          <p className={classes["small-heading"]}>
            Select some character traits
          </p>
          <div className={classes["tags-container"]}>
            <span>
              {availableTags.map((tag) => (
                <SmallButton
                  disabled={props.isLoading}
                  type="button"
                  key={tag}
                  onClick={() => props.toggleTag(characterIndex, tag)}
                  isClicked={character.tags.includes(tag)}
                >
                  {tag}
                </SmallButton>
              ))}
            </span>
          </div>
          <div className={classes.form}>
            <p className={classes["small-heading"]}>Select a form</p>
            <div className={classes["tags-container"]}>
              {availableForms.map((form) => (
                <SmallButton
                  disabled={props.isLoading}
                  type="button"
                  key={form}
                  isClicked={character.form === form}
                  onClick={() => props.selectForm(characterIndex, form)}
                >
                  {form}
                </SmallButton>
              ))}
            </div>
          </div>
        </div>
      ))}
      <div className={classes["button-container"]}>
        <Button
          disabled={props.isLoading}
          type="button"
          // className={classes["add-character"]}
          onClick={props.addCharacter}
        >
          Add Character
        </Button>
        <SubmitButton disabled={props.isLoading}>Write My Story</SubmitButton>
      </div>
    </Card>
  );
}

export default AddCharacter;
