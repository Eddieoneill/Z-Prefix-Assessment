import "../App.css";
import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import AppContext from "../context/AppContext";

export default function Navbar() {
  const { user, isLoggedIn, setUser, setIsLoggedIn } = useContext(AppContext);
  const username = user ? user.username : "Guest Account";
  const [accountStatus, setAccountStatus] = useState("Sign-in");
  const userItemsRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const curr = isLoggedIn ? "Sign-Out" : "Sign-In";
    setAccountStatus(curr);
  }, [isLoggedIn]);

  const checkLoginStatus = (route) => {
    if (!isLoggedIn) {
      alert(
        "You do not have access to this page as a guest user, please login or register account",
      );
      return;
    }
    navigate(route);
  };

  const signOutButtonPressed = () => {
    if (isLoggedIn) {
      setUser(null);
      setIsLoggedIn(false);
      navigate("/");
    } else {
      navigate("login");
    }
  };
  return (
    <>
      <nav className="nav-container">
        <div className="left-container">
          <button className="left-buttons" onClick={() => navigate("/")}>
            All Items
          </button>
        </div>
        <div className="info-container">
          <div className="info-text-container">
            <div>{username}</div>
          </div>
          <div className="info-button-container">
            <button
              ref={userItemsRef}
              onClick={() => checkLoginStatus("/user_items")}
            >
              User Items
            </button>
            <button onClick={() => signOutButtonPressed()}>
              {accountStatus}
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
