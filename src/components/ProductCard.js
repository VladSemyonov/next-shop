import { useContext, useEffect, useState } from 'react'
import  Link  from "next/link";
import  {AppContext} from "../../pages/_app";

export default function ProductCard({ item, size }) {

    const [sizes, setSizes] = useState({
        font: "18px",
        col: "4",
        img: "250px"
    })
    const { addToBascket, alert } = useContext(AppContext)

    function setAction(i) {
        addToBascket(i)
        alert("Товар добавлен в корзину")
    }

    useEffect(() => {
        switch (size) {
            case "normal":
                setSizes(
                    {
                        font: "18px",
                        col: "4",
                        img: "250px"
                    })
                break;
            case "small":
                setSizes(
                    {
                        font: "12px",
                        col: "3",
                        img: "200px"
                    })
                break;
        }
    }, [size])

    return (
        <div className={`col-lg-${sizes.col} col-sm-6`}>
            <div className="product-card">
                <div className="product-grid-content">
                    <div className="product-header">
                        <span style={{ height: "80px" }}><Link style={{ fontSize: size === "small" ? ".8rem" : "1rem" }}
                            href={{
                                pathname: "/product/[id]",
                                query: { id: item._attributes.id }
                            }}>{item.name._text}</Link></span>
                    </div>
                    <div className="product-card--body">
                        <div className="card-image">
                            <Link href={{
                                pathname: "/product/[id]",
                                query: { id: item._attributes.id }
                            }}>
                                <img loading={"lazy"} width={250} height={289} src={item.picture._text}
                                    alt={item.name._text}
                                    style={{
                                        width: sizes.img, height: "auto"
                                    }} />
                            </Link>
                        </div>
                        <div className="price-block">
                            <div className='d-flex align-items-center pl--50'>
                                <span style={{ fontSize: sizes.font }}
                                    className="price">{item.price._text} {item.currencyId._text}</span>
                            </div>
                            <button style={{ fontSize: sizes.font }} onClick={() => setAction(item)}
                                className={'btn btn-outline-success'}>
                                Добавить в корзину
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}