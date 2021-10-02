import Carousel from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Courusel() {
  const [items, setItems] = useState();

  useEffect(() => {
    fetch(`https://teemo.vercel.app/api/content/Гидробоксы`)
      .then((result) => result.json())
      .then((result) => setItems(result));
  }, []);

  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "100px auto",
        boxShadow: "0 0 20px 1px gray",
        height: "fit-content",
        padding: "30px 0",
      }}
    >
      {items && (
        <Carousel plugins={["arrows"]}>
          {items.map((i, index) => (
            <a
              to={`/product/${i._attributes.id}`}
              key={index}
              style={{ width: "1005" }}
            >
              <div className="row w-full">
                <div className="col-4">
                  <Image
                    src={i.picture._text}
                    loading="lazy"
                    alt={i.name._text}
                    height="290"
                    width="180"
                  />
                </div>
                <div className="col-8 d-flex flex-column justify-content-around">
                  <h2>ХИТ ПРОДАЖ</h2>
                  <h3>{i.name._text}</h3>
                </div>
              </div>
            </a>
          ))}
        </Carousel>
      )}
    </div>
  );
}
