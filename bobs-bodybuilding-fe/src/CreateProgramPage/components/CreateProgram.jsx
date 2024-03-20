import { useContext, useEffect, useState } from "react";
import { ExercisesToProgramContext } from "..";
import { ProgramsContext, UserContext } from "../../App";
import { useNavigate } from "react-router-dom";

const initState = {
  title: "",
  programexercises: [],
};

export default function CreateProgram() {

  const exerciseContext = useContext(ExercisesToProgramContext);
  const programsContext = useContext(ProgramsContext);
  const userContext = useContext(UserContext);

  const navigate = useNavigate();

  const [newProgram, setNewProgram] = useState(initState);

  useEffect(() => {
    setNewProgram({
      ...newProgram,
      programExercises: exerciseContext.programExercises,
    });
  }, [exerciseContext.programExercises]);

  const handleChange = (event) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;

    if (inputName === "title") {
      setNewProgram({ ...newProgram, title: inputValue });
    }
  };

  const changeSets = (event, exercise) => {
    const inputValue = event.target.value;
    exercise.sets = inputValue;
  };

  const changeReps = (event, exercise) => {
    const inputValue = event.target.value;
    exercise.reps = inputValue;
  };

  const handlePost = (event) => {
    event.preventDefault();

    // skicka till databas
    postToDatabase();

    programsContext.setPrograms([...programsContext.programs, newProgram]);

    setNewProgram(initState);

    navigate("/dashboard");
  };

  const postToDatabase = async () => {
    const programResponse = await fetch(`http://localhost:4000/users/${userContext.userId}/programs`, {
          method: "POST",
          headers: {
            'Authorization': `Bearer ${userContext.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newProgram),
        });

        if (!programResponse.ok) {
          throw new Error('Failed to post program');
        }

    //Program exercises kommer ej med
  }

  return (
    <form className="create_program_layout">
      <h2>Create a new Program</h2>
      <div className="insertion_div ">
        <label>Program name: </label>
        <input
          className="title_input"
          type="text"
          id="title"
          name="title"
          value={newProgram.title}
          onChange={handleChange}
        />
        <p></p>

        {exerciseContext.programExercises.length !== 0 &&
          exerciseContext.programExercises.map((exercise, index) => (
            <li key={index}>
              <h2>{exercise.title}</h2>
              <p>{exercise.description}</p>
              <label>Sets: </label>
              <input
                className="amount_input"
                type="text"
                id="sets"
                name="sets"
                value={newProgram.programExercises.sets}
                onChange={(event) => changeSets(event, exercise)}
              />
              <p></p>
              <label>Reps: </label>
              <input
                className="amount_input"
                type="text"
                id="reps"
                name="reps"
                value={newProgram.programExercises.reps}
                onChange={(event) => changeReps(event, exercise)}
              />
            </li>
          ))}

        <button className="post_button" type="submit" onClick={handlePost}>
          <p className="button_text">Post</p>
        </button>
      </div>
    </form>
  );
}
