import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import "../css/Login.css";
import post from "../support/post";

export default function Login({ setIsLoggedIn, setIsLoading, setUser }) {
  const navigate = useNavigate();
  const usernameText = useRef(null);
  const passwordText = useRef(null);

  const enterPressed = (event) => {
    let key = event.key;

    if (key === "Enter") {
      createButtonPressed();
    }
  };

  const loginButtonPressed = async () => {
    const username = usernameText.current.value.toLowerCase();
    const password = passwordText.current.value;
    if (!username || !password) {
      alert("Please enter usename and password");
      return;
    }

    const postResult = await post("http://localhost:8000/auth/login", {
      username: username,
      password: password,
    });

    if (!postResult.message) {
      setUser(postResult.user);
      setIsLoggedIn(true);
      navigate("/");
    } else {
      alert(postResult.message);
    }
  };

  return (
    <div className="login-container">
      <div className="grid-container">
        <div className="grid-column">
          <div className="login-title">Username: </div>
          <input
            className="login-text"
            id="userName"
            type="text"
            onKeyDown={enterPressed}
            ref={usernameText}
          />
        </div>
        <div className="grid-column">
          <div className="login-title">Password: </div>
          <input
            className="login-text"
            id="password"
            type="password"
            onKeyDown={enterPressed}
            ref={passwordText}
          />
        </div>
        <div className="confirm">
          <button
            className="login-button"
            id="login"
            onClick={loginButtonPressed}
          >
            Login
          </button>
          <button
            className="login-button"
            id="continue"
            onClick={loginButtonPressed}
          >
            Continue as guest
          </button>
        </div>
      </div>
    </div>
  );
}
