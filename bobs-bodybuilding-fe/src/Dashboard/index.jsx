import "./index.css";
import ProgramsList from "./components/ProgramsList";
import ShowProgram from "./components/ShowProgram";
import { createContext, useContext, useState } from "react";
// import { useEffect } from "react";
import CreateProgramForm from "../CreateAndEditForms/CreateProgram";
import { ModeContext } from "../App";
import ProgramExercisesList from "../CreateAndEditForms/components/ProgramExercisesList";
import EditProgramForm from "../CreateAndEditForms/EditProgram";

const ClickedProgramContext = createContext();
const NewProgramExercisesContect = createContext();
const EditProgramContext = createContext();

export default function Dashboard() {

  const [ clickedProgram, setClickedProgram ] = useState(null)
  const [ exercisesInNewProgram, setExercisesInNewProgram ] = useState([])
  const [ programToEdit, setProgramToEdit ] = useState(null)

  // useEffect(() => {console.log(exercisesInNewProgram);}, [exercisesInNewProgram]);

  const modeContext = useContext(ModeContext);

    return (
      <main className="dashboard_layout">
        <ClickedProgramContext.Provider
          value={{ clickedProgram, setClickedProgram }}
        >
          <NewProgramExercisesContect.Provider
            value={{ exercisesInNewProgram, setExercisesInNewProgram }}
          >
            <EditProgramContext.Provider
              value={{ programToEdit, setProgramToEdit }}
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
              {modeContext.modeDecider === "edit program" && (
                <div className="dashboard_grid">
                  <div className="program_column">
                    <EditProgramForm />
                  </div>
                  <div className="exercise_column">
                    <ProgramExercisesList />
                  </div>
                </div>
              )}
            </EditProgramContext.Provider>
          </NewProgramExercisesContect.Provider>
        </ClickedProgramContext.Provider>
      </main>
    );
}

export {
  ClickedProgramContext,
  NewProgramExercisesContect,
  EditProgramContext,
};