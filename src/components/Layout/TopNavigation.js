import { useEffect, useState, useContext } from "react";
import { AppContext } from "../../../pages/_app";
import Link from "next/link";

const TopNavigation = () => {
  const [showMenu, setShowMenu] = useState("none");
  const [searchValue, setSearchValue] = useState("");
  const { summaryPrice, bascket, deleteFromBascket } = useContext(AppContext);
  const [navbarTop, setNavbarTop] = useState(0);
  const [categories, setCategoies] = useState({});

  useEffect(() => {
    async function fetchData() {
      let res = await fetch("http://vladreact.me/server/categories");
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
    for (let category in obj) {
      result.push(
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
          {category}
          {obj[category].length > 0 &&
            (function () {
              let burger = [];
              obj[category].map((subCategory) =>
                burger.push(
                  <div>
                    <Link href={`/category/${subCategory._attributes.id}`}>
                      {subCategory._text}
                    </Link>
                  </div>
                )
              );
              return <ul className="burger-child">{burger}</ul>;
            })()}{" "}
        </li>
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
                          bascket.map((i, index) => {
                            return (
                              <div key={index} className=" single-cart-block ">
                                <div className="cart-product">
                                  <Link
                                    href={`/product/${i._attributes.id}`}
                                    className="image"
                                  >
                                    <img src={i.picture._text} alt="" />
                                  </Link>
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
                                <div className=" single-cart-block ">
                                  <div className="col">
                                    <Link
                                      href="/bascket"
                                      className="btn btn-outline-success d-flex justify-content-around"
                                    >
                                      <span>Перейти в корзину</span>
                                      <i className="fas fa-chevron-right" />
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            );
                          })
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
              <div className="col-md-4 col-7">
                <a href="/" className="site-brand">
                  <img src="" alt="" />
                </a>
              </div>
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
                      <a href="/" className="cart-link link-icon">
                        <i className="ion-bag"></i>
                      </a>
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
                  <li className="menu-item-has-children">
                    <a href="#">Home</a>
                    <ul className="sub-menu">
                      <li>
                        <a href="/">Home One</a>
                      </li>
                      <li>
                        <a href="/">Home Two</a>
                      </li>
                      <li>
                        <a href="/">Home Three</a>
                      </li>
                      <li>
                        <a href="/">Home Four</a>
                      </li>
                      <li>
                        <a href="/">Home Five</a>
                      </li>
                    </ul>
                  </li>
                  <li className="menu-item-has-children">
                    <a href="#">Blog</a>
                    <ul className="sub-menu">
                      <li className="menu-item-has-children">
                        <a href="#">Blog Grid</a>
                        <ul className="sub-menu">
                          <li>
                            <a href="/">Full Widh (Default)</a>
                          </li>
                          <li>
                            <a href="/">left Sidebar</a>
                          </li>
                          <li>
                            <a href="/">Right Sidebar</a>
                          </li>
                        </ul>
                      </li>
                      <li className="menu-item-has-children">
                        <a href="#">Blog List</a>
                        <ul className="sub-menu">
                          <li>
                            <a href="/">Full Widh (Default)</a>
                          </li>
                          <li>
                            <a href="/">left Sidebar</a>
                          </li>
                          <li>
                            <a href="/">Right Sidebar</a>
                          </li>
                        </ul>
                      </li>
                      <li className="menu-item-has-children">
                        <a href="#">Blog Details</a>
                        <ul className="sub-menu">
                          <li>
                            <a href="/">Image Format (Default)</a>
                          </li>
                          <li>
                            <a href="/">Gallery Format</a>
                          </li>
                          <li>
                            <a href="/">Audio Format</a>
                          </li>
                          <li>
                            <a href="/">Video Format</a>
                          </li>
                          <li>
                            <a href="/">left Sidebar</a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li className="menu-item-has-children">
                    <a href="#">Shop</a>
                    <ul className="sub-menu">
                      <li className="menu-item-has-children">
                        <a href="#">Shop Grid</a>
                        <ul className="sub-menu">
                          <li>
                            <a href="shop-grid.html">Fullwidth</a>
                          </li>
                          <li>
                            <a href="shop-grid-left-sidebar.html">
                              left Sidebar
                            </a>
                          </li>
                          <li>
                            <a href="shop-grid-right-sidebar.html">
                              Right Sidebar
                            </a>
                          </li>
                        </ul>
                      </li>
                      <li className="menu-item-has-children">
                        <a href="#">Shop List</a>
                        <ul className="sub-menu">
                          <li>
                            <a href="shop-list.html">Fullwidth</a>
                          </li>
                          <li>
                            <a href="shop-list-left-sidebar.html">
                              left Sidebar
                            </a>
                          </li>
                          <li>
                            <a href="shop-list-right-sidebar.html">
                              Right Sidebar
                            </a>
                          </li>
                        </ul>
                      </li>
                      <li className="menu-item-has-children">
                        <a href="#">Product Details 1</a>
                        <ul className="sub-menu">
                          <li>
                            <a href="product-details.html">
                              Product Details Page
                            </a>
                          </li>
                          <li>
                            <a href="product-details-affiliate.html">
                              Product Details Affiliate
                            </a>
                          </li>
                          <li>
                            <a href="product-details-group.html">
                              Product Details Group
                            </a>
                          </li>
                          <li>
                            <a href="product-details-variable.html">
                              Product Details Variables
                            </a>
                          </li>
                        </ul>
                      </li>
                      <li className="menu-item-has-children">
                        <a href="#">Product Details 2</a>
                        <ul className="sub-menu">
                          <li>
                            <a href="product-details-left-thumbnail.html">
                              left Thumbnail
                            </a>
                          </li>
                          <li>
                            <a href="product-details-right-thumbnail.html">
                              Right Thumbnail
                            </a>
                          </li>
                          <li>
                            <a href="product-details-left-gallery.html">
                              Left Gallery
                            </a>
                          </li>
                          <li>
                            <a href="product-details-right-gallery.html">
                              Right Gallery
                            </a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li className="menu-item-has-children">
                    <a href="#">Pages</a>
                    <ul className="sub-menu">
                      <li>
                        <a href="cart.html">Cart</a>
                      </li>
                      <li>
                        <a href="checkout.html">Checkout</a>
                      </li>
                      <li>
                        <a href="compare.html">Compare</a>
                      </li>
                      <li>
                        <a href="wishlist.html">Wishlist</a>
                      </li>
                      <li>
                        <a href="login-register.html">Login Register</a>
                      </li>
                      <li>
                        <a href="my-account.html">My Account</a>
                      </li>
                      <li>
                        <a href="order-complete.html">Order Complete</a>
                      </li>
                      <li>
                        <a href="faq.html">Faq</a>
                      </li>
                      <li>
                        <a href="contact-2.html">contact 02</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="contact.html">Contact</a>
                  </li>
                </ul>
              </nav>
            </div>
            <nav className="off-canvas-nav">
              <ul className="mobile-menu menu-block-2">
                <li className="menu-item-has-children">
                  <a href="#">
                    Currency - USD $ <i className="fas fa-angle-down"></i>
                  </a>
                  <ul className="sub-menu">
                    <li>
                      <a href="cart.html">USD $</a>
                    </li>
                    <li>
                      <a href="checkout.html">EUR €</a>
                    </li>
                  </ul>
                </li>
                <li className="menu-item-has-children">
                  <a href="#">
                    Lang - Eng<i className="fas fa-angle-down"></i>
                  </a>
                  <ul className="sub-menu">
                    <li>Eng</li>
                    <li>Ban</li>
                  </ul>
                </li>
                <li className="menu-item-has-children">
                  <a href="#">
                    My Account <i className="fas fa-angle-down"></i>
                  </a>
                  <ul className="sub-menu">
                    <li>
                      <a href="">My Account</a>
                    </li>
                    <li>
                      <a href="">Order History</a>
                    </li>
                    <li>
                      <a href="">Transactions</a>
                    </li>
                    <li>
                      <a href="">Downloads</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
            <div className="off-canvas-bottom">
              <div className="contact-list mb--10">
                <a href="" className="sin-contact">
                  <i className="fas fa-mobile-alt"></i>(12345) 78790220
                </a>
                <a href="" className="sin-contact">
                  <i className="fas fa-envelope"></i>examle@handart.com
                </a>
              </div>
              <div className="off-canvas-social">
                <a href="#" className="single-icon">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="single-icon">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="single-icon">
                  <i className="fas fa-rss"></i>
                </a>
                <a href="#" className="single-icon">
                  <i className="fab fa-youtube"></i>
                </a>
                <a href="#" className="single-icon">
                  <i className="fab fa-google-plus-g"></i>
                </a>
                <a href="#" className="single-icon">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
};

export default TopNavigation;
