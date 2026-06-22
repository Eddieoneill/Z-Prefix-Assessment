import { useNavigate } from "react-router-dom";
import "../css/ItemDetail.css";
import AppContext from "../context/AppContext";
import { useContext, useEffect, useState } from "react";
import { del, post } from "../support/fetch";

export default function ItemDetail({ item }) {
  const [editButtonClicked, setEditButtonClicked] = useState(false);
  const [NewItemName, setNewItemName] = useState(item.item_name || "");
  const [newQuantity, setNewQuantity] = useState(Number(item.quantity) || 0);
  const [newDescription, setNewDescription] = useState(item.description || "");
  const [itemName, setItemName] = useState(item.item_name);
  const [quantity, setQuantity] = useState(item.quantity);
  const [description, setDescription] = useState(item.description);
  const { setItemChanged } = useContext(AppContext);
  const navigate = useNavigate();
  if (!item) navigate("/");

  const { user, isLoggedIn } = useContext(AppContext);
  const canMoidfy = user ? user.id === item.user_id : false;

  const editPage = () => {
    setEditButtonClicked(true);
  };

  const deleteItem = async () => {
    await del(`/item/${item.id}`);
    setItemChanged(true);
    navigate("/");
  };

  const applyButtonClicked = async () => {
    const newValue = {
      item_name: NewItemName,
      quantity: newQuantity,
      description: newDescription,
    };
    await post(`/item/${item.id}`, newValue);
    setItemName(NewItemName);
    setQuantity(newQuantity);
    setDescription(newDescription);
    setItemChanged(true);
    setEditButtonClicked(false);
  };

  const cancelButtonClicked = () => {
    setEditButtonClicked(false);
  };
  return (
    <>
      <h1 className="page-title">Item Detail</h1>
      {!editButtonClicked && (
        <div className="item-detail-card">
          <div className="item-detail-field">
            <span className="item-detail-label">Name</span>
            <span className="item-detail-value">{itemName}</span>
          </div>
          <div className="item-detail-field">
            <span className="item-detail-label">Quantity</span>
            <span className="item-detail-value">{quantity}</span>
          </div>
          <div className="item-detail-field">
            <span className="item-detail-label">Description</span>
            <span className="item-detail-value item-detail-description">
              {description}
            </span>
          </div>
          {canMoidfy && (
            <div className="item-detail-actions">
              <button className="item-detail-edit-btn" onClick={editPage}>
                Edit
              </button>
              <button
                className="item-detail-edit-btn"
                id="delete"
                onClick={deleteItem}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      )}
      {editButtonClicked && (
        <div className="item-detail-card">
          <div className="item-detail-field">
            <span className="item-detail-label">Name</span>
            <input
              type="text"
              value={NewItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              className="item-detail-value"
            />
          </div>
          <div className="item-detail-field">
            <span className="item-detail-label">Quantity</span>
            <input
              type="number"
              value={newQuantity}
              onChange={(e) => setNewQuantity(e.target.value)}
              className="item-detail-value"
            />
          </div>
          <div className="item-detail-field">
            <span className="item-detail-label">Description</span>
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="item-detail-value"
            />
          </div>
          {canMoidfy && (
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
          )}
        </div>
      )}
    </>
  );
}
