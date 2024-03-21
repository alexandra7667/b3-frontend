import { useContext } from "react";
import { EditProgramContext } from "..";
import { ProgramsContext, UserContext } from "../../App";
import { useNavigate, useParams } from "react-router-dom";

export default function EditProgramForm() {
  const { program, setProgram } = useContext(EditProgramContext);
  const { programs, setPrograms } = useContext(ProgramsContext);
  const { userId, token } = useContext(UserContext);

  const navigate = useNavigate();

  const { id } = useParams();

  /** Handles changes to title of program */
  const handleEdit = (event) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;

    if (inputName === "title") {
      setProgram({
        ...program,
        title: inputValue,
      });
    }
  };

  /** Handles changes to the number of sets for a certain exercise */
  const changeSets = (event, exercise) => {
    const inputValue = event.target.value;
    exercise.sets = inputValue;
  };

  /** Handles changes to the number of reps for a certain exercise */
  const changeReps = (event, exercise) => {
    const inputValue = event.target.value;
    exercise.reps = inputValue;
  };

  /** Handles what happpens when pressing the button post (when finished editing the program) */
  const handlePost = (event) => {
    event.preventDefault();

    const updatedPrograms = programs.map((program) =>
      Number(program.id) === Number(id) ? { ...program, ...program } : program
    );

    //Skicka uppdatering till databas PUT
    postToDatabase();

    setPrograms(updatedPrograms);

    navigate("/dashboard");
  };

  /** Sends the changed program to the database */
  const postToDatabase = async () => {
    const programResponse = await fetch(
      `http://localhost:4000/users/${userId}/programs/${program.id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(program),
      }
    );

    if (!programResponse.ok) {
      throw new Error("Failed to update program");
    }
  };

  const removeExercise = (exercise) => {

    deleteOnDatabase(exercise);

    const exercisesCopy = [...program.programExercises];
    const programIndex = exercisesCopy.indexOf(exercise);
    if (programIndex !== -1) {
      exercisesCopy.splice(programIndex, 1);
      setProgram({ ...program, programExercises: [exercisesCopy] });
    }
  };

  const deleteOnDatabase = async (exercise) => {
    const response = await fetch(
      `http://localhost:4000/users/${userId}/programs/${program.id}/programexercises/${exercise.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to delete exercise");
    }
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
          value={program.title}
          onChange={handleEdit}
        />
        <p></p>
        {program.programExercises.map((exercise, index) => (
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
                value={program.programExercises.sets}
                onChange={(event) => changeSets(event, exercise)}
              />
              <br />
              <label>Reps: </label>
              <input
                className="amount_input"
                type="text"
                id="reps"
                name="reps"
                placeholder={exercise.reps}
                value={program.programExercises.reps}
                onChange={(event) => changeReps(event, exercise)}
              />
              <br />
              <button onClick={() => removeExercise(exercise)}>
                Remove Exercise
              </button>
            </li>
          </div>
        ))}

        <hr className="edit_program_divider" />

        <button className="post_button" type="submit" onClick={handlePost}>
          <p className="button_text">Post</p>
        </button>
      </div>
    </form>
  );
}
