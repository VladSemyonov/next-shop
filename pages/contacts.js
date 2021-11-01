import Layout from "../src/components/Layout/Layout";

const Contacts = () => {
  return (
    <Layout
      title="Контакты Vlad Semyonov | Teemo"
      description="телефон, e-mail магазина сантехники"
    >
      <section className="container mt--40">
        <div className="border rounded">
          <div className="card-body">
            <h4 className="card-title">Контактная информация</h4>
            <h5 className="card-title">Телефон</h5>
            <span className="card-text">+380676782549</span>
          </div>
          <div className="card-body">
            <h5 className="card-title">E-mail</h5>
            <span className="card-text">vladsemyonov95@ukr.net</span>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contacts;
