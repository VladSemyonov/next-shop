import '../styles/globals.css'
import '../public/css/main.css'
import '../public/css/plugins.css'
import { useState, useEffect, useMemo, createContext } from 'react'
const AppContext = createContext();
export { AppContext };

function MyApp({ Component, pageProps }) {
  const [bascket, setBascket] = useState([]);
  const [user, setUser] = useState({ role: "user", token: "" });
  const [login, setLogin] = useState(false);
  const [summaryPrice, setSummaryPrice] = useState(0);
  const [showAlert, setShowAlert] = useState({ opacity: 0, text: "" })

  useEffect(() => {
    if (localStorage.filmsToken) {
      setUser({
        role: jwtDecode(localStorage.filmsToken).user.role,
        token: localStorage.filmsToken,
      });
      setAuthorizationHeader(localStorage.filmsToken);
    }

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

  const logIn = () => {
    setLogin(true);
  };

  function setAlert(text) {
    setShowAlert({ opacity: 1, text: text })
    setTimeout(() => setShowAlert({ opacity: 0, text: text }), 3000)
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
        i._attributes.id === id ? { ...i, amountBuy: Number(n) } : i
      )
    );
  }

  function removeBasket() {
    setBascket([])
  }

  return (<AppContext.Provider
    value={{
      deleteFromBascket: deleteFromBascket,
      addToBascket: addToBascket,
      bascket: bascket,
      changeAmount: changeAmount,
      removeBasket: removeBasket,
      summaryPrice: summaryPrice,
      loginStatus: login,
      alert: setAlert
    }}
  ><Component {...pageProps} />
  </AppContext.Provider>
  )
}

export default MyApp
