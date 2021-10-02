import { useEffect, useState } from "react";
import Carousel from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import Image from "next/image";

export default function AdsField({ title, query }) {
  const [items, setItems] = useState();

  useEffect(() => {
    fetch(`https://76.76.21.21:443/api/content/${query}`)
      .then((result) => result.json())
      .then((result) => setItems(result));
  }, []);

  return (
    <div className={"container"} style={{ marginBottom: "60px" }}>
      <div style={{ borderLeft: "solid 1px lightgrey" }} className={"mt-2"}>
        <h4 className="mb-0 p-2">{title}</h4>
      </div>
      <div
        style={{
          borderLeft: "1px solid lightgrey",
          borderTop: "1px solid lightgrey",
          boxShadow: "inset 0 0 5px gray",
          padding: "0 4px",
        }}
      >
        {items && (
          <Carousel itemWidth={350}>
            {items.map((item, index) => (
              <div key={index} className={`col-12 mys`}>
                <div className="product-card">
                  <div className="product-grid-content">
                    <div className="product-header">
                      <span style={{ height: "80px" }}>
                        <a to={`/product/${item?._attributes.id}`}>
                          {item.name._text}
                        </a>
                      </span>
                    </div>
                    <div className="product-card--body">
                      <div className="card-image">
                        <a to={`/product/${item._attributes.id}`}>
                          <Image
                            width="250"
                            height="289"
                            src={item.picture._text}
                            alt={item.name._text}
                            style={{ height: "auto" }}
                          />
                        </a>
                      </div>
                      <div className="price-block">
                        <div className="d-flex align-items-center justify-content-center">
                          <span className="price">
                            {item.price._text} {item.currencyId._text}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        )}
      </div>
    </div>
  );
}
