import { useState } from "react";
import Navbar from "./component/Navbar";
import Register from "./component/Register";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  if (isLoading) {
    return (
      <Register
        setIsLoggedIn={setIsLoggedIn}
        setIsLoading={setIsLoading}
        setUser={setUser}
      />
    );
  }

  return (
    <>
      <Navbar />
    </>
  );
}

export default App;
