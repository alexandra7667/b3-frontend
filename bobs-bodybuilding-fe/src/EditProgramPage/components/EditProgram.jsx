import { useContext } from "react";
import { EditProgramContext } from "..";
import { ProgramsContext, UserContext } from "../../App";
import { useNavigate, useParams } from "react-router-dom";

export default function EditProgramForm() {
  const editContext = useContext(EditProgramContext);
  const programsContext = useContext(ProgramsContext);
  const userContext = useContext(UserContext);

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
    exercise.sets = inputValue;
  };

  const changeReps = (event, exercise) => {
    const inputValue = event.target.value;
    exercise.reps = inputValue;
  };

  const handlePost = (event) => {
    event.preventDefault();

    const updatedPrograms = programsContext.programs.map((program) =>
      Number(program.id) === Number(id)
        ? { ...program, ...editContext.program }
        : program
    );

    //Skicka uppdatering till databas PUT
    postToDatabase();

    programsContext.setPrograms(updatedPrograms);

    navigate("/dashboard");
  };

  const postToDatabase = async () => {
    const programResponse = await fetch(`http://localhost:4000/users/${userContext.userId}/programs/${editContext.program.id}`, {
      method: "PUT",
      headers: {
        'Authorization': `Bearer ${userContext.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editContext.program),
    });

    if (!programResponse.ok) {
      throw new Error('Failed to update program');
    }
  }

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
        {editContext.program.programExercises.map((exercise, index) => (
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
                value={editContext.program.programExercises.sets}
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
                value={editContext.program.programExercises.reps}
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
