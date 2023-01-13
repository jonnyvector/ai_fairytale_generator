import { createContext, useContext, useState, CSSProperties } from "react";
import Head from "next/head";
import { ClipLoader } from "react-spinners";
import useLocalStorage from "../Components/Hooks/useLocalStorage";
import AddCharacter from "../Components/AddCharacter";
import ThemeSelector from "../Components/ThemeSelector";
import GradeLevel from "../Components/GradeLevel";
import Card from "../Components/UI/Card";
import Wrapper from "../Components/UI/Wrapper";
import LoadingCard from "../Components/UI/LoadingCard";
import ContentWrapper from "../Components/UI/ContentWrapper";
import SelectMood from "../Components/SelectMood";
import Button from "../Components/UI/Button";
import classes from "./index.module.css";

export const ThemeContext = createContext("science fiction");

export default function Home() {
  const [result, setResult] = useState("");
  // Create state variables for the list of characters and available attribute tags
  const [characters, setCharacters] = useState([
    { name: "", form: "", tags: [], role: "" },
  ]);
  const [theme, setTheme] = useLocalStorage("theme", "adventure");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMood, setSelectedMood] = useState("");
  const [gradeLevel, setGradeLevel] = useState("1");

  // Function to handle when the name of a character is changed
  function handleNameChange(characterIndex, name) {
    setCharacters([
      ...characters.slice(0, characterIndex),
      { ...characters[characterIndex], name },
      ...characters.slice(characterIndex + 1),
    ]);
  }

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

  // Function to handle when a form is selected for a character
  function selectForm(characterIndex, form) {
    setCharacters([
      ...characters.slice(0, characterIndex),
      { ...characters[characterIndex], form },
      ...characters.slice(characterIndex + 1),
    ]);
  }

  // Function to handle when the "Add Character" button is clicked
  function handleAddCharacterClick() {
    setCharacters([...characters, { name: "", form: "", tags: [], role: "" }]);
  }

  // Function to handle when the "Remove Character" button is clicked
  function handleRemoveCharacterClick(characterIndex) {
    setCharacters([
      ...characters.slice(0, characterIndex),
      ...characters.slice(characterIndex + 1),
    ]);
  }

  function handleMoodSelect(mood) {
    setSelectedMood(mood);
  }

  function handleGradeLevelSelect(level) {
    setGradeLevel(level);
  }

  async function onSubmit(event) {
    setIsLoading(true);
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          characters: characters,
          mood: selectedMood,
          genre: theme,
          gradeLevel: gradeLevel,
        }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }
      setIsLoading(false);
      // console.log(data);
      setResult(data.result);
    } catch (error) {
      setIsLoading(false);
      alert(error.message);
    }
    setCharacters([{ name: "", form: "", tags: [] }]);
    setSelectedMood("");
  }

  const splitResult = result.split("*");

  const splitParagraph = () => {
    if (splitResult[1]) {
      return splitResult[1].split("/");
    }
  };

  const paragraphArray = splitParagraph();
  console.log(paragraphArray);

  const themeUppercase = theme.charAt(0).toUpperCase() + theme.slice(1);

  return (
    <>
      <ThemeContext.Provider value={theme}>
        <Head>
          <title>Fairy Tale Creator</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
          <link
            href="https://fonts.googleapis.com/css2?family=Bubblegum+Sans&display=swap"
            rel="stylesheet"
          />
        </Head>
        <Wrapper>
          <ContentWrapper>
            {!result && isLoading && (
              <div className={classes["loading-background"]}>
                {/* <div className={classes["story-wrapper"]}> */}
                <LoadingCard />
                <ClipLoader color={"white"} loading={isLoading} />
                {/* <Card title={"Your story is being written now!"}>
                  <ClipLoader color={"white"} loading={isLoading} />
                  <p>Your Story is Being Written Right Now!</p>
                </Card> */}
              </div>
              // </div>
            )}
            {!result && !isLoading && (
              <div>
                <form onSubmit={onSubmit}>
                  <h1>Fairy Tale Creator</h1>
                  <Card title="Choose the genre!">
                    <ThemeSelector
                      isLoading={isLoading}
                      selected={theme}
                      theme={theme}
                      setTheme={setTheme}
                    />
                  </Card>
                  <GradeLevel
                    isLoading={isLoading}
                    selectedGradeLevel={gradeLevel}
                    selectGradeLevel={handleGradeLevelSelect}
                  />
                  <SelectMood
                    isLoading={isLoading}
                    selectedMood={selectedMood}
                    selectMood={handleMoodSelect}
                  />
                  <AddCharacter
                    isLoading={isLoading}
                    removeCharacter={handleRemoveCharacterClick}
                    addCharacter={handleAddCharacterClick}
                    characters={characters}
                    toggleTag={toggleTag}
                    nameChange={handleNameChange}
                    selectForm={selectForm}
                    onSubmit={onSubmit}
                  ></AddCharacter>
                </form>
              </div>
            )}
            {result && (
              <div className={classes["story-background"]}>
                <Card title={splitResult[0]}>
                  {paragraphArray.map((paragraph) => (
                    <p className={classes.paragraph}>{paragraph}</p>
                  ))}
                </Card>
                <Button
                  onClick={() => {
                    setResult("");
                  }}
                >
                  Create Another Story
                </Button>
              </div>
            )}
          </ContentWrapper>
        </Wrapper>
      </ThemeContext.Provider>
    </>
  );
}