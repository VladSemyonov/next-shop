import { useEffect, useState, useContext } from "react";
import { AppContext } from "../../../pages/_app";
import Link from "next/link";
import Image from "next/image";

const TopNavigation = () => {
  const [showMenu, setShowMenu] = useState("none");
  const [searchValue, setSearchValue] = useState("");
  const { summaryPrice, bascket, deleteFromBascket } = useContext(AppContext);
  const [navbarTop, setNavbarTop] = useState(0);
  const [categories, setCategoies] = useState({});

  useEffect(() => {
    async function fetchData() {
      let res = await fetch("https://teemo.vercel.app/api/categories");
      console.log(res);
      let categories = await res.json();
      setCategoies(res);
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
    if (showMenu === "block") {
      window.addEventListener("click", setMenu);
      return () => window.removeEventListener("click", setMenu);
    }
  }, [showMenu]);

  function setMenu() {
    showMenu === "block" ? setShowMenu("none") : setShowMenu("block");
  }

  function burgerMenuDom(obj) {
    let result = [];
    for (let category of obj) {
      result.push(
        <Link
          href={{
            pathname: "/category/[id]",
            query: { id: category._attributes.id },
          }}
        >
          <li
            onClick={() => setShowMenu("none")}
            className="burger"
            key={category}
            style={{
              height: "35px",
              fontSize: "20px",
              padding: "0 2rem",
              position: "relative",
            }}
          >
            {category._text}
          </li>
        </Link>
      );
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
                <span className="my-logo">
                  <Link href="/">Teemo</Link>
                </span>
              </div>
              <div className="col-lg-5">
                <div className="header-search-block">
                  <input
                    type="text"
                    placeholder="Искать в магазине"
                    onInput={(event) => setSearchValue(event.target.value)}
                  />
                  <Link href={`/search/${searchValue}`}>Искать</Link>
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
            <div className="row align-items-center">
              <div className="col-lg-3">
                <nav className="category-nav   ">
                  <div>
                    <a
                      className="category-trigger"
                      style={{ cursor: "pointer" }}
                      onClick={setMenu}
                    >
                      <i className="fa fa-bars" />
                      Выбрать категории
                    </a>
                    <ul
                      style={{
                        display: showMenu,
                        position: "absolute",
                        width: "100%",
                        background: "white",
                        border: "1px solid lightgrey",
                      }}
                    >
                      {burgerMenuDom(categories)}
                    </ul>
                  </div>
                </nav>
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
      <div className="site-mobile-menu">
        <header className="mobile-header d-block d-lg-none pt--10 pb-md--10">
          <div className="container">
            <div className="row align-items-sm-end align-items-center">
              <div className="col-md-4 col-7"></div>
              <div className="col-md-5 order-3 order-md-2">
                <nav className="category-nav">
                  <div>
                    <a href="#" className="category-trigger">
                      <i className="fa fa-bars" />
                      Выбрать категорию
                    </a>
                    <ul className="category-menu"></ul>
                  </div>
                </nav>
              </div>
              <div className="col-md-3 col-5  order-md-3 text-right">
                <div className="mobile-header-btns header-top-widget">
                  <ul className="header-links">
                    <li className="sin-link">
                      <Link href="/" className="cart-link link-icon" passHref>
                        <i className="ion-bag"></i>
                      </Link>
                    </li>
                    <li className="sin-link">
                      <a
                        href="#"
                        className="link-icon hamburgur-icon off-canvas-btn"
                      >
                        <i className="ion-navicon" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </header>
        <aside className="off-canvas-wrapper">
          <div className="btn-close-off-canvas">
            <i className="ion-android-close" />
          </div>
          <div className="off-canvas-inner">
            <div className="search-box offcanvas">
              <form>
                <input type="text" placeholder="Search Here" />
                <button className="search-btn">
                  <i className="ion-ios-search-strong" />
                </button>
              </form>
            </div>
            <div className="mobile-navigation">
              <nav className="off-canvas-nav">
                <ul className="mobile-menu main-mobile-menu">
                  <li>
                    <a href="contact.html">Contact</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
};

export default TopNavigation;
