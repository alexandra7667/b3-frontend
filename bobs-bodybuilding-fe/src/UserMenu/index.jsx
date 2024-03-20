import "./index.css";
import { useNavigate } from "react-router-dom";

export default function UserMenu() {

  const navigate = useNavigate();

  const showPrograms = () => {
    navigate("/dashboard");
  };

  const showCreateProgram = () => {
    navigate("/create_program");
  };

  const showCreateExercise = () => {
    navigate("/create_exercise");
  };


    return (
      <div className="menu_grid">
        <div className="left_column">
          <button className="menu_button" onClick={showPrograms}>
            My Programs
          </button>
        </div>
        <div className="middle_column">
          <button className="menu_button" onClick={showCreateProgram}>
            Create new Program
          </button>
        </div>
        <div className="right_column">
          <button className="menu_button" onClick={showCreateExercise}>
            Private Exercises
          </button>
        </div>
      </div>
    );
}