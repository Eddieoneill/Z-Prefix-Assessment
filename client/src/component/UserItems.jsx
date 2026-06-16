import Item from "./Item";
import { useEffect, useState } from "react";
import { get } from "../support/fetch";
import "../css/HomePage.css";

export default function UserItems({ user }) {
  const [items, setItems] = useState(null);

  const fetchItems = async () => {
    const getResult = await get("http://localhost:8000/item");

    if (!getResult.message) {
      setItems(getResult);
    } else {
      alert(getResult.message);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  if (!items) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1 className="page-title">User Items</h1>
      <div className="container">
        {items.map((item) => {
          if (item.user_id === user.id) {
            return <Item key={item.id} item={item} />;
          }
        })}
      </div>
    </>
  );
}
