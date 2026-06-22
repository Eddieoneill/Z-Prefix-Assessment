import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import AppContext from "./context/AppContext";
import Navbar from "./component/Navbar";
import Register from "./component/Register";
import Login from "./component/Login";
import HomePage from "./component/HomePage";
import UserItems from "./component/UserItems";
import "./App.css";
import ItemDetail from "./component/ItemDetail";
// import { SpeedInsights } from "@vercel/speed-insights/react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [item, setItem] = useState(null);
  const [itemChanged, setItemChanged] = useState(true);

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        user,
        itemChanged,
        setUser,
        setIsLoggedIn,
        setItem,
        setItemChanged,
      }}
    >
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user_items" element={<UserItems user={user} />} />
        <Route path="/item_detail" element={<ItemDetail item={item} />} />
        <Route
          path="/register"
          element={<Register setIsLoggedIn={setIsLoggedIn} setUser={setUser} />}
        />
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} />}
        />
      </Routes>
      {/* <SpeedInsights /> */}
    </AppContext.Provider>
  );
}

export default App;
