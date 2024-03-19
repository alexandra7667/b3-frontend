import { createContext, useState } from "react";
import CreateProgram from "./components/CreateProgram";
import ProgramExercisesList from "./components/ProgramExercisesList";
import "./index.css";

const ExercisesToProgramContext = createContext();

export default function CreateProgramPage() {

  const [ programExercises, setProgramExercises ] = useState([]);

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