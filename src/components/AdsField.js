import { useEffect, useState } from "react";
import "@brainhubeu/react-carousel/lib/style.css";
import ProductCard from "./ProductCard";

export default function AdsField({ title, query }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`https://teemo.vercel.app/api/content/${query}`)
      //fetch(`http://localhost:3000/api/content/${query}`)
      .then((result) => result.json())
      .then((result) => setItems(result));
  }, []);

  return (
    <div className={"container p-0"} style={{ marginBottom: "60px" }}>
      <div style={{ borderLeft: "solid 1px lightgrey" }} className={"mt-2"}>
        <h4 className="mb-0">{title}</h4>
      </div>
      <div
        className="row mw-100"
        style={{
          borderLeft: "1px solid lightgrey",
          borderTop: "1px solid lightgrey",
          boxShadow: "inset 0 0 5px gray",
          padding: "10px",
        }}
      >
        {items.map((item, index) => (
          <ProductCard key={index} item={item} size={"small"} />
        ))}
      </div>
    </div>
  );
}
