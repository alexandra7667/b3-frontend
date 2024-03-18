import { useContext, useState } from "react";
import "./index.css";
import { NewProgramExercisesContect } from "../Dashboard";

export default function CreateProgramForm() {

  const [newProgram, setNewProgram] = useState({
    title: ""
  });

  const newExercisesContext = useContext(NewProgramExercisesContect);

  const handleChange = (event) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;

    if (inputName === "title") {
      setNewProgram({ ...newProgram, title: inputValue });
    }
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

    setNewProgram({ ...newProgram, title: ""});
  };

  return (
    <form className="create_program_layout">
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

        {(newExercisesContext.exercisesInNewProgram.length !== 0) && (
          newExercisesContext.exercisesInNewProgram.map((exercise, index) => (
            <li key={index}>
              <h2>{exercise.title}</h2>
              <p>{exercise.description}</p>
            </li>
          ))
        )}

        <button className="post_button" type="submit" onClick={handlePost}>
          <p className="button_text">Post</p>
        </button>
      </div>
    </form>
  );
}
