import Link from "next/link";

export default function MobileMenu() {
  return (
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
  );
}
