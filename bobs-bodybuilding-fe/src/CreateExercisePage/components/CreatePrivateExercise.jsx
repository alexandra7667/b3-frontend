import { useContext, useState } from "react";
import { ExercisesContext } from "../../App";

const initState = {
  title: "",
  description: "",
};

export default function CreatePrivateExercise() {
  const exercisesContext = useContext(ExercisesContext);

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

    // fetch("https://boolean-api-server.fly.dev/svennas/post", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(newProgram),
    // })
    //   .then((resp) => resp.json())
    //   .then((programNew) =>
    //     programsContext.setPrograms((program) => [...program, programNew])
    //   );

    exercisesContext.setPrivateExercises([
      ...exercisesContext.privateExercises,
      newExercise,
    ]);

    setNewExercise(initState);
    // // setNewProgram({ ...newProgram, programexercises: [""] });
  };

  return (
    <div className="create_exercise_container">
      <form className="create_exercise_layout">
        <h2>Create and add a new Exercise</h2>
        <div className="add_info_container">
          <label>Title: </label>
          <input
            className="title_input"
            type="text"
            id="title"
            name="title"
            value={newExercise.title}
            onChange={handleChange}
          />
          <p></p>
          <label>Description: </label>
          <input
            className="description_input"
            type="text"
            id="description"
            name="description"
            value={newExercise.description}
            onChange={handleChange}
          />
          <p></p>

          <button className="post_button" type="submit" onClick={handlePost}>
            <p className="button_text">Add to Private Exercises</p>
          </button>
        </div>
      </form>
    </div>
  );
}