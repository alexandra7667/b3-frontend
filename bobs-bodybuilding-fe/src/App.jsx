import { createContext, useState } from "react";
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
  const [loggedIn, setLoggedIn] = useState(false);

  /* For local testing without connection to database or backend */
  // useEffect(() => {
  //   setSharedExercises(test_exercises);
  //   setPrivateExercises(test_exercises);
  //   setPrograms(test_programs);
  // }, []);

  return (
    <>
      <ProgramsContext.Provider value={{ programs, setPrograms, currentProgram, setCurrentProgram }}>
        <ExercisesContext.Provider value={{ privateExercises, setPrivateExercises, sharedExercises, setSharedExercises }}>
          <UserContext.Provider value={{ token, setToken, userId, setUserId, setLoggedIn }}>
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
                        />
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
