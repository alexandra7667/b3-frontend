import { createContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Header";
import UserMenu from "./UserMenu";
import Dashboard from "./Dashboard";
import ShowProgram from "./ShowProgram";
import CreateProgramPage from "./CreateProgramPage";
import EditProgramPage from "./EditProgramPage";
import CreateExercisePage from "./CreateExercisePage";
import Login from "./LoginSignup/Login";
import Signup from "./LoginSignup/Signup";

const ProgramsContext = createContext();
const ExercisesContext = createContext();
const UserContext = createContext();


function App() {
  const [programs, setPrograms] = useState([]);
  const [privateExercises, setPrivateExercises] = useState([]);
  const [sharedExercises, setSharedExercises] = useState([]);
  const [currentProgram, setCurrentProgram] = useState(null)

  //Fylls i på login sida
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState(0);
  const [userName, setUserName] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  /* For local testing without connection to database or backend */
  useEffect(() => {
    setSharedExercises(test_exercises);
    setPrivateExercises(test_exercises);
    setPrograms(test_programs);
  }, []);

  //Fylls i på login sida
  // const [savedAnswers, setSavedAnswers] = useState([]);

  // const [token, setToken] = useState("");
  // const [userId, setUserId] = useState(0);
  // const [userName, setUserName] = useState("");

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // First fetch to sign in and get token, userId, and userName
  //       const signInResponse = await fetch("http://localhost:4000/auth/signin", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify(loginInfo),
  //       });

  //       if (!signInResponse.ok) {
  //         throw new Error('Failed to sign in');
  //       }

  //       const signInData = await signInResponse.json();
  //       const { token, id, userName } = signInData;
  //       setToken(token);
  //       setUserId(id);
  //       setUserName(userName);

  //       // Second fetch to retrieve programs
  //       const programsResponse = await fetch(`http://localhost:4000/users/${id}/programs`, {
  //         method: "GET",
  //         headers: {
  //           'Authorization': `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //       });

  //       if (!programsResponse.ok) {
  //         throw new Error('Failed to fetch programs');
  //       }

  //       const programsData = await programsResponse.json();
  //       setPrograms(programsData.data);

  //       // Third fetch to retrieve shared exercises
  //       const sharedExercisesResponse = await fetch("http://localhost:4000/sharedexercises", {
  //         method: "GET",
  //         headers: {
  //           'Authorization': `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //       });

  //       if (!sharedExercisesResponse.ok) {
  //         throw new Error('Failed to fetch shared exercises');
  //       }

  //       const sharedExercisesData = await sharedExercisesResponse.json();
  //       setSharedExercises(sharedExercisesData.data);

  //       // Fourth fetch to get private exercises
  //       const privateExercisesResponse = await fetch(`http://localhost:4000/users/${id}/privateexercises`, {
  //         method: "GET",
  //         headers: {
  //           'Authorization': `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //       });

  //       if (!privateExercisesResponse.ok) {
  //         throw new Error('Failed to fetch private exercises');
  //       }

  //       const privateExercisesData = await privateExercisesResponse.json();
  //       setPrivateExercises(privateExercisesData.data);

  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   // Call fetchData function
  //   fetchData();
  // }, []);

  return (
    <>
      <ProgramsContext.Provider value={{ programs, setPrograms, currentProgram, setCurrentProgram }}>
        <ExercisesContext.Provider value={{ privateExercises, setPrivateExercises, sharedExercises, setSharedExercises }}>
          <UserContext.Provider value={{ token, setToken, userId, setUserId, setUserName, setLoggedIn }}>
            <div className="container">
              <Header />

              {!loggedIn && (
                <>
                  <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                  </Routes>
              </>
            )}

            {loggedIn && (
              <>
                <UserMenu />

                <div className="container-nav-main">
                  <main className="layout">
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/program/:id" element={<ShowProgram />} />
                      <Route
                        path="/create_program"
                        element={<CreateProgramPage />}
                      />
                      <Route
                        path="/edit_program/:id"
                        element={<EditProgramPage />}
                      />
                      <Route
                        path="/create_exercise"
                        element={<CreateExercisePage />}
                    </Routes>
                  </main>
                </div>
              </>
            )}
            </div>
          </UserContext.Provider>
        </ExercisesContext.Provider>
      </ProgramsContext.Provider >
    </>
  );
}

export { App, ProgramsContext, ExercisesContext, UserContext };
