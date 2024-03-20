import { useContext } from "react";
import { EditProgramContext } from "..";
import { ProgramsContext } from "../../App";
import { useNavigate, useParams } from "react-router-dom";

export default function EditProgramForm() {
  const editContext = useContext(EditProgramContext);
  const programsContext = useContext(ProgramsContext);

  const navigate = useNavigate();

  const { id } = useParams();

  const handleEdit = (event) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;

    if (inputName === "title") {
      editContext.setProgram({
        ...editContext.program,
        title: inputValue,
      });
    }
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
    //   .then((postNew) => progContext.setPrograms((post) => [...post, postNew]));

    const updatedPrograms = programsContext.programs.map((program) =>
      Number(program.id) === Number(id)
        ? { ...program, ...editContext.program }
        : program
    );

    programsContext.setPrograms(updatedPrograms);

    navigate("/");
  };

  return (
    <form className="edit_program_layout">
      <h2>Edit a Program</h2>
      <div className="insertion_div ">
        <label>Program name: </label>
        <input
          className="title_input"
          type="text"
          id="title"
          name="title"
          value={editContext.program.title}
          onChange={handleEdit}
        />
        <p></p>
        {editContext.program.programexercises.map((exercise, index) => (
          <div key={index}>
            <li>
              <h3>{exercise.title}</h3>
              <p>Description: {exercise.description}</p>
              <label>Sets: </label>
              <input
                className="amount_input"
                type="text"
                id="sets"
                name="sets"
                placeholder={exercise.sets}
                value={editContext.program.programexercises.sets}
                onChange={(event) => changeSets(event, exercise)}
              />
              <p></p>
              <label>Reps: </label>
              <input
                className="amount_input"
                type="text"
                id="reps"
                name="reps"
                placeholder={exercise.reps}
                value={editContext.program.programexercises.reps}
                onChange={(event) => changeReps(event, exercise)}
              />
            </li>
            {/* <button onClick={updateExercise(exercise)}>Update</button> */}
          </div>
        ))}

        <button className="post_button" type="submit" onClick={handlePost}>
          <p className="button_text">Post</p>
        </button>
      </div>
    </form>
  );
}
