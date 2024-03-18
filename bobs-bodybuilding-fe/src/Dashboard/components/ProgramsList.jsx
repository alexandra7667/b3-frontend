import { useContext } from "react";
import { ProgramsContext } from "../../App"
// import PropTypes from "prop-types";
import ProgramsItem from "./ProgramsItem";

// ProgramsList.propTypes = {
//   setClickedProgram: PropTypes.func,
// };

export default function ProgramsList() {
    const progContext = useContext(ProgramsContext);

    // const { setClickedProgram } = props;

    return (
      <div className="program_column">
        <h3>My Programs</h3>
        {progContext.programs.map((program, index) => (
          <ProgramsItem
            program={program}
            key={index}
            // setClickedProgram={setClickedProgram}
          />
        ))}
      </div>
    );
}