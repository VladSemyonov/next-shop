import Products from "../src/components/Products";
import Layout from "../src/components/Layout/Layout";

export default function Search({ items }) {
  return (
    <Layout title="купить сантехнику в Украине">
      <main className="inner-page-sec-padding-bottom">
        <div className="container">
          <div className={"row"}>
            <div className={"col-lg-12"}>
              <div
                className={
                  "shop-product-wrap grid with-pagination row space-db--30 shop-border"
                }
              >
                <Products items={items} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export const getServerSideProps = async (context) => {
  let res2 = await fetch(
    `https://teemo.vercel.app/api/category/${context.query.id}`
    //`http://localhost:3000/api/search/${context.query.selector}`
  );
  let items = await res2.json();

  return {
    props: {
      items,
    },
  };
};
