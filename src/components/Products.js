import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import ToolBar from "./ToolBar";

export default function Products({ items }) {
  const [columnsSize, setColumnsSize] = useState("small");
  const [sortValue, setSortValue] = useState("down");
  const [sortedItems, setSortedItems] = useState([]);

  const changeSortValue = (e) => {
    setSortValue(e);
  };

  useEffect(() => {
    sortItems(sortValue);
  }, [sortValue, items]);

  function sortItems(fil) {
    switch (fil) {
      case "up":
        setSortedItems(
          items.sort((a, b) =>
            Number(a.price._text) - Number(b.price._text) > 0 ? 1 : -1
          )
        );
        return;
      case "down":
        setSortedItems(
          items.sort((a, b) =>
            Number(a.price._text) - Number(b.price._text) > 0 ? -1 : 1
          )
        );
        return;
    }
  }
  console.log(sortValue, sortedItems);
  return (
    <>
      <ToolBar
        util={setColumnsSize}
        sortType={changeSortValue}
        value={sortValue}
      />
      {sortedItems.map((i, index) => (
        <ProductCard item={i} size={columnsSize} key={index} />
      ))}
    </>
  );
}
