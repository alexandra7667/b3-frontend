import "./index.css";
import ProgramsList from "./components/ProgramsList";
import ShowProgram from "./components/ShowProgram";
import { createContext, useState } from "react";

const ClickedProgramContext = createContext();

export default function Dashboard() {

  const [ clickedProgram, setClickedProgram ] = useState(null)

    return (
      <main className="dashboard_layout">
        <ClickedProgramContext.Provider
          value={{ clickedProgram, setClickedProgram }}
        >
          <div className="dashboard_grid">
            <ProgramsList />
            <div className="exercise_column">
              {clickedProgram !== null && <ShowProgram />}
            </div>
          </div>
        </ClickedProgramContext.Provider>
      </main>
    );
}

export { ClickedProgramContext };