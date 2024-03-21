import "./index.css";
import { useNavigate } from "react-router-dom";

export default function Header({ loggedIn, setLoggedIn }) {
  const appTitle = "Bob's Bodybuilding"

  const navigate = useNavigate();

  const logout = () => {
    console.log("logout btn clicked")
    //cleara localstorage
    localStorage.clear();
    //set loggedIn som false
    setLoggedIn(false);
    //navigera till login
    navigate("/");
  }

  return (
    <header className="header">
      <h1 className="title">{appTitle}</h1>
      {loggedIn && (
        <>
          <button onClick={logout}>Log out</button>
        </>
      )}
    </header>
  );
}