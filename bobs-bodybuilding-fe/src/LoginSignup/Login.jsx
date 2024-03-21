import { useState, useContext } from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const { setToken, setUserId, setUserName, setLoggedIn } =
    useContext(UserContext);

  const initialState = {
    userName: "",
    password: "",
  };

  const [userData, setUserData] = useState(initialState);

  const handleChange = (event) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;

    setUserData((userData) => ({
      ...userData,
      [inputName]: inputValue,
    }));
  };

  const login = (event) => {
    //log answers to console
    event.preventDefault();
    console.log(userData);

    //cleara form
    setUserData(initialState);

    //skicka fetch fÃ¶r sign in till BE
    fetchData();
  };

  const fetchData = async () => {
    // First fetch to sign in and get token, userId, and userName
    const signInResponse = await fetch("http://localhost:4000/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!signInResponse.ok) {
      throw new Error("Failed to sign in");
    }

    const signInData = await signInResponse.json();
    const { token, id, userName } = signInData;

    setToken(token);
    setUserId(id);
    setUserName(userName);

    //Spara i local storage
    localStorage.setItem('token', JSON.stringify(token));
    localStorage.setItem('userId', JSON.stringify(id));

    setLoggedIn(true);

    navigate("/dashboard");
  };

  const goToSignup = () => {
    //navigera till signup sida
    navigate("/signup");
  };

  return (
    <div>
      <form className="form">
        <h2>Log in Page</h2>

        <label>
          Username:
          <input
            type="text"
            name="userName"
            value={userData.userName}
            onChange={handleChange}
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
          />
        </label>

        <input
          className="form-submit"
          type="submit"
          value="Log in"
          onClick={login}
        />
      </form>

      <br />
      <button onClick={goToSignup}>Sign up</button>
    </div>
  );
}
