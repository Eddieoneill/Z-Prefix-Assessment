import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import AppContext from "./context/AppContext";
import Navbar from "./component/Navbar";
import Register from "./component/Register";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  if (!isLoading) {
    return (
      <Register
        setIsLoggedIn={setIsLoggedIn}
        setIsLoading={setIsLoading}
        setUser={setUser}
      />
    );
  }

  return (
    <AppContext.Provider value={{ isLoggedIn }}>
      <Navbar />
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route
          path="/"
          element={<Register setIsLoggedIn={setIsLoggedIn} setUser={setUser} />}
        />
      </Routes>
    </AppContext.Provider>
  );
}

export default App;
