import { useState, useEffect } from "react";
import PostTitle from "./PostTitle";

export default function PostsList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/mostClicked`)
      .then((result) => result.json())
      .then((result) => setItems(result));
  }, []);

  return (
    <div
      className="container"
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        padding: "40px 0",
      }}
    >
      {items.length > 0 && (
        <h3 style={{ width: "100%" }}>Самые просматриваемые товары</h3>
      )}
      {items.map((i, index) => (
        <PostTitle item={i} key={index} />
      ))}
    </div>
  );
}
