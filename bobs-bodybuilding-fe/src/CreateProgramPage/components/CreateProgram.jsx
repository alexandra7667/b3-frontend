import { useContext, useEffect, useState } from "react";
import { ExercisesToProgramContext } from "..";
import { ProgramsContext } from "../../App";
import { useNavigate } from "react-router-dom";

export default function CreateProgram() {
  const initState = {
    title: "",
    programexercises: [""],
  };

  const navigate = useNavigate();

  const [newProgram, setNewProgram] = useState(initState);

  const exerciseContext = useContext(ExercisesToProgramContext);
  const programsContext = useContext(ProgramsContext);

  useEffect(() => {
    setNewProgram({
      ...newProgram,
      programexercises: exerciseContext.programExercises,
    });
  }, [newProgram, exerciseContext.programExercises]);

  const handleChange = (event) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;

    if (inputName === "title") {
      setNewProgram({ ...newProgram, title: inputValue });
    }
    console.log("Check to see if newProgram changes: ", newProgram);
  };

  const changeSets = (event, exercise) => {
    const inputValue = event.target.value;
    console.log(
      "In change sets. Input value: ",
      inputValue,
      " and the exercise: ",
      exercise
    );

    exercise.sets = inputValue;
  };

  const changeReps = (event, exercise) => {
    const inputValue = event.target.value;
    console.log(
      "In change REPS. Input value: ",
      inputValue,
      " and the exercise: ",
      exercise
    );

    exercise.reps = inputValue;
  };

  

  const handlePost = (event) => {
    event.preventDefault();

    // fetch("https://boolean-api-server.fly.dev/svennas/post", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(newProgram),
    // })
    //   .then((resp) => resp.json())
    //   .then((programNew) =>
    //     programsContext.setPrograms((program) => [...program, programNew])
    //   );

    programsContext.setPrograms([...programsContext.programs, newProgram]);

    setNewProgram(initState);
    // setNewProgram({ ...newProgram, programexercises: [""] });
    navigate("/");
  };

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
                value={newProgram.programexercises.sets}
                onChange={(event) => changeSets(event, exercise)}
              />
              <p></p>
              <label>Reps: </label>
              <input
                className="amount_input"
                type="text"
                id="reps"
                name="reps"
                value={newProgram.programexercises.reps}
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
