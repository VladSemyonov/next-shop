import { useEffect, useState, useContext } from "react";
import { AppContext } from "../_app";
import Layout from "../../src/components/Layout/Layout";
import Image from "next/image";

export default function Product({ product }) {
  const { addToBascket } = useContext(AppContext);
  const [middleScore, setMiddleScore] = useState(0);
  const [leftCol, setLeftCol] = useState([]);
  const [rightCol, setRightCol] = useState([]);
  console.log(product.clicks);
  useEffect(
    () => setMiddleScore(Math.floor(product?.param?.length / 2) - 1),
    [product]
  );

  useEffect(() => {
    for (let i = 0; i < product?.param?.length; i++) {
      if (i <= middleScore) {
        setLeftCol((leftCol) => [...leftCol, product.param[i]]);
      } else setRightCol((rightCol) => [...rightCol, product.param[i]]);
    }
  }, [middleScore]);

  return product ? (
    <Layout title={product.name._text} description={product.description._text}>
      <div className={"container"}>
        <div className="row  mb--60" style={{ maxWidth: "100%" }}>
          <div className="col-lg-5 mb--30">
            <Image
              width="300"
              height="500"
              src={product.picture._text}
              alt={product.name._text}
            />
          </div>
          <div className="col-lg-7 pl--50">
            <h3 className="product-title">{product.name._text}</h3>

            <div className="add-cart-btn d-flex justify-content-between align-items-center my--20">
              <span className="price-new">
                Цена: {product.price._text} {product.currencyId._text}
              </span>
              <button
                className="btn font-bold"
                onClick={() => addToBascket(product)}
              >
                <span className="text-center align-middle">
                  Добавить в корзину
                </span>
              </button>
            </div>
            <article className="product-details-article">
              <h4 className="sr-only">Product Summery</h4>
              <p>{product.description._text}</p>
            </article>
          </div>
        </div>
        <div className="product-details-info pl-lg--30 ">
          <div className="row">
            <ul className="col-9 list-unstyled">
              <li>
                Производство{" "}
                <span className={"list-value"}>
                  {product.country_of_origin._text}
                </span>
              </li>
              {leftCol.map((i, index) => (
                <li key={index}>
                  {i._attributes.name}{" "}
                  <span className="list-value"> {i._text}</span>
                </li>
              ))}
            </ul>
            <ul className="col-3 list-unstyled">
              {rightCol.map((i, index) => (
                <li key={index}>
                  {i._attributes.name}{" "}
                  <span className="list-value"> {i._text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  ) : (
    <Layout>
      <h1>Загружается</h1>
    </Layout>
  );
}

export const getServerSideProps = async (context) => {
  let res = await fetch(
    `http://localhost:3000/api/product/${context.query.id}`
    //`http://vladreact.me/server/product/${context.query.id}`
  );

  let [data] = await res.json();
  return {
    props: {
      product: data,
    },
  };
};
