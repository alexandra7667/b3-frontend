import "./index.css";
import CreatePrivateExercise from "./components/CreatePrivateExercise";
import PrivateExercisesList from "./components/PrivateExercisesList";

export default function CreateExercisePage() {

    return (
      <div className="create_exercise_grid">
        <div className="create_exercise_column">
          <CreatePrivateExercise />
        </div>
        <div className="show_exercises_column">
          <PrivateExercisesList />
        </div>
      </div>
    );
}