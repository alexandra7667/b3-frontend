import PropTypes from "prop-types";
import { useContext } from "react";
import { EditProgramContext } from "..";

ProgramExercisesItem.propTypes = {
  exercise: PropTypes.object,
};

export default function ProgramExercisesItem(props) {
  const { exercise } = props;

  const exerciseContext = useContext(EditProgramContext);

  const addExercise = () => {
    exercise.sets = 0;
    exercise.reps = 0;
    exerciseContext.setProgramExercises([
      ...exerciseContext.programExercises,
      exercise,
    ]);
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
