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
    const exercisesCopy = [...program.programExercises];
    const programIndex = exercisesCopy.indexOf(exercise);

    deleteOnDatabase(exercise);

    if (programIndex !== -1) {
      exercisesCopy.splice(programIndex, 1);
      setProgram({ id: program.id, title: program.title, programExercises: [exercisesCopy] });
    }

    console.log("efter delete. program: " + program.title + " program id: " + program.id)

    //navigate(`/edit_program/${program.id}`);
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
      {program && (
        <div className="insertion_div ">
          <label className="create_program_label_text">Program name: </label>
          <br />

          <input
            className="title_input"
            type="text"
            id="title"
            name="title"
            value={program.title}
            onChange={handleEdit}
          />

          <hr className="update_program_breaker" />

          {program.programExercises.map((exercise, index) => (
            <div key={index}>
              <li>
                <h3>{exercise.title}</h3>
                <p>{exercise.description}</p>
                <label>Sets: </label>
                <br />
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
                <br />
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
                <button
                  className="remove_exercise_button"
                  onClick={() => removeExercise(exercise)}
                >
                  Remove Exercise
                </button>
                <hr className="exercises_in_update_breaker" />
              </li>
            </div>
          ))}

          <button
            className="update_program_button"
            type="submit"
            onClick={handlePost}
          >
            Update Program
          </button>
        </div>
      )}
    </form>
  );
}
