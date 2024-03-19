import PropTypes from "prop-types";
import { useContext } from "react";
import { NewProgramExercisesContect } from "../../Dashboard";

ProgramExercisesItem.propTypes = {
  exercise: PropTypes.object,
};

export default function ProgramExercisesItem(props) {
  const { exercise } = props;

  const addExerciseContext = useContext(NewProgramExercisesContect);

  const addExercise = () => {
    exercise.sets = 0;
    exercise.reps = 0;
    addExerciseContext.setExercisesInNewProgram([
      ...addExerciseContext.exercisesInNewProgram,
      exercise,
    ]);
  }

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
