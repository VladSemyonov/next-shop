import Layout from "../src/components/Layout/Layout";
import AdsField from "../src/components/AdsField";
import Benefits from "../src/components/Benefits";
import Courusel from "../src/components/Courusel";
import ScrollToTop from "../src/components/ScrollToTop";
import PostsList from "../src/components/PostsList";
import bg from "../public/images/bg-images/maxresdefault.jpg";
import Link from "next/link";

export default function Home() {
  return (
    <Layout title="Купить смеситель, душевую кабину, сантехнику | Teemo shop">
      <Benefits />
      {/* <Courusel /> */}
      <PostsList />
      <div className="bg">
        <Link href="contacts">
          <span className="bg-link">контакты</span>
        </Link>
      </div>
      <AdsField title="Топ продаж" query="Гидробоксы" />
      <AdsField title="Новые товары" query="Для ванны" />
      <ScrollToTop />
    </Layout>
  );
}
