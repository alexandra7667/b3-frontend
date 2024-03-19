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
      <>
        <h3 className="programs_header">My Programs</h3>
        <hr className="header_divider"/>
        {progContext.programs.map((program, index) => (
          <ProgramsItem
            program={program}
            key={index}
            // setClickedProgram={setClickedProgram}
          />
          
        ))}
      </>
    );
}