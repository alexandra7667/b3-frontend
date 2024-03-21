import { useContext, useState } from "react";
import { ExercisesContext, UserContext } from "../../App";

const initState = {
  title: "",
  description: "",
};

export default function CreatePrivateExercise() {
  const exercisesContext = useContext(ExercisesContext);
  const userContext = useContext(UserContext);

  const [newExercise, setNewExercise] = useState(initState);

  const handleChange = (event) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;

    if (inputName === "title") {
      setNewExercise({ ...newExercise, title: inputValue });
    }
    if (inputName === "description") {
      setNewExercise({ ...newExercise, description: inputValue });
    }
    console.log("Check to see if newProgram changes: ", newExercise);
  };

  const handlePost = (event) => {
    event.preventDefault();

    // skicka till databas
    postToDatabase();

    exercisesContext.setPrivateExercises([
      ...exercisesContext.privateExercises,
      newExercise,
    ]);

    setNewExercise(initState);
    // // setNewProgram({ ...newProgram, programexercises: [""] });
  };

  const postToDatabase = async () => {
    const programResponse = await fetch(`http://localhost:4000/users/${userContext.userId}/privateexercises`, {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${userContext.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newExercise),
    });

    if (!programResponse.ok) {
      throw new Error('Failed to post exercise');
    }
  }

  return (
    <div className="create_exercise_container">
      <form className="create_exercise_layout">
        <h2>Create and add a new Exercise</h2>
        <hr className="update_program_breaker" />
        <div className="add_info_container">
          <label className="create_program_label_text">Title: </label>
          <br />
          <input
            className="title_input"
            type="text"
            id="title"
            name="title"
            value={newExercise.title}
            onChange={handleChange}
          />
          <br />
          <label className="create_program_label_text">Description: </label>
          <br />
          <input
            className="description_input"
            type="text"
            id="description"
            name="description"
            value={newExercise.description}
            onChange={handleChange}
          />
          <p></p>

          <button
            className="update_program_button"
            type="submit"
            onClick={handlePost}
          >Add to Private Exercises
          </button>
        </div>
      </form>
    </div>
  );
}