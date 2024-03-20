import { createContext, useContext, useEffect, useState } from "react";
import ProgramExercisesList from "./components/ProgramExercisesList";
// import EditProgramForm from "./components/EditProgram";
import { ProgramsContext } from "../App";
import "./index.css";
import { useParams } from "react-router-dom";

const EditProgramContext = createContext();

export default function EditProgramPage() {
  const programsContext = useContext(ProgramsContext);

  const { id } = useParams();

  const [programExercises, setProgramExercises] = useState([]);
  const [program, setProgram] = useState(null);

  useEffect(() => {
    setProgram(
      programsContext.programs.find(
        (program) => Number(program.id) === Number(id)
      )
    );
  }, [programsContext.programs, id]);

  return (
    <EditProgramContext.Provider
      value={{ programExercises, setProgramExercises, program }}
    >
      <div className="edit_grid">
        <div className="edit_column">
          {/* <EditProgramForm /> */}
        </div>
        <div className="edit_exercises_column">
          <ProgramExercisesList />
        </div>
      </div>
    </EditProgramContext.Provider>
  );
}

export { EditProgramContext };