import { useContext } from "react";
import { ProgramsContext } from "../../App"
import ProgramsItem from "./ProgramsItem";

export default function ProgramsList() {
    const progContext = useContext(ProgramsContext);

    return (
      <>
        <h3 className="programs_header">My Programs</h3>
        <hr className="header_divider"/>
        {progContext.programs.map((program, index) => (
          <ProgramsItem
            program={program}
            key={index}
          />
          
        ))}
      </>
    );
}