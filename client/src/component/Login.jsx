import { useNavigate } from "react-router-dom";
import { useContext, useRef } from "react";
import { post } from "../support/fetch";
import "../css/Login.css";
import AppContext from "../context/AppContext";

export default function Login() {
  const navigate = useNavigate();
  const { setUser, setIsLoggedIn } = useContext(AppContext);
  const usernameText = useRef(null);
  const passwordText = useRef(null);

  const enterPressed = (event) => {
    let key = event.key;

    if (key === "Enter") {
      loginButtonPressed();
    }
  };

  const loginButtonPressed = async () => {
    const username = usernameText.current.value.toLowerCase();
    const password = passwordText.current.value;
    if (!username || !password) {
      alert("Please enter usename and password");
      return;
    }

    const postResult = await post("/auth/login", {
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
    <>
      <h1 className="page-title">LogIn</h1>
      <div className="login-container">
        <div className="grid-container">
          <div className="grid-column">
            <div className="login-title">Username:</div>
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
          <button
            className="main-button"
            id="login"
            onClick={loginButtonPressed}
          >
            Login
          </button>
          <div className="confirm">
            <button
              className="login-button"
              id="create"
              onClick={() => navigate("/register")}
            >
              Create Account
            </button>
            <button
              id="guest"
              className="login-button"
              onClick={() => navigate("/")}
            >
              Continue as guest
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
