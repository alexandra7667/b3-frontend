import { createContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Header";
import UserMenu from "./UserMenu";
import Dashboard from "./Dashboard";
import { programs_data } from "./../test_data/programs_data";
import { shared_exercises_data } from "../test_data/shared_exercises_data";
import Login from "./LoginSignup/Login";

const ProgramsContext = createContext();
const ExercisesContext = createContext();
const ModeContext = createContext();
const LoginContext = createContext();

const test_programs = programs_data;
const test_exercises = shared_exercises_data;

const loginInfo = {
  userName: "ahern",
  password: "password"
};

const signupInfo = {
  firstName: "gustav3",
  lastName: "svennas3",
  userName: "gsvennas3",
  password: "password"
}

function App() {
  const [programs, setPrograms] = useState([]);
  const [privateExercises, setPrivateExercises] = useState([]);
  const [sharedExercises, setSharedExercises] = useState([]);

  //Fylls i på login sida
  const [savedAnswers, setSavedAnswers] = useState([]);

  const [token, setToken] = useState("");
  const [userId, setUserId] = useState(0);
  const [userName, setUserName] = useState("");

  const [modeDecider, setModeDecider] = useState("show programs");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // First fetch to sign in and get token, userId, and userName
        const signInResponse = await fetch("http://localhost:4000/auth/signin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(loginInfo),
        });

        if (!signInResponse.ok) {
          throw new Error('Failed to sign in');
        }

        const signInData = await signInResponse.json();
        const { token, id, userName } = signInData;
        setToken(token);
        setUserId(id);
        setUserName(userName);

        // Second fetch to retrieve programs
        const programsResponse = await fetch(`http://localhost:4000/users/${id}/programs`, {
          method: "GET",
          headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!programsResponse.ok) {
          throw new Error('Failed to fetch programs');
        }

        const programsData = await programsResponse.json();
        setPrograms(programsData.data);

        // Third fetch to retrieve shared exercises
        const sharedExercisesResponse = await fetch("http://localhost:4000/sharedexercises", {
          method: "GET",
          headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!sharedExercisesResponse.ok) {
          throw new Error('Failed to fetch shared exercises');
        }

        const sharedExercisesData = await sharedExercisesResponse.json();
        setSharedExercises(sharedExercisesData.data);

        // Fourth fetch to get private exercises
        const privateExercisesResponse = await fetch(`http://localhost:4000/users/${id}/privateexercises`, {
          method: "GET",
          headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!privateExercisesResponse.ok) {
          throw new Error('Failed to fetch private exercises');
        }

        const privateExercisesData = await privateExercisesResponse.json();
        setPrivateExercises(privateExercisesData.data);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call fetchData function
    fetchData();
  }, []);


  return (
    <>
      <div className="container">
        <Header />

        <LoginContext.Provider value={{ savedAnswers, setSavedAnswers }}>
          <Login />
        </LoginContext.Provider>

        {/* Om login fyllts i är savedAnswers set och man kan hämta data och visa ny layout*/}
      {savedAnswers ? (
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
      ) : null} 
      </div>
    </>
  );
}

export { App, ProgramsContext, ExercisesContext, ModeContext, LoginContext };
