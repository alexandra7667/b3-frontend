import { useContext } from "react"
import { ExercisesContext } from "../../App"
import PrivateExercisesItem from "./PrivateExercisesItem";


export default function PrivateExercisesList() {

    const exercisesContext = useContext(ExercisesContext);

    console.log(exercisesContext.privateExercises);

    return (
      <>
        <h2>Private Exercises</h2>
        <hr className="header_divider" />
        {exercisesContext.privateExercises.map((exercise, index) => (
          <PrivateExercisesItem exercise={exercise} key={index} />
        ))}
      </>
    );
}