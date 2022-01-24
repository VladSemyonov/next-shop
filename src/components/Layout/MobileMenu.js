import Link from "next/link";
import { useEffect, useState, useContext } from "react";
import { AppContext } from "../../../pages/_app";

export default function MobileMenu() {
  const [showMenu, setShowMenu] = useState("none");
  const { bascket, categories } = useContext(AppContext);
  const [navbarTop, setNavbarTop] = useState(0);
  const [showChild, setShowChild] = useState("");

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
        <div className="card" key={category}>
          <span onClick={() => setShowChild(category)}>{category}</span>
          <div style={{ display: showChild === category ? "block" : "none" }}>
            <div className="card-body">{childMenu(categories[category])}</div>
          </div>
        </div>
      );
    }
    return result;
  }

  function childMenu(obj) {
    let result = obj.map(({ _text, _attributes }) => (
      <Link key={_text} href={_text}>
        {_text}
      </Link>
    ));
    return result;
  }

  return (
    <div className="site-mobile-menu">
      <header className="mobile-header d-block d-lg-none pt--10 pb-md--10">
        <div className="container position-relative">
          <div className="row align-items-center">
            <div className="col-3 d-flex justify-content-center">
              <Link href="/">
                <span className="my-logo">Teemo</span>
              </Link>
            </div>
            <div className="col-md-5 order-3 order-md-2">
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
            <div className="col-md-3 col-5  order-md-3 text-right">
              <div className="mobile-header-btns header-top-widget">
                <ul className="header-links">
                  <li className="sin-link">
                    <Link href="/" className="cart-link link-icon" passHref>
                      <div>
                        <i className="ion-bag"></i>
                        {bascket.length > 0 && (
                          <span className="text-number">{bascket.length}</span>
                        )}
                      </div>
                    </Link>
                  </li>
                  <li className="sin-link">
                    <span
                      onClick={setMenu}
                      className="link-icon hamburgur-icon off-canvas-btn"
                    >
                      <i className="ion-navicon" />
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div
            id="accordion"
            style={{
              border: "1px solid lightgrey",
              margin: 0,
            }}
          >
            {burgerMenuDom(categories)}
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
  );
}
