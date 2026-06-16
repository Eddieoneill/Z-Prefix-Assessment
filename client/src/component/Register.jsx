import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import "../css/Login.css";
import post from "../support/post";

export default function Register({ setIsLoggedIn, setIsLoading, setUser }) {
  const navigate = useNavigate();
  const usernameText = useRef(null);
  const firstNameText = useRef(null);
  const lastNameText = useRef(null);
  const passwordText = useRef(null);

  const createButtonPressed = async () => {
    const username = usernameText.current.value;
    const fist_name = firstNameText.current.value;
    const last_name = lastNameText.current.value;
    const password = passwordText.current.value;

    if (!username || !fist_name || !last_name || !password) {
      alert("Please enter usename, first name, last name, and password");
      return;
    }

    const postResult = await post("http://localhost:8000/auth/register", {
      username,
      fist_name,
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
      setIsLoading(false);
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

  const updatePassword = (event) => {
    let key = event.key;
    const tempPassword = password;

    if (key !== "Backspace" && key.length > 1) return;
    if (key === "Backspace") {
      tempPassword.pop();
      setPassword(tempPassword);
    } else {
      tempPassword.push(key);
      setPassword(tempPassword);
    }

    console.log("password", password);
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
        <div className="confirm">
          <button
            className="login-button"
            id="create"
            onClick={createButtonPressed}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
