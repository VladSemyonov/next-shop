import { useEffect, useState, useContext } from "react";
import { AppContext } from "../../../pages/_app";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import MobileMenu from "./MobileMenu";

const TopNavigation = () => {
  const [showMenu, setShowMenu] = useState("none");
  const [searchValue, setSearchValue] = useState("");
  const { summaryPrice, bascket, deleteFromBascket } = useContext(AppContext);
  const [navbarTop, setNavbarTop] = useState(0);
  const [categories, setCategoies] = useState({});
  const [showChild, setShowChild] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      let res = await fetch("http://localhost:3000/api/categories");
      let categories = await res.json();
      setCategoies(categories);
    }
    fetchData();
    let prevScrollpos = window.pageYOffset;
    window.onscroll = () => {
      const currentScrollPos = window.pageYOffset;
      if (prevScrollpos < currentScrollPos && currentScrollPos > 90) {
        setNavbarTop(-130);
      } else {
        setNavbarTop(0);
      }
      prevScrollpos = currentScrollPos;
    };
  }, []);

  useEffect(() => {
    if (showMenu === "flex") {
      window.addEventListener("click", setMenu);
      return () => window.removeEventListener("click", setMenu);
    }
  }, [showMenu]);

  function setMenu() {
    showMenu === "flex" ? setShowMenu("none") : setShowMenu("flex");
  }

  function burgerMenuDom(obj) {
    let result = [];
    for (let category in obj) {
      result.push(
        <li
          onClick={() => setShowMenu("none")}
          className="burger"
          key={category}
          onMouseOver={() => setShowChild(category)}
        >
          <h5>{category}</h5>
        </li>
      );
    }
    return result;
  }

  function childMenu(obj) {
    let result = [];
    for (let category in obj) {
      if (obj[category].length > 0) {
        let burger = [];
        obj[category].map((subCategory) =>
          burger.push(
            <div className="child-item">
              <Link
                className={`child-item-link`}
                href={`/category/${subCategory._attributes.id}`}
              >
                {subCategory._text}
              </Link>
            </div>
          )
        );
        result.push(
          <div
            className="burger-child"
            style={{ display: category === showChild ? "flex" : "none" }}
          >
            {burger}
          </div>
        );
      }
    }
    return result;
  }

  return (
    <>
      <div className="site-header d-none d-lg-block pt--90">
        <div
          className="header-bottom pb--10 fixed-top bg-light border-top border-success"
          style={{
            transition: "all .25s ease-in-out",
            top: `${navbarTop}px`,
          }}
          id="nav-bar"
        >
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-3 d-flex justify-content-center">
                <Link href="/">
                  <span className="my-logo">Teemo</span>
                </Link>
              </div>
              <div className="col-lg-5">
                <div className="header-search-block d-flex">
                  <input
                    type="text"
                    placeholder="Искать в магазине"
                    onInput={(event) => setSearchValue(event.target.value)}
                  />
                  <button
                    className="btn btn-success"
                    disabled={searchValue.length == 0}
                    onClick={() =>
                      router.replace({
                        pathname: "/search",
                        query: { selector: searchValue },
                      })
                    }
                  >
                    Искать
                  </button>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="main-navigation flex-lg-right">
                  <div className="cart-widget">
                    <div className="cart-block">
                      <div className="cart-total">
                        {bascket.length > 0 && (
                          <span className="text-number">{bascket.length}</span>
                        )}
                        <span className="text-item">Корзина</span>
                        <span className="price">
                          {summaryPrice} грн
                          <i className="fas fa-chevron-down" />
                        </span>
                      </div>
                      <div className="cart-dropdown-block">
                        {bascket.length > 0 ? (
                          <>
                            {bascket.map((i, index) => {
                              return (
                                <div
                                  key={index}
                                  className=" single-cart-block "
                                >
                                  <div className="cart-product">
                                    <div className="image">
                                      <Link
                                        href={`/product/${i._attributes.id}`}
                                        passHref
                                      >
                                        <Image
                                          width="100"
                                          height="150"
                                          layout="responsive"
                                          src={i.picture._text}
                                          alt=""
                                        />
                                      </Link>
                                    </div>
                                    <div className="content">
                                      <h3 className="title">
                                        <Link
                                          href={`/product/${i._attributes.id}`}
                                        >
                                          {i.name._text}
                                        </Link>
                                      </h3>
                                      <p className="price">
                                        {i.amountBuy} × {i.price._text} грн
                                      </p>
                                      <button
                                        className="cross-btn"
                                        onClick={() =>
                                          deleteFromBascket(i._attributes.id)
                                        }
                                      >
                                        <i className="fas fa-times" />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                            <div className=" single-cart-block ">
                              <Link href="/bascket" passHref>
                                <div className="col btn btn-outline-success d-flex justify-content-around">
                                  <span>Перейти в корзину</span>
                                  <i className="fas fa-chevron-right" />
                                </div>
                              </Link>
                            </div>
                          </>
                        ) : (
                          <div className="d-flex justify-content-center">
                            <h3>Корзина пуста</h3>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="header-middle pt--10 pb--10">
          <div className="container">
            <div className="row align-items-center position-relative">
              <div className="col-lg-3" style={{ padding: "0" }}>
                <nav className="category-nav">
                  <div>
                    <span
                      className="category-trigger"
                      style={{ cursor: "pointer" }}
                      onClick={setMenu}
                    >
                      <i className="fa fa-bars" />
                      Выбрать категории
                    </span>
                  </div>
                </nav>
              </div>
              <div
                style={{
                  display: showMenu,
                  position: "absolute",
                  width: "100%",
                  background: "white",
                  border: "2px solid grey",
                  height: "fit-content",
                  top: "100%",
                  zIndex: "999",
                }}
                className="row"
              >
                <ul
                  className="col-3"
                  style={{
                    border: "1px solid lightgrey",
                    margin: 0,
                  }}
                >
                  {burgerMenuDom(categories)}
                </ul>
                <div className="col-9">{childMenu(categories)}</div>
              </div>
              <div className="col-lg-3">
                <div className="header-phone ">
                  <div className="icon">
                    <i className="fas fa-headphones-alt" />
                  </div>
                  <div className="text">
                    <p>Поддержка 24/7</p>
                    <p className="font-weight-bold number">+01-202-555-0181</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="main-navigation flex-lg-right">
                  <ul className="main-menu menu-right ">
                    <li className="menu-item">
                      <Link href="/contacts">Контакты</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MobileMenu />
    </>
  );
};

export default TopNavigation;
