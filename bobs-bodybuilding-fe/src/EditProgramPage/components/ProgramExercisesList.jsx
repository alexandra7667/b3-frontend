import { useContext } from "react"
import { ExercisesContext } from "../../App"
import ProgramExercisesItem from "./ProgramExercisesItem";


export default function ProgramExercisesList() {

    const exercisesContext = useContext(ExercisesContext);

    console.log("hej");

    return (
      <>
        <h2>Shared Exercises</h2>
        {exercisesContext.sharedExercises.map((exercise, index) => (
          <ProgramExercisesItem exercise={exercise} key={index} />
        ))}

        <hr className="exercises_divider" />
        
        <h2>Private Exercises</h2>
        {exercisesContext.privateExercises.map((exercise, index) => (
          <ProgramExercisesItem exercise={exercise} key={index} />
        ))}
      </>
    );
}