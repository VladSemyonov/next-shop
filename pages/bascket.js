import React, { useContext, useState, useEffect, useMemo } from "react";
import { AppContext } from "./_app";
import InputMask from "react-input-mask";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

export default function Bascket() {
  const router = useRouter();
  const [res, setRes] = useState({ status: false, res: null });
  const [errors, setErrors] = useState();
  const [sendData, setSendData] = useState({
    address: "",
    name: "",
    phone: "",
    email: "",
    sumPrice: 0,
    emailChecked: false,
  });
  const { bascket, deleteFromBascket, changeAmount, removeBasket, alert } =
    useContext(AppContext);
  const input = React.useRef();

  useEffect(() => {
    bascket.length === 0 && router.replace("/");
  });

  useEffect(() => {
    if (res?.res === 200)
      alert({
        opacity: 1,
        text: "Ваш заказ успешно отправлен, к сожалению Vercel не поддерживает nodemailer(",
        status: res.res,
      });
    else if (res?.res === 400)
      alert({
        opacity: 1,
        text: "Произошла ошибка сервера",
        status: res.res,
      });
  }, [res.res]);

  function createOrder(e) {
    e.preventDefault();
    const errors = validate(sendData);
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      setRes({ status: true, res: 200 });
      setSendData({
        ...sendData,
        address: "",
        name: "",
        phone: "",
        email: "",
      });
      removeBasket();
    }
  }

  const validate = (data) => {
    const errors = {};
    if (sendData.emailChecked && !sendData.email)
      errors.email = "Введите email";
    if (!data.address) errors.address = "Введите полный адрес";
    if (!data.name) errors.name = "Введите полные данные";
    if (!data.phone) errors.phone = "Введите номер телефона";

    return errors;
  };

  useEffect(() => {
    setRes({ status: false, res: null });
  }, []);

  useMemo(() => {
    let count = 0;
    setSendData({
      ...sendData,
      items: bascket.map((i) => {
        count += i.amountBuy * Number(i.price._text);
        return {
          product: i.name._text,
          amount: i.amountBuy,
          sumPrice: i.amountBuy * Number(i.price._text),
          shop: i.shop,
          paided: false,
        };
      }),
      sumPrice: count,
    });
  }, [bascket]);

  function setData(event) {
    let name = event.target.name;
    setSendData({ ...sendData, [name]: event.target.value });
  }

  return (
    <div className="cart_area cart-area-padding  ">
      <div className="container">
        <div className="page-section-title">
          <h1>Shopping Cart</h1>
        </div>
        <div className="row">
          <div className="col-12">
            {res.status ? (
              res.res === 200 ? (
                <h1 style={{ color: "green" }}>Thank u!</h1>
              ) : (
                <h1 style={{ color: "red" }}>error</h1>
              )
            ) : (
              <div className="cart-table table-responsive mb--40">
                <table className="table">
                  <tbody>
                    {bascket.map((i, index) => (
                      <tr key={index}>
                        <td className="pro-remove">
                          <button
                            onClick={() => deleteFromBascket(i._attributes.id)}
                          >
                            <i className="far fa-trash-alt" />
                          </button>
                        </td>
                        <td className="pro-thumbnail">
                          <Link
                            href={{
                              pathname: "/product/[id]",
                              query: { id: i._attributes.id },
                            }}
                            passHref
                          >
                            <Image
                              width="100"
                              height="150"
                              src={i.picture._text}
                              alt="Product"
                            />
                          </Link>
                        </td>
                        <td className="pro-title">
                          <Link
                            href={{
                              pathname: "/product/[id]",
                              query: { id: i._attributes.id },
                            }}
                          >
                            {i.name._text}
                          </Link>
                        </td>
                        <td className="pro-price">
                          <span>{i.price._text} грн</span>
                        </td>
                        <td style={{ width: "120px" }} className={"p-0"}>
                          <div
                            className="d-flex  justify-content-around
                                                     align-items-center h-100"
                          >
                            <span
                              style={{
                                background: "red",
                                color: "white",
                                fontWeight: "bold",
                                width: "20px",
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                changeAmount(i._attributes.id, i.amountBuy - 1)
                              }
                            >
                              -
                            </span>
                            <div className="count-input-block">
                              <input
                                ref={input}
                                onFocus={() => input.current.select()}
                                onChange={(event) =>
                                  changeAmount(
                                    i._attributes.id,
                                    event.target.value
                                  )
                                }
                                type="number"
                                className=" form-control text-center"
                                value={i.amountBuy}
                              />
                            </div>
                            <span
                              style={{
                                background: "green",
                                color: "white",
                                fontWeight: "bold",
                                width: "20px",
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                changeAmount(i._attributes.id, i.amountBuy + 1)
                              }
                            >
                              {" "}
                              +
                            </span>
                          </div>
                        </td>
                        <td
                          className=" pro-subtotal"
                          style={{ width: "100px" }}
                        >
                          <span>{i.price._text * i.amountBuy} грн</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className={"w-100 d-flex justify-content-end"}>
                  <span
                    style={{ right: "0", color: "black", fontSize: "1.25rem" }}
                    className={"p-2"}
                  >
                    Всего к оплате: {sendData.sumPrice} грн
                  </span>
                </div>
              </div>
            )}
            <form>
              <div className=" mb-3">
                <label className=" form-label">Имя и фамилия</label>
                <input
                  onInput={setData}
                  name={"name"}
                  type={"text"}
                  value={sendData.name}
                  placeholder={" Введите Имя и Фамилию заказчика"}
                  className=" form-control"
                />
                <p style={{ color: " red", height: "20px" }}>{errors?.name}</p>
              </div>
              <div className=" mb-3">
                <label className={" form-label"}>
                  Отделение новой почты или адресс доставки
                </label>
                <input
                  onInput={setData}
                  name={"address"}
                  type={"text"}
                  value={sendData.address}
                  placeholder={" Введите адрес доставки"}
                  className={" form-control"}
                />
                <p style={{ color: " red", height: "20px" }}>
                  {errors?.address}
                </p>
              </div>
              <div className=" mb-3">
                <label className={" form-label"}>
                  Отправить мне копию заказа на электронную почту
                </label>
                <input
                  className={"ml-4"}
                  type={"checkbox"}
                  checked={sendData.emailChecked}
                  onChange={() =>
                    setSendData({
                      ...sendData,
                      emailChecked: !sendData.emailChecked,
                    })
                  }
                />
                <input
                  onInput={setData}
                  name={"email"}
                  type={"text"}
                  value={sendData.email}
                  placeholder={" Введите email"}
                  className={" form-control"}
                />
                <p style={{ color: " red", height: "20px" }}>{errors?.email}</p>
              </div>
              <div className={" mb-3"}>
                <label className={" rom-label"}>Номер телефона</label>
                <InputMask
                  onInput={setData}
                  name={"phone"}
                  className={" form-control"}
                  mask="+38 (099) 999-9999"
                  alwaysShowMask={true}
                />
                <p style={{ color: " red", height: "20px" }}>{errors?.phone}</p>
                <button
                  className={" btn btn-success"}
                  onClick={(e) => createOrder(e)}
                >
                  заказать
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
