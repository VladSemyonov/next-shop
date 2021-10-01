import TopNavigation from "./TopNavigation";
import Footer from "./Footer";
import Head from "next/head";

export default function Layout({ children, title, description }) {
  return (
    <>
      <Head>
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <TopNavigation />
      {children}
      <Footer />
    </>
  );
}
