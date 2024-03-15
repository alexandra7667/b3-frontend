import { createContext, useState } from "react";
import "./App.css";
import Header from "./Header";
import UserMenu from "./UserMenu";
import Dashboard from "./Dashboard";

const ProgramsContext = createContext();

function App() {
  const [programs, setPrograms] = useState([]);
  const [privateExercises, setPrivateExercises] = useState([]);
  const [sharedExercises] = useState([]);

  return (
    <body>
      <div className="container">
        <Header></Header>
        <UserMenu></UserMenu>
        <div className="container-nav-main">
          <Dashboard></Dashboard>
        </div>
      </div>
    </body>
  );
}

export default App;
