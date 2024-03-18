import "./index.css";
import ProgramsList from "./components/ProgramsList";
import ShowProgram from "./components/ShowProgram";
import { createContext, useContext, useEffect, useState } from "react";
import CreateProgramForm from "../CreateProgramForm";
import { ModeContext } from "../App";
import ProgramExercisesList from "../CreateProgramForm/components/ProgramExercisesList";

const ClickedProgramContext = createContext();
const NewProgramExercisesContect = createContext();

export default function Dashboard() {

  const [ clickedProgram, setClickedProgram ] = useState(null)
  const [ exercisesInNewProgram, setExercisesInNewProgram ] = useState([])

  useEffect(() => {console.log(exercisesInNewProgram);}, [exercisesInNewProgram]);

  const modeContext = useContext(ModeContext);

    return (
      <main className="dashboard_layout">
        <ClickedProgramContext.Provider
          value={{ clickedProgram, setClickedProgram }}
        >
          <NewProgramExercisesContect.Provider
            value={{ exercisesInNewProgram, setExercisesInNewProgram }}
          >
            {modeContext.modeDecider === "show programs" && (
              <div className="dashboard_grid">
                <div className="program_column">
                  <ProgramsList />
                </div>
                <div className="exercise_column">
                  {clickedProgram !== null && <ShowProgram />}
                </div>
              </div>
            )}
            {modeContext.modeDecider === "create program" && (
              <div className="dashboard_grid">
                <div className="program_column">
                  <CreateProgramForm />
                </div>
                <div className="exercise_column">
                  <ProgramExercisesList />
                </div>
              </div>
            )}
          </NewProgramExercisesContect.Provider>
        </ClickedProgramContext.Provider>
      </main>
    );
}

export { ClickedProgramContext, NewProgramExercisesContect };