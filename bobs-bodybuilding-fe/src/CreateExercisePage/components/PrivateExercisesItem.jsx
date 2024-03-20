import PropTypes from "prop-types";

PrivateExercisesItem.propTypes = {
  exercise: PropTypes.object,
};

export default function PrivateExercisesItem(props) {
  const { exercise } = props;

  return (
    <li>
      <h2>{exercise.title}</h2>
      <p>{exercise.description}</p>
    </li>
  );
}
