import React from 'react'

export default function Footer(){

let year = new Date()

    return(
        <footer className="site-footer mt--30">
            {/* <div className="container">
                <div className="row justify-content-between  section-padding">
                    <div className=" col-xl-3 col-lg-4 col-sm-6">
                        <div className="single-footer pb--40">
                            <div className="brand-footer footer-title">
                                <img src="" alt=""/>
                            </div>
                            <div className="footer-contact">
                                <p><span className="label">Address:</span><span className="text">Example Street 98, HH2 BacHa, New
                                    York,
                                    USA</span></p>
                                <p><span className="label">Phone:</span><span className="text">+18088 234 5678</span>
                                </p>
                                <p><span className="label">Email:</span><span className="text">suport@hastech.com</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className=" col-xl-3 col-lg-2 col-sm-6">
                        <div className="single-footer pb--40">
                            <div className="footer-title">
                                <h3>Information</h3>
                            </div>
                            <ul className="footer-list normal-list">
                                <li><a href="">Prices drop</a></li>
                                <li><a href="">New products</a></li>
                                <li><a href="">Best sales</a></li>
                                <li><a href="">Contact us</a></li>
                                <li><a href="">Sitemap</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className=" col-xl-3 col-lg-2 col-sm-6">
                        <div className="single-footer pb--40">
                            <div className="footer-title">
                                <h3>Extras</h3>
                            </div>
                            <ul className="footer-list normal-list">
                                <li><a href="">Delivery</a></li>
                                <li><a href="">About Us</a></li>
                                <li><a href="">Stores</a></li>
                                <li><a href="">Contact us</a></li>
                                <li><a href="">Sitemap</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className=" col-xl-3 col-lg-4 col-sm-6">
                        <div className="footer-title">
                            <h3>Newsletter Subscribe</h3>
                        </div>
                        <div className="newsletter-form mb--30">
                            <form>
                                <input type="email" className="form-control"
                                       placeholder="Enter Your Email Address Here..."/>
                                    <button className="btn btn--primary w-100">Subscribe</button>
                            </form>
                        </div>
                        <div className="social-block">
                            <h3 className="title">STAY CONNECTED</h3>
                            <ul className="social-list list-inline">
                                <li className="single-social facebook"><a href=""><i
                                    className="ion ion-social-facebook"></i></a>
                                </li>
                                <li className="single-social twitter"><a href=""><i
                                    className="ion ion-social-twitter"></i></a></li>
                                <li className="single-social google"><a href=""><i
                                    className="ion ion-social-googleplus-outline"></i></a></li>
                                <li className="single-social youtube"><a href=""><i
                                    className="ion ion-social-youtube"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div> */}
            <div className="footer-bottom">
                <div className="container">
                    <p className="copyright-heading">
                        Сервис для клиента - превыше всего
                        </p>
                    <a href="#" className="payment-block">
                        <img src="" alt=""/>
                    </a>
                    <p className="copyright-text">Copyright © {year.getFullYear()} <a href="#" className="author">Teemo</a>. Все права защищены.
                        <br/>
                            Разработал - Владислав Семенов</p>
                </div>
            </div>
        </footer>
    )
}