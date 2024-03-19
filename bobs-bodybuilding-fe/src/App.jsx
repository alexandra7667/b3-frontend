import { createContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Header";
import UserMenu from "./UserMenu";
import Dashboard from "./Dashboard";
import { programs_data } from "./../test_data/programs_data";
import { shared_exercises_data } from "../test_data/shared_exercises_data";
import ShowProgram from "./ShowProgram";
import CreateProgramPage from "./CreateProgramPage";

const ProgramsContext = createContext();
const ExercisesContext = createContext();
const ModeContext = createContext();

const test_programs = programs_data;
const test_exercises = shared_exercises_data;

// const loginInfo = {
//   userName: "chriswol",
//   password: "password"
// };

// const signupInfo = {
//   firstName: "gustav2",
//   lastName: "svennas2",
//   userName: "gsvennas2",
//   password: "password"
// }

function App() {
  const [currentUser, setCurrentUser] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [privateExercises, setPrivateExercises] = useState([]);
  const [sharedExercises, setSharedExercises] = useState([]);
  const [currentProgram, setCurrentProgram] = useState(null)

  // const [token, setToken] = useState("");

  const [modeDecider, setModeDecider] = useState("show programs");

  useEffect(() => {
    setPrograms(test_programs);
  }, []);

  useEffect(() => {
    setSharedExercises(test_exercises);
  }, []);

  // useEffect(() => {
  //   fetch("http://localhost:4000/auth/signup", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(signupInfo),
  //   });
  // });

  // useEffect(() => {
  //   fetch("http://localhost:4000/auth/signin", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(loginInfo),
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       if (!data.token) {
  //         throw new Error("Token not found in response");
  //       }
  //       setToken(data.token);
  //     })
  //     .catch((error) => {
  //       console.error("Error during authentication:", error);
  //     });
  // }, []);

  // useEffect(() => {
  //   console.log(token);
  // }, [token]);

  // useEffect(() => {
  //   fetch("http://localhost:4000/users/1/programs"),
  //     {
  //       method: "GET",
  //       headers: {
  //         'Authorization': `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //       },
  //     }
  //       .then((response) => response.json())
  //       .then((data) => setPrograms(data.data));
  // }, []);

  // useEffect(() => {
  //   fetch("http://localhost:4000/sharedexercises"),
  //     {
  //       method: "GET",
  //       headers: {
  //         'Authorization': `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //       },
  //     }
  //       .then((response) => response.json())
  //       .then((data) => setSharedExercises(data.data));
  // }, []);

  return (
    <>
      <ModeContext.Provider value={{ modeDecider, setModeDecider }}>
        <ProgramsContext.Provider
          value={{ programs, setPrograms, currentProgram, setCurrentProgram }}
        >
          <ExercisesContext.Provider
            value={{ privateExercises, setPrivateExercises, sharedExercises }}
          >
            <div className="container">
              <Header />

              <UserMenu />

              <div className="container-nav-main">
                <main className="layout">
                  <Routes>
                    {/* 
                  UpdateProgram 
                  CreateProgram 
                  CreateExercise 
                  */}
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/program/:id" element={<ShowProgram />} />
                    <Route path="/create_program" element={<CreateProgramPage />} />
                  </Routes>
                </main>
              </div>
            </div>
          </ExercisesContext.Provider>
        </ProgramsContext.Provider>
      </ModeContext.Provider>
    </>
  );
}

export { App, ProgramsContext, ExercisesContext, ModeContext };
