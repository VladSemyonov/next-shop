import Layout from "../src/components/Layout/Layout";
import AdsField from "../src/components/AdsField";
import Benefits from "../src/components/Benefits";
import Courusel from "../src/components/Courusel";
import ScrollToTop from "../src/components/ScrollToTop";

export default function Home() {
  console.log(process.env.PORT);
  return (
    <Layout title="Купить смеситель, душевую кабину, сантехнику | Teemo shop">
      <Benefits />
      <Courusel />
      <AdsField title="Рабочая штука" query="Гидробоксы" />
      <AdsField title="Рабочая штука" query="Для ванны" />
      <ScrollToTop />
    </Layout>
  );
}
