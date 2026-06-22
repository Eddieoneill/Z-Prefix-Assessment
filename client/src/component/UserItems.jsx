import Item from "./Item";
import { useContext, useEffect, useState } from "react";
import { get, post } from "../support/fetch";
import "../css/HomePage.css";
import AppContext from "../context/AppContext";

export default function UserItems({ user }) {
  const [items, setItems] = useState(null);
  const { itemChanged, setItemChanged } = useContext(AppContext);
  const [addItemPressed, setAddItemPressed] = useState(false);
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [description, setDescription] = useState("");

  const fetchItems = async () => {
    const getResult = await get("/item");

    if (!getResult.message) {
      setItems(getResult.sort((a, b) => a.id - b.id));
    } else {
      alert(getResult.message);
    }
  };

  const addButtonClicked = () => {
    setAddItemPressed(true);
  };

  const applyButtonClicked = async () => {
    if (itemName === "") {
      alert("Plase add item name to create new item");
      return;
    }
    const newValue = {
      user_id: user.id,
      item_name: itemName,
      quantity,
      description,
    };
    await post(`/item/create`, newValue);
    setAddItemPressed(false);
    setItemChanged(true);
  };

  const cancelButtonClicked = () => {
    setAddItemPressed(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    if (itemChanged) {
      fetchItems();
      setItemChanged(false);
    }
  }, [itemChanged]);

  if (!items) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {!addItemPressed && (
        <>
          <div className="page-header">
            <h1 className="page-title">User Items</h1>
            <button className="main-button" onClick={addButtonClicked}>
              Add Item
            </button>
          </div>
          <div className="container">
            {items.map((item) => {
              if (item.user_id === user.id) {
                return <Item key={item.id} item={item} />;
              }
            })}
          </div>
        </>
      )}
      {addItemPressed && (
        <>
          <h1 className="page-title">New Item</h1>
          <div className="item-detail-card">
            <div className="item-detail-field">
              <span className="item-detail-label">Name</span>
              <input
                type="text"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                className="item-detail-value"
              />
            </div>
            <div className="item-detail-field">
              <span className="item-detail-label">Quantity</span>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="item-detail-value"
              />
            </div>
            <div className="item-detail-field">
              <span className="item-detail-label">Description</span>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="item-detail-value"
              />
            </div>

            <div className="item-detail-actions">
              <button
                id="apply"
                className="item-detail-edit-btn"
                onClick={applyButtonClicked}
              >
                Apply
              </button>
              <button
                className="item-detail-edit-btn"
                id="cancel"
                onClick={cancelButtonClicked}
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
