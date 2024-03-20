import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

ProgramsItem.propTypes = {
  program: PropTypes.object,
  setClickedProgram: PropTypes.func,
};

export default function ProgramsItem(props) {
  const { program } = props;

  const navigate = useNavigate();

  const goToProgram = () => {
    navigate(`/program/${program.id}`);
  };

  const goToEditProgram = () => {
    navigate(`/edit_program/${program.id}`);
  }

  return (
    <div className="programs_layout">
      <h2>{program.title}</h2>
      <button onClick={goToProgram}>Show</button>
      <button onClick={goToEditProgram}>Edit</button>
    </div>
  );
}
