import PropTypes from "prop-types";
import { ClickedProgramContext } from "..";
import { useContext } from "react";

ProgramsItem.propTypes = {
  program: PropTypes.object,
  setClickedProgram: PropTypes.func,
};

export default function ProgramsItem(props) {
  const { program } = props;

  const clickContext = useContext(ClickedProgramContext);

  const setProgramToShow = () => {
    clickContext.setClickedProgram(program)
  }

  return (
    <div className="programs_layout">
      <h2>{program.title}</h2>
      <button onClick={setProgramToShow}>Show</button>
    </div>
  );
}
