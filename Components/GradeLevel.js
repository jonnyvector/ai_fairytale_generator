import Card from "./UI/Card";
import SmallButton from "./UI/SmallButton";

function GradeLevel(props) {
  const availableGrades = ["1", "2", "3", "4", "5", "6"];
  return (
    <Card title="Choose a Grade Level">
      <div>
        {availableGrades.map((grade) => (
          <SmallButton
            disabled={props.isLoading}
            isClicked={props.selectedGradeLevel === grade}
            onClick={() => {
              props.selectGradeLevel(grade);
            }}
          >
            {grade}
          </SmallButton>
        ))}
      </div>
    </Card>
  );
}

export default GradeLevel;
