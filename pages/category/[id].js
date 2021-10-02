import { useEffect, useState, useMemo } from "react";
import Products from "../../src/components/Products";
import { useRouter } from "next/dist/client/router";
import { advancedFilters, createDom } from "../../src/utils";
import Layout from "../../src/components/Layout/Layout";

const initObj = {
  price: {
    higher: 0,
    below: 999999,
  },
};

export default function Category({ data, items }) {
  const router = useRouter();
  const { id } = router.query;
  const [parames, setParams] = useState({});
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});

  useMemo(() => {
    setFilteredItems(items);
    setParams(data);
  }, [items, data]);

  useEffect(() => doFilter2(), [filters, parames]);

  useEffect(() => {
    if (parames?.price?.below === "") {
      setParams({ ...parames, price: { ...parames.price, below: 99999 } });
    }
    !loading && doFilter2();
  }, [filters, parames]);

  function doFilter2() {
    let numOfkeys = Object.keys(filters).length;
    const scores = filters.vendor ? numOfkeys - 1 : numOfkeys;
    let result = [];
    let arr = [].concat(items);
    let b = arr.filter(
      (i) =>
        Number(i.price._text) >= parames.price.higher &&
        Number(i.price._text) <= parames.price.below
    );
    if (filters.vendor) {
      b = b.filter((i) => i.vendor._text in filters.vendor && i);
    }
    for (let item of b) {
      let itemScore = 0;
      for (let param of item.param) {
        if (param._attributes.name in filters) {
          for (let filter of filters[param._attributes.name]) {
            if (param._text === filter) {
              itemScore += 1;
            }
          }
        }
      }
      if (itemScore === scores) result.push(item);
    }
    setFilteredItems(result);
  }

  function checkActionType(e) {
    e.target.checked ? addFilter(e) : deleteFilter(e);
  }

  function addFilter(filter) {
    let { id, value } = filter.target;
    if (id === "vendor")
      setFilters({ ...filters, vendor: { ...filters.vendor, [value]: "" } });
    else {
      let newArr = filters[id] ? filters[id] : [];
      newArr.push(value);
      setFilters({ ...filters, [id]: newArr });
    }
  }

  function deleteFilter(filter) {
    const { value, id } = filter.target;
    if (id === "vendor")
      if (Object.keys(filters.vendor).length > 1) {
        delete filters.vendor[value];
        doFilter2();
      } else {
        delete filters.vendor;
        doFilter2();
      }
    else {
      if (filters[id]?.length > 1) {
        setFilters({
          ...filters,
          [id]: filters[id].filter((item) => item !== value),
        });
      } else {
        delete filters[id];
        doFilter2();
      }
    }
  }

  function priceFiltering(event) {
    let value = event.target.name;
    let data = event.target.value;
    setParams({ ...parames, price: { ...parames.price, [value]: data } });
  }

  return (
    <Layout title="купить сантехнику в Украине">
      <main className="inner-page-sec-padding-bottom">
        <div className="container">
          <div className={"row"}>
            <div className={"col-lg-3"} style={{ height: "1000px" }}>
              <div className={"row mt-2"}>
                <div className="col-2" style={{ height: "fit-content" }}>
                  <div>
                    <div>Ценна:</div>
                    От{" "}
                    <input
                      onInput={(e) => priceFiltering(e)}
                      name={"higher"}
                      type={"number"}
                    />
                    до{" "}
                    <input
                      onInput={(e) => priceFiltering(e)}
                      name={"below"}
                      type={"number"}
                    />
                  </div>
                  {parames.vendors && (
                    <div>
                      Брэнд:
                      <div>{createDom(parames.vendors, checkActionType)}</div>
                    </div>
                  )}
                  <hr />
                  <div>
                    <div
                      style={{
                        overflow: "auto",
                        width: "180px",
                        height: "600px",
                      }}
                    >
                      {advancedFilters(parames, checkActionType)}
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
                <Products items={filteredItems} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export const getServerSideProps = async (context) => {
  let res = await fetch(
    `https://teeno.vercel.app/api/test/${context.query.id}`
  );
  let filtersRes = await res.json();
  let data = Object.assign(initObj, filtersRes);

  let res2 = await fetch(
    `https://teeno.vercel.app/api/category/${context.query.id}`
  );
  let items = await res2.json();

  return {
    props: {
      data,
      items,
    },
  };
};
