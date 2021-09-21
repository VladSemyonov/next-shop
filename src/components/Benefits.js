import React from 'react'

export default function Benefits() {


    return(
        <section className="mb--30">
            <div className="container">
                <div className="row">
                    <div className="col-xl-3 col-md-6 mt--30">
                        <div className="feature-box h-100">
                            <div className="icon">
                                <i className="fas fa-shipping-fast"></i>
                            </div>
                            <div className="text">
                                <h5>Доставка бесплатно</h5>
                                <p> для заказов $500</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-md-6 mt--30">
                        <div className="feature-box h-100">
                            <div className="icon">
                                <i className="fas fa-redo-alt"></i>
                            </div>
                            <div className="text">
                                <h5>Возврат денег</h5>
                                <p>100% money back</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-md-6 mt--30">
                        <div className="feature-box h-100">
                            <div className="icon">
                                <i className="fas fa-piggy-bank"></i>
                            </div>
                            <div className="text">
                                <h5>Оплата любым способом</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-md-6 mt--30">
                        <div className="feature-box h-100">
                            <div className="icon">
                                <i className="fas fa-life-ring"></i>
                            </div>
                            <div className="text">
                                <h5>Вопросы и консультация</h5>
                                <p> + 0123.4567.89</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}