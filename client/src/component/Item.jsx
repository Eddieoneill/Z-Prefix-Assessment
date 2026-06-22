import "../App.css";
import "../css/Item.css";
import { useContext } from "react";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";

export default function Item({ item }) {
  const navigate = useNavigate();
  const { setItem } = useContext(AppContext);
  const description =
    item.description.length > 100
      ? item.description.slice(0, 100) + "..."
      : item.description;

  const itemClicked = () => {
    setItem(item);
    navigate("/item_detail");
  };
  return (
    <div className="container" onClick={itemClicked}>
      <div className="item-container">
        <div className="items">
          <div className="item">Name: {item.item_name}</div>
          <div className="item">Quantity: {item.quantity}</div>
        </div>
        <div className="item" id="description">
          Description: {description}
        </div>
      </div>
    </div>
  );
}
