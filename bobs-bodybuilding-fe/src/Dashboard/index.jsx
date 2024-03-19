import "./index.css";
import ProgramsList from "./components/ProgramsList";
import { createContext} from "react";

const ClickedProgramContext = createContext();
const NewProgramExercisesContect = createContext();
const EditProgramContext = createContext();
const UpdateExerciseContext = createContext();

export default function Dashboard() {

    return (
      <div className="programs_container">
        <ProgramsList />
      </div>
    );
}

export {
  ClickedProgramContext,
  NewProgramExercisesContect,
  EditProgramContext,
  UpdateExerciseContext,
};