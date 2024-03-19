import PropTypes from "prop-types";
import { ClickedProgramContext } from "..";
import { ModeContext } from "../../App";
import { useContext } from "react";
import { EditProgramContext } from "..";

ProgramsItem.propTypes = {
  program: PropTypes.object,
  setClickedProgram: PropTypes.func,
};

export default function ProgramsItem(props) {
  const { program } = props;

  const clickContext = useContext(ClickedProgramContext);
  const modeContext = useContext(ModeContext);
  const editContext = useContext(EditProgramContext);

  const setProgramToShow = () => {
    clickContext.setClickedProgram(program)
  }

  const setModeToEdit = () => {
    modeContext.setModeDecider("edit program")
    editContext.setProgramToEdit(program);
  }

  return (
    <div className="programs_layout">
      <h2>{program.title}</h2>
      <button onClick={setProgramToShow}>Show</button>
      <button onClick={setModeToEdit}>Edit</button>
    </div>
  );
}
