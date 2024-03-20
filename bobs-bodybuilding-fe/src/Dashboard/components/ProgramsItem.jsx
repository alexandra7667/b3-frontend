import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import { UserContext } from "../../App";
import { ProgramsContext } from "../../App";

ProgramsItem.propTypes = {
  program: PropTypes.object,
  setClickedProgram: PropTypes.func,
};

export default function ProgramsItem(props) {
  const { program } = props;
  const { userId, token } = useContext(UserContext);
  const { programs, setPrograms } = useContext(ProgramsContext);

  const navigate = useNavigate();

  const goToProgram = () => {
    navigate(`/program/${program.id}`);
  };

  const goToEditProgram = () => {
    navigate(`/edit_program/${program.id}`);
  };

  const removeProgram = () => {
    deleteOnDatabase();

    const programsCopy = [...programs];
    const programIndex = programsCopy.indexOf(program);
    if (programIndex !== -1) {
      programsCopy.splice(programIndex, 1);
      setPrograms(programsCopy);
    }
  };

  const deleteOnDatabase = async () => {
    const response = await fetch(
      `http://localhost:4000/users/${userId}/programs/${program.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to delete program");
    }
  };

  return (
    <div className="programs_layout">
      <h2>{program.title}</h2>
      <button onClick={goToProgram}>Show</button>
      <button onClick={goToEditProgram}>Edit</button>
      <button onClick={removeProgram}>Remove</button>
    </div>
  );
}
