import { createContext, useContext, useEffect, useState } from "react";
import ProgramExercisesList from "./components/ProgramExercisesList";
import EditProgram from "./components/EditProgram";
import { ProgramsContext } from "../App";
import "./index.css";
import { useParams } from "react-router-dom";

const EditProgramContext = createContext();

export default function EditProgramPage() {
  const programsContext = useContext(ProgramsContext);

  const { id } = useParams();

  const [newExercise, setNewExercise] = useState([]);
  const [program, setProgram] = useState(null);

  useEffect(() => {
    setProgram(
      programsContext.programs.find(
        (program) => Number(program.id) === Number(id)
      )
    );
  }, [programsContext.programs, id]);

  if (program === null) {
    return <div></div>
  }

  return (
    <EditProgramContext.Provider
      value={{ newExercise, setNewExercise, program, setProgram }}
    >
      <div className="edit_grid">
        <div className="edit_column">
          <EditProgram />
        </div>
        <div className="edit_exercises_column">
          <ProgramExercisesList />
        </div>
      </div>
    </EditProgramContext.Provider>
  );
}

export { EditProgramContext };
