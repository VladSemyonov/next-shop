import React from "react";
import Image from "next/image";

export default function Footer() {
  let year = new Date();

  return (
    <footer className="site-footer mt--30">
      <div className="footer-bottom">
        <div className="container">
          <p className="copyright-heading">
            Сервис для клиента - превыше всего
          </p>
          <p className="copyright-text">
            Copyright © {year.getFullYear()}{" "}
            <a href="#" className="author">
              Teemo
            </a>
            . Все права защищены.
            <br />
            Разработал - Владислав Семенов
          </p>
        </div>
      </div>
    </footer>
  );
}
