import "./index.css";
import { useEffect, useContext } from "react";
import CreatePrivateExercise from "./components/CreatePrivateExercise";
import PrivateExercisesList from "./components/PrivateExercisesList";
import { UserContext, ExercisesContext } from "../App";

export default function CreateExercisePage() {
  const { token, userId } = useContext(UserContext);
  const { setPrivateExercises } = useContext(ExercisesContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fourth fetch to get private exercises
        const privateExercisesResponse = await fetch(`http://localhost:4000/users/${userId}/privateexercises`, {
          method: "GET",
          headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!privateExercisesResponse.ok) {
          throw new Error('Failed to fetch private exercises');
        }

        const privateExercisesData = await privateExercisesResponse.json();
        setPrivateExercises(privateExercisesData.data);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

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