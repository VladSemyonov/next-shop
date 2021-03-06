import "../public/css/main.css";
import "../public/css/plugins.css";
import "../styles/globals.css";
import "../src/utils.js";
import { useState, useEffect, useMemo, createContext } from "react";
const AppContext = createContext();
export { AppContext };
import AlertToBasket from "../src/components/AlertToBasket";

function MyApp({ Component, pageProps }) {
  const [bascket, setBascket] = useState([]);
  const [summaryPrice, setSummaryPrice] = useState(0);
  const [categories, setCategoies] = useState({});
  const [showAlert, setShowAlert] = useState({ opacity: 0, text: "" });

  useEffect(() => {
    async function fetchData() {
      let res = await fetch("http://localhost:3000/api/categories");
      let categories = await res.json();
      setCategoies(categories);
    }
    fetchData();
  }, []);

  useMemo(() => {
    setSummaryPrice(
      bascket.reduce(
        (acc, value) =>
          Number(acc) + Number(value.amountBuy * value.price._text),
        [0]
      )
    );
  }, [bascket]);

  function setAlert(obj) {
    setShowAlert(obj);
    setTimeout(() => setShowAlert({ ...obj, opacity: 0 }), 3000);
  }

  function addToBascket(item) {
    let arr = [].concat(bascket);
    if (arr.length > 0) {
      let counter = 0;
      for (let i = 0; i < bascket.length; i++) {
        if (arr[i]._attributes.id === item._attributes.id) {
          counter++;
          arr[i].amountBuy += 1;
        }
      }
      counter === 0 && arr.push(item);
    } else arr.push(item);
    setBascket(arr);
  }

  function deleteFromBascket(id) {
    setBascket(bascket.filter((item) => item._attributes.id !== id));
  }

  function changeAmount(id, n) {
    setBascket(
      bascket.map((i) =>
        i._attributes.id === id && n >= 0 ? { ...i, amountBuy: Number(n) } : i
      )
    );
  }

  function removeBasket() {
    setBascket([]);
  }

  return (
    <AppContext.Provider
      value={{
        deleteFromBascket: deleteFromBascket,
        addToBascket: addToBascket,
        bascket: bascket,
        changeAmount: changeAmount,
        removeBasket: removeBasket,
        summaryPrice: summaryPrice,
        alert: setAlert,
        categories: categories,
      }}
    >
      <AlertToBasket trigger={showAlert} />
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}

export default MyApp;
