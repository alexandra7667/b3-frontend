import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";


export default function Signup() {
  const navigate = useNavigate();

  const initialState = {
    firstName: "",
    lastName: "",
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

  const signup = (event) => {
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
    const signUpResponse = await fetch("http://localhost:4000/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!signUpResponse.ok) {
      throw new Error("Failed to sign up");
    }

    //goToLogin();
  };

  const goToLogin = () => {
    //navigera till login sidan
    navigate("/");
  };

  return (
    <div>
      <form className="form">
        <h2>Sign up Page</h2>

        <label>
          First name:
          <input
            type="text"
            name="firstName"
            value={userData.firstName}
            onChange={handleChange}
          />
        </label>

        <label>
          Last name:
          <input
            type="text"
            name="lastName"
            value={userData.lastName}
            onChange={handleChange}
          />
        </label>

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
          value="Sign up"
          onClick={signup}
        />
      </form>

      <br />
      <div className="log-in">
      <p>Already a user?</p>
      <button onClick={goToLogin}>Log in</button>
      </div>
    </div>
  );
}
