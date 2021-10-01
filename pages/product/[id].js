import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/dist/client/router";
import { AppContext } from "../_app";
import Layout from "../../src/components/Layout/Layout";

export default function Product({ product }) {
  const router = useRouter();
  const { id } = router.query;
  const { addToBascket } = useContext(AppContext);
  const [middleScore, setMiddleScore] = useState(0);
  const [leftCol, setLeftCol] = useState([]);
  const [rightCol, setRightCol] = useState([]);

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
            <img src={product.picture._text} alt={product.name._text} />
            <div className="add-cart-btn mt--40 d-flex justify-content-center">
              <button
                className="btn font-bold"
                onClick={() => addToBascket(product)}
              >
                <span className="text-center align-middle">
                  Добавить в корзину
                </span>
              </button>
            </div>
          </div>
          <div className="col-lg-7 pl--50">
            <article className="product-details-article">
              <h4 className="sr-only">Product Summery</h4>
              <p>{product.description._text}</p>
            </article>
          </div>
        </div>
        <div className={"row mt--30"}>
          <div className="product-details-info pl-lg--30 ">
            <h3 className="product-title">{product.name._text}</h3>
            <span className="price-new">
              {product.price._text} {product.currencyId._text}
            </span>
            <div className="row">
              <ul className="col-6 list-unstyled">
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
              <ul className="col-6 pl--60 list-unstyled">
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
    `http://vladreact.me/server/product/${context.query.id}`
  );
  let [data] = await res.json();

  return {
    props: {
      product: data,
    },
  };
};
