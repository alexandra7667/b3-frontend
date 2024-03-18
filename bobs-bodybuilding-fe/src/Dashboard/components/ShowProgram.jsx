import { ClickedProgramContext } from "..";
import PropTypes from "prop-types";
import { useContext } from "react";

ShowProgram.propTypes = {
  clickedProgram: PropTypes.object,
};

export default function ShowProgram() {

    const clickContext = useContext(ClickedProgramContext);

    if (!clickContext.clickedProgram) return <div></div>;

    return (
      <div>
        <h2>{clickContext.clickedProgram.title}</h2>

        {clickContext.clickedProgram.exercises.map((exercise, index) => (
          <li key={index}>
            <h3>{exercise.title}</h3>
            <p>Description: {exercise.description}</p>
            <p>Sets: {exercise.sets} Reps: {exercise.reps}</p>
          </li>
        ))}
      </div>
    );
}