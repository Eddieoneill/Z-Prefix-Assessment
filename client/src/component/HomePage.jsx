import Item from "./Item";
import { useContext, useEffect, useState } from "react";
import { get } from "../support/fetch";
import "../css/HomePage.css";
import AppContext from "../context/AppContext";

export default function HomePage() {
  const [items, setItems] = useState(null);
  const { itemChanged, setItemChanged } = useContext(AppContext);

  const fetchItems = async () => {
    const getResult = await get("/item");

    if (!getResult.message) {
      setItems(getResult.sort((a, b) => a.id - b.id));
    } else {
      alert(getResult.message);
    }
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
      <h1 className="page-title">All Items</h1>
      <div className="container">
        {items.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </div>
    </>
  );
}
