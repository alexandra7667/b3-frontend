import { useContext } from "react";
import "./index.css";
import { ModeContext } from "../App";

export default function UserMenu() {
  const modeContext = useContext(ModeContext);

  const showPrograms = () => {
    modeContext.setModeDecider("show programs");
  };

  const showCreateNewProgram = () => {
    modeContext.setModeDecider("create program");
  }

    return (
      <div className="menu_grid">
        <div className="left_column">
          <button className="menu_button" onClick={showPrograms}>
            My Programs
          </button>
        </div>
        <div className="middle_column">
          <button className="menu_button" onClick={showCreateNewProgram}>
            Create new Program
          </button>
        </div>
        <div className="right_column">
          <button className="menu_button">Create new Exercise</button>
        </div>
      </div>
    );
}