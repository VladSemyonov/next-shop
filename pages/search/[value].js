import {useEffect, useState, useMemo} from "react";
import Products from "../..src/components/Products";

const initObj = {
    price: {
        higher: 0,
        below: 999999,
    },
};

export default function Search(props) {
    const [parames, setParams] = useState({});
    const [items, setItems] = useState();
    const [filteredItems, setFilteredItems] = useState([]);
    const [loading, setLoading] = useState(true)

    const promise1 = () =>{
        aaaaaaa()
            .then(() => fetch(`http://vladreact.me/server/category/${props.match.params.id}`, {
                method: "GET",
            }))
            .then((result) => result.json())
            .then((result) => setItems(result))
            .then(()=> setLoading(false))
    }


    async function promise2() {
        let example = {};
        let filters = await fetch(`http://vladreact.me/server/test/${props.match.params.id}`, {
            method: "GET",
        })
        let filters1 = await filters.json()
        let filters3 = await Object.assign(example, initObj, filters1)
        setParams(filters3)
        let result2 = await fetch(`http://vladreact.me/server/category/${props.match.params.id}`, {
            method: "GET",
        })
        let items = await result2.json()
        setItems(items)
    }


    function aaaaaaa() {
        let example = {};
        return new Promise((resolve, reject) => {
            resolve(fetch(`http://vladreact.me/server/test/${props.match.params.id}`, {
                method: "GET",
            })
                .then((result) => result.json())
                .then((result) => Object.assign(example, initObj, result))
                .then((result) => setParams(result)))
        })
    }

    useEffect(() => {
        setLoading(true)
        if (props.match.path === "/search/:findValue") {
            fetch(
                `http://vladreact.me/server/search/${props.match.params.findValue}`,
                {
                    method: "GET",
                }
            )
                .then((result) => result.json())
                .then((result) => setItems(result));
        }
        if (props.match.path === "/category/:id") {
            promise1();
        }
    }, [props.match.url]);

    useMemo(() => {
        setFilteredItems(items);
    }, [items]);

    useEffect(() => {
        if (parames?.price?.below === "") {
            setParams({...parames, price: {...parames.price, below: 99999}});
        }
        !loading && doFilter1();
    }, [parames]);

    function doFilter1() {
        let arr = [].concat(items);
        let b = arr
            .filter(
                (i) =>
                    Number(i.price._text) >= parames.price.higher &&
                    Number(i.price._text) <= parames.price.below
            )
            .filter((i) => {
                for (let a in parames.country_of_origin) {
                    if (
                        parames.country_of_origin[i.country_of_origin._text]?.doFilter ===
                        true
                    ) {
                        return i;
                    }
                }
            });
        for (let i = 0; i < b.length; i++) {
            try {
                for (let parameter of b[i]?.param) {
                    console.log(parames, parameter)
                    for (let parametrName of parames[parameter._attributes.name]) {
                        if (
                            parametrName.value === parameter._text &&
                            parametrName.doFilter === false
                        ) {
                            b.splice(i, 1);
                            i -= 1;
                        }}
                }
            } catch (e) {
                console.log(e)
            }
        }
        setFilteredItems(b);
    }

    function setFilter(event) {
        let value = event.target.value;
        setParams({
            ...parames,
            country_of_origin: {
                ...parames.country_of_origin,
                [value]: {
                    ...parames.country_of_origin[value],
                    doFilter: !parames.country_of_origin[value].doFilter,
                },
            },
        });
    }

    function createDom(o) {
        let arr = [];
        for (let i in o) {
            arr.push(
                <div
                    key={i}
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "150px",
                    }}
                >
                    <span>{i}</span>
                    <input
                        onChange={setFilter}
                        type={"checkbox"}
                        value={i}
                        checked={o[i].doFilter}
                    />
                </div>
            );
        }
        return arr;
    }

    function setAdvancedFilters(event) {
        let categoryName = event.target.id;
        let paramValue = event.target.value;
        setParams({
            ...parames,
            [categoryName]: parames[categoryName].map((i) =>
                i.value === paramValue ? {...i, doFilter: !i.doFilter} : i
            ),
        });
    }

    function advancedFilters(obj) {
        let result = [];
        for (let category in obj) {
            if (
                category !== "id" &&
                category !== "country_of_origin" &&
                category !== "price"
            ) {
                if (obj[category].length > 1) {
                    result.push(
                        <div key={category}>
                            <div>{category}</div>
                            {obj[category].map((i, index) => (
                                <div
                                    key={index}
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        width: "150px",
                                    }}
                                >
                                    <span>{i.value}</span>
                                    <input
                                        onChange={setAdvancedFilters}
                                        type={"checkbox"}
                                        id={category}
                                        value={i.value}
                                        checked={i.doFilter}
                                    />
                                </div>
                            ))}
                            <hr/>
                        </div>
                    );
                }
            }
        }
        return result;
    }

    function priceFiltering(event) {
        let value = event.target.name;
        let data = event.target.value;
        setParams({...parames, price: {...parames.price, [value]: data}});
    }

    return (
        <main className="inner-page-sec-padding-bottom">
            <div className="container">

                <div className={"row"}>
                    <div className={"col-lg-3"} style={{height: "1000px"}}>
                        <div className={"row mt-2"}>
                            <div className="col-2" style={{height: "fit-content"}}>
                                <div>
                                    <div>Ценна:</div>
                                    От{" "}
                                    <input
                                        onInput={priceFiltering}
                                        name={"higher"}
                                        type={"number"}
                                    />
                                    до{" "}
                                    <input
                                        onInput={priceFiltering}
                                        name={"below"}
                                        type={"number"}
                                    />
                                </div>
                                <div>
                                    Производство:
                                    <div>{createDom(parames.country_of_origin)}</div>
                                </div>
                                <hr/>
                                <div>
                                    <div
                                        style={{
                                            overflow: "auto",
                                            width: "180px",
                                            height: "600px",
                                        }}
                                    >
                                        {advancedFilters(parames)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"col-lg-9"}>
                        <div
                            className={
                                "shop-product-wrap grid with-pagination row space-db--30 shop-border"
                            }
                        >
                            <Products items={filteredItems}/>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
