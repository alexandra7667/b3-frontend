import PropTypes from "prop-types";
import { ExercisesContext } from "../../App";
import { UserContext } from "../../App";
import { useContext } from "react";

PrivateExercisesItem.propTypes = {
  exercise: PropTypes.object,
};

export default function PrivateExercisesItem(props) {
  const { exercise } = props;
  const { privateExercises, setPrivateExercises } = useContext(ExercisesContext);
  const { userId, token } = useContext(UserContext);

  const removeExercise = () => {
    deleteOnDatabase();

    const exercisesCopy = [...privateExercises];
    const programIndex = exercisesCopy.indexOf(exercise);
    if (programIndex !== -1) {
      exercisesCopy.splice(programIndex, 1);
      setPrivateExercises(exercisesCopy);
    }
  };

  const deleteOnDatabase = async () => {
    const response = await fetch(
      `http://localhost:4000/users/${userId}/privateexercises/${exercise.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to delete exercise");
    }
  };

  return (
    <li>
      <h2>{exercise.title}</h2>
      <p>{exercise.description}</p>
      <button onClick={() => removeExercise}>Delete</button>
    </li>
  );
}
