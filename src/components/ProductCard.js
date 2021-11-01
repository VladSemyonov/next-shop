import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { AppContext } from "../../pages/_app";
import Image from "next/image";

export default function ProductCard({ item, size }) {
  const [sizes, setSizes] = useState({
    font: "18px",
    col: "4",
    img: "250px",
  });
  const { addToBascket, alert } = useContext(AppContext);

  function setAction(i) {
    addToBascket(i);
    alert({ opacity: 1, text: "Товар добавлен в корзину", status: 200 });
  }

  useEffect(() => {
    switch (size) {
      case "normal":
        setSizes({
          font: "18px",
          col: "4",
          img: "250px",
        });
        break;
      case "small":
        setSizes({
          font: "12px",
          col: "3",
          img: "200px",
        });
        break;
    }
  }, [size]);

  return (
    <div className={`col-lg-${sizes.col} col-sm-6`}>
      <div className="product-card">
        <div className="product-grid-content">
          <div className="product-header">
            <span style={{ height: "80px" }}>
              <Link
                style={{ fontSize: size === "small" ? ".8rem" : "1rem" }}
                href={{
                  pathname: "/product/[id]",
                  query: { id: item._attributes.id },
                }}
              >
                {item.name._text}
              </Link>
            </span>
          </div>
          <div className="product-card--body">
            <div className="card-image">
              <Link
                href={{
                  pathname: "/product/[id]",
                  query: { id: item._attributes.id },
                }}
                passHref
              >
                <Image
                  width="250"
                  height="289"
                  src={
                    item.picture._text ||
                    "data:image/jpeg;base64,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"
                  }
                  alt={item.name._text}
                  style={{
                    width: sizes.img,
                    height: "auto",
                  }}
                />
              </Link>
            </div>
            <div className="price-block">
              <div className="d-flex align-items-center pl--50">
                <span style={{ fontSize: sizes.font }} className="price">
                  {item.price._text} {item.currencyId._text}
                </span>
              </div>
              <button
                style={{ fontSize: sizes.font }}
                onClick={() => setAction(item)}
                className={"btn btn-outline-success"}
              >
                Добавить в корзину
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
