import { createContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Header";
import UserMenu from "./UserMenu";
import Dashboard from "./Dashboard";
import ShowProgram from "./ShowProgram";
import CreateProgramPage from "./CreateProgramPage";
import Login from "./LoginSignup/Login";
import Signup from "./LoginSignup/Signup";


const ProgramsContext = createContext();
const ExercisesContext = createContext();
const UserContext = createContext();


function App() {
  //const [currentUser, setCurrentUser] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [privateExercises, setPrivateExercises] = useState([]);
  const [sharedExercises, setSharedExercises] = useState([]);
  const [currentProgram, setCurrentProgram] = useState(null)

  //Fylls i på login sida
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState(0);
  const [userName, setUserName] = useState("");

  const [loggedIn, setLoggedIn] = useState(false);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {

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
        <ExercisesContext.Provider value={{ privateExercises, setPrivateExercises, sharedExercises }}>
          <div className="container">
            <Header />

            {!loggedIn && (
              <>
                <UserContext.Provider value={{ setToken, setUserId, setUserName, setLoggedIn }}>
                  <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                  </Routes>
                </UserContext.Provider>
              </>
            )}

            {loggedIn && (
              <>

                <UserMenu />

                <div className="container-nav-main">
                  <main className="layout">
                    <Routes>
                      {/* 
                  UpdateProgram 
                  CreateProgram 
                  CreateExercise 
                  */}
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/program/:id" element={<ShowProgram />} />
                      <Route path="/create_program" element={<CreateProgramPage />} />
                    </Routes>
                  </main>
                </div>

              </>
            )}

          </div>
        </ExercisesContext.Provider>
      </ProgramsContext.Provider >
    </>
  );
}

export { App, ProgramsContext, ExercisesContext, UserContext };
