import { useContext } from "react";
import { EditProgramContext } from "../../Dashboard";
import { UpdateExerciseContext } from "../../Dashboard";

export default function EditProgramForm() {
  const editContext = useContext(EditProgramContext);
  const updateContext = useContext(UpdateExerciseContext);

  const handleEdit = (event) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;

    if (inputName === "title") {
      editContext.setProgramToEdit({
        ...editContext.programToEdit,
        title: inputValue,
      });
    }
  };

  const updateExercise = (exercise) => {
    console.log(exercise);
    updateContext.setExerciseToUpdate(exercise);
  }

  const handlePost = (event) => {
    event.preventDefault();

    // fetch("https://boolean-api-server.fly.dev/svennas/post", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(newProgram),
    // })
    //   .then((resp) => resp.json())
    //   .then((postNew) => progContext.setPrograms((post) => [...post, postNew]));

  };

  return (
    <form className="create_program_layout">
      <h2>Edit a Program</h2>
      <div className="insertion_div ">
        <label>Program name: </label>
        <input
          className="title_input"
          type="text"
          id="title"
          name="title"
          value={editContext.programToEdit.title}
          onChange={handleEdit}
        />
        <p></p>
        {editContext.programToEdit.programexercises.map((exercise, index) => (
          <div key={index}>
            <li>
              <h3>{exercise.title}</h3>
              <p>Description: {exercise.description}</p>
              <p>
                Sets: {exercise.sets} Reps: {exercise.reps}
              </p>
            </li>
            <button onClick={updateExercise(exercise)}>Update</button>
          </div>
        ))}

        <button className="post_button" type="submit" onClick={handlePost}>
          <p className="button_text">Post</p>
        </button>
      </div>
    </form>
  );
}
