import "./index.css";
import { useNavigate } from "react-router-dom";

export default function Header({ loggedIn, setLoggedIn, userName }) {
  const appTitle = "Bob's Bodybuilding"

  const navigate = useNavigate();

  const logout = () => {
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
          <div className="user-creds">
            <h3>{userName}</h3>
            <button className="logout-btn" onClick={logout}>Log out</button>
          </div>
        </>
      )}
    </header>
  );
}