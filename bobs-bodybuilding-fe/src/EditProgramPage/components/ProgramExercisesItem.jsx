import PropTypes from "prop-types";
import { useContext } from "react";
import { EditProgramContext } from "..";

ProgramExercisesItem.propTypes = {
  exercise: PropTypes.object,
};

export default function ProgramExercisesItem(props) {
  const { exercise } = props;

  const editContext = useContext(EditProgramContext);

  const addExercise = () => {
    console.log("panda")
    exercise.sets = 0;
    exercise.reps = 0;
    editContext.setProgram({
      ...editContext.program,
      programexercises: [...editContext.program.programexercises, exercise],
    });
  };

  return (
    <li>
      <h2>{exercise.title}</h2>
      <p>{exercise.description}</p>
      <button className="add_button" onClick={addExercise}>
        Add to program
      </button>
    </li>
  );
}
