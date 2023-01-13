import React, { useContext } from "react";
import Card from "./UI/Card";
import SmallButton from "./UI/SmallButton";

function SelectMood(props) {
  // Render the mood selection form

  const moods = [
    { mood: "funny", label: "Funny" },
    { mood: "scary", label: "Scary" },
    { mood: "thrilling", label: "Thrilling" },
    { mood: "dramatic", label: "Dramatic" },
  ];
  // console.log(props.selectedMood);

  return (
    <Card title={"Now Set the Mood!"}>
      <div>
        {moods.map((mood) => (
          <SmallButton
            disabled={props.isLoading}
            key={mood.mood}
            isClicked={props.selectedMood === mood.mood}
            type="button"
            onClick={() => props.selectMood(mood.mood)}
          >
            {mood.label}
          </SmallButton>
        ))}
      </div>
    </Card>
  );
}

export default SelectMood;
