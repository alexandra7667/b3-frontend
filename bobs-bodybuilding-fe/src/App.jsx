import { createContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Header";
import UserMenu from "./UserMenu";
import Dashboard from "./Dashboard";
import { programs_data } from "./../test_data/programs_data";
import { shared_exercises_data } from "../test_data/shared_exercises_data";

const ProgramsContext = createContext();
const ExercisesContext = createContext();

const ModeContext = createContext();

const test_programs = programs_data;
const test_exercises = shared_exercises_data;

const loginInfo = {
  userName: "gsvennas",
  password: "password",
};

function App() {
  const [programs, setPrograms] = useState([]);
  const [privateExercises, setPrivateExercises] = useState([]);
  const [sharedExercises, setSharedExercises] = useState([]);

  const [token, setToken] = useState("");

  const [modeDecider, setModeDecider] = useState("show programs");

  useEffect(() => {
    setPrograms(test_programs);
  }, []);

  useEffect(() => {
    setSharedExercises(test_exercises);
  }, []);

  useEffect(() => {
    fetch("http://localhost:4000/auth/signin",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginInfo),
      })
        .then((response) => response.json())
        .then((data) => setToken(data.token));
  }, []);

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
      <div className="container">
        <Header />

        <ModeContext.Provider value={{ modeDecider, setModeDecider }}>
          <UserMenu />

          <ProgramsContext.Provider value={{ programs, setPrograms }}>
            <ExercisesContext.Provider
              value={{ privateExercises, setPrivateExercises, sharedExercises }}
            >
              <div className="container-nav-main">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                </Routes>
              </div>
            </ExercisesContext.Provider>
          </ProgramsContext.Provider>
        </ModeContext.Provider>
      </div>
    </>
  );
}

export { App, ProgramsContext, ExercisesContext, ModeContext };
