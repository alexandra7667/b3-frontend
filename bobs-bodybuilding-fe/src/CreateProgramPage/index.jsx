import { createContext, useState, useEffect, useContext } from "react";
import CreateProgram from "./components/CreateProgram";
import ProgramExercisesList from "./components/ProgramExercisesList";
import "./index.css";
import { UserContext, ExercisesContext } from "../App";

const ExercisesToProgramContext = createContext();

export default function CreateProgramPage() {
  const { token, userId } = useContext(UserContext);
  const { setPrivateExercises, setSharedExercises } = useContext(ExercisesContext);

  const [ programExercises, setProgramExercises ] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Third fetch to retrieve shared exercises
        const sharedExercisesResponse = await fetch("http://localhost:4000/sharedexercises", {
          method: "GET",
          headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!sharedExercisesResponse.ok) {
          throw new Error('Failed to fetch shared exercises');
        }

        const sharedExercisesData = await sharedExercisesResponse.json();
        setSharedExercises(sharedExercisesData.data);

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
      <ExercisesToProgramContext.Provider
        value={{ programExercises, setProgramExercises }}
      >
        <div className="create_grid">
          <div className="create_column">
            <CreateProgram />
          </div>
          <div className="exercise_column">
            <ProgramExercisesList />
          </div>
        </div>
      </ExercisesToProgramContext.Provider>
    );
}

export { ExercisesToProgramContext };