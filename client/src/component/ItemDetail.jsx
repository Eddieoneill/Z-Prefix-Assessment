import { useNavigate } from "react-router-dom";
import "../App.css";
import AppContext from "../context/AppContext";
import { useContext } from "react";

export default function ItemDetail({ item }) {
  const navigate = useNavigate();
  if (!item) navigate("/");

  const { user, isLoggedIn } = useContext(AppContext);
  const canMoidfy = user ? user.id === item.user_id : false;

  const checkUserToModify = () => {
    if (canMoidfy) {
      navigate("/");
    }
  };
  return (
    <>
      <h1 className="page-title">Item Detail</h1>
      <div className="container">
        <div>{item.item_name}</div>
        <div>{item.quantity}</div>
        <div>{item.description}</div>
        <button onClick={checkUserToModify}>Edit</button>
      </div>
    </>
  );
}
