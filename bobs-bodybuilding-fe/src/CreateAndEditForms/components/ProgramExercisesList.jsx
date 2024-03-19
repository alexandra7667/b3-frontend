import { useContext } from "react"
import { ExercisesContext } from "../../App"
import ProgramExercisesItem from "./ProgramExercisesItem";


export default function ProgramExercisesList() {

    const exercisesContext = useContext(ExercisesContext);

    console.log(exercisesContext.sharedExercises);

    return (
      <>
        <h3>Exercises</h3>
        {exercisesContext.sharedExercises.map((exercise, index) => (
            <ProgramExercisesItem
                exercise={exercise}
                key={index}
            />
        ))}
      </>
    );
}