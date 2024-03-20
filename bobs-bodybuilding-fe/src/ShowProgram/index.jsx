import { useParams } from "react-router-dom";
import { ProgramsContext } from "../App";
import { useContext, useEffect, useState } from "react";
import "./index.css";

export default function ShowProgram() {
  const programsContext = useContext(ProgramsContext);

  const { id } = useParams();

  const [program, setProgram] = useState(null);

  useEffect(() => {
    setProgram(
      programsContext.programs.find(
        (program) => Number(program.id) === Number(id)
      )
    );

  }, [programsContext.programs, id]);

  if (!program) return <div></div>;

  return (
    <div className="specific_program_container">
      <h2>{program.title}</h2>

      {program.programExercises.map((exercise, index) => (
        <li key={index}>
          <h3>{exercise.title}</h3>
          <p>Description: {exercise.description}</p>
          <p>
            Sets: {exercise.sets} Reps: {exercise.reps}
          </p>
        </li>
      ))}
    </div>
  );
}
