import { createContext, useEffect, useState } from "react";
//import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Header";
import UserMenu from "./UserMenu";
import Dashboard from "./Dashboard";
import { programs_data } from "./../test_data/programs_data";
import { shared_exercises_data } from "../test_data/shared_exercises_data";

const ProgramsContext = createContext();
const ExercisesContext = createContext();

const test_programs = programs_data;
const test_exercises = shared_exercises_data;

function App() {
  const [programs, setPrograms] = useState([]);
  const [privateExercises, setPrivateExercises] = useState([]);
  const [sharedExercises, setSharedExercises] = useState([]);

  useEffect(() => {
    setPrograms(test_programs);
  }, []);

  useEffect(() => {
    setSharedExercises(test_exercises);
  }, []);

  // useEffect(() => {
  //   fetch("http://localhost:4000/")
  //     .then((response) => response.json())
  //     .then((data) => setPrograms(data));
  // }, []);

  // useEffect(() => {
  //   fetch("http://localhost:4000/")
  //     .then((response) => response.json())
  //     .then((data) => setSharedExercises(data));
  // }, []);

  return (
    <>
      <ProgramsContext.Provider value={{ programs, setPrograms }}>
        <ExercisesContext.Provider
          value={{ privateExercises, setPrivateExercises, sharedExercises }}
        >
          <div className="container">
            <Header />
            <UserMenu />
            <div className="container-nav-main">
              {/* <Routes>
                <Route path="view_program/:id"></Route>
              </Routes> */}
              <Dashboard />
            </div>
          </div>
        </ExercisesContext.Provider>
      </ProgramsContext.Provider>
    </>
  );
}

export { App, ProgramsContext, ExercisesContext };
