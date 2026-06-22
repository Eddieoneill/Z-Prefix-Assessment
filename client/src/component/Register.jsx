import { useNavigate } from "react-router-dom";
import { useRef, useContext } from "react";
import AppContext from "../context/AppContext";
import "../css/Login.css";
import { post } from "../support/fetch";

export default function Register() {
  const navigate = useNavigate();
  const { setUser, setIsLoggedIn } = useContext(AppContext);
  const usernameText = useRef(null);
  const firstNameText = useRef(null);
  const lastNameText = useRef(null);
  const passwordText = useRef(null);

  const createButtonPressed = async () => {
    const username = usernameText.current.value;
    const first_name = firstNameText.current.value;
    const last_name = lastNameText.current.value;
    const password = passwordText.current.value;

    if (!username || !first_name || !last_name || !password) {
      alert("Please enter usename, first name, last name, and password");
      return;
    }

    const postResult = await post("/auth/register", {
      username,
      first_name,
      last_name,
      password,
    });

    if (!postResult.message) {
      if (Array.isArray(postResult)) {
        setUser(postResult[0]);
      } else {
        setUser(postResult);
      }
      setIsLoggedIn(true);
      navigate("/");
    } else {
      alert(postResult.message);
    }
  };

  const enterPressed = (event) => {
    let key = event.key;

    if (key === "Enter") {
      createButtonPressed();
    }
  };

  return (
    <>
      <h1 className="page-title">Account Registration</h1>
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
            <div className="login-title">First Name: </div>
            <input
              className="login-text"
              id="firstName"
              type="text"
              onKeyDown={enterPressed}
              ref={firstNameText}
            />
          </div>
          <div className="grid-column">
            <div className="login-title">Last Name: </div>
            <input
              className="login-text"
              id="lastName"
              type="text"
              onKeyDown={enterPressed}
              ref={lastNameText}
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
            id="create"
            onClick={createButtonPressed}
          >
            Submit
          </button>
          <div className="confirm">
            <button
              className="login-button"
              id="login"
              onClick={() => navigate("/login")}
            >
              Sign-in
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
