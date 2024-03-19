import PropTypes from "prop-types";

UpdateProgramExercise.propTypes = {
  exercise: PropTypes.object,
};

export default function UpdateProgramExercise(props) {
  const { exercise } = props;

  const handleUpdate = (event) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;

    if (inputName === "title") {
      exercise.title = inputValue;
    }
  };

  return (
    <div>
      <label>Title</label>
      <input
        className="title_input"
        type="text"
        id="title"
        name="title"
        value={exercise.title}
        onChange={handleUpdate}
      />
    </div>
  );
}
