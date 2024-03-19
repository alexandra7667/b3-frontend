import { useState, useContext } from "react";
import { LoginContext } from "../App"

export default function Login() {
    const { savedAnswers, setSavedAnswers } = useContext(LoginContext);

    const initialState = {
        username: '',
        password: '',
      }
    
      const [userData, setUserData] = useState(initialState)
    
      const handleChange = (event) => {
        const inputName = event.target.name;
        const inputValue = event.target.value;
    
        switch (inputName) {
          case 'username':
            setUserData({ ...userData, username: inputValue });
            break;
          case 'password':
            setUserData({ ...userData, password: inputValue });
            break;
        }
    }

    const login = (event) => {
        //log answers to console
        event.preventDefault();
        console.log(userData);
    
        //spara svar i en state
        setSavedAnswers([...savedAnswers, userData]);
    
        //cleara form
        setUserData(initialState);
      }

    return (
        <div>
            <form className="form">
                <h2>Log in Page</h2>

                <label>Username:
                    <input
                        type="text"
                        name="username"
                        value={userData.username}
                        onChange={handleChange}
                    />
                </label>

                <label>Password:
                    <input
                        type="text"
                        name="password"
                        value={userData.password}
                        onChange={handleChange}
                    />
                </label>

                <input
                    className="form-submit"
                    type="submit"
                    value="Log in"
                    onClick={login} />
            </form>
        </div>
    )
}