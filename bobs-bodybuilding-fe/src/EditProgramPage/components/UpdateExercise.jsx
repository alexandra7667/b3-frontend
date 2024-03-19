import PropTypes from "prop-types";
import { UpdateExerciseContext } from "../../Dashboard";
import { useContext } from "react";

UpdateProgramExercise.propTypes = {
  exercise: PropTypes.object,
};

export default function UpdateProgramExercise() {

  const updateContext = useContext(UpdateExerciseContext);

  const handleUpdate = (event) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;

    if (inputName === "title") {
      updateContext.exercise.title = inputValue;
    }
  };

  if (!updateContext.exerciseToUpdate) return <div></div>
  
    return (
      <div>
        <label>Title</label>
        <input
          className="title_input"
          type="text"
          id="title"
          name="title"
          value={updateContext.exercise.title}
          onChange={handleUpdate}
        />
      </div>
    );
}
