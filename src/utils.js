import nodemailer from "nodemailer";

export function createDom(o, fn) {
  let arr = [];
  let keys = Object.keys(o);
  for (let i of keys) {
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
        <input onChange={fn} type={"checkbox"} value={i} id="vendor" />
      </div>
    );
  }
  return arr;
}

export function advancedFilters(obj, fn) {
  let result = [];
  for (let category in obj) {
    if (category !== "id" && category !== "vendors" && category !== "price") {
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
                  onChange={fn}
                  type={"checkbox"}
                  id={category}
                  value={i.value}
                />
              </div>
            ))}
            <hr />
          </div>
        );
      }
    }
  }
  return result;
}

export async function setMes(obj) {
  var transporter = nodemailer.createTransport({
    host: "wantbuy.wantbuy.com.ua",
    port: 587,
    secure: false,
    auth: {
      user: "work@wantbuy.com.ua",
      pass: "IOuBaOS5Eo",
    },
    tls: { rejectUnauthorized: false },
  });

  function createHTML(arr) {
    let date = new Date();
    return (
      `<table style="width:100%"><tr><td>Заказчик: ${
        obj.name
      } дата: ${date.toLocaleString()}</td> <td>Адрес ${obj.address}</td><td>${
        obj.phone
      }</td></tr>` +
      '<tr style="background: #cccccc;">' +
      "<td><span>Товар</span></td>" +
      "<td><span>Количество</span></td>" +
      "<td><span>Сумма</span></td>" +
      "</tr>" +
      arr
        .map(
          (i) =>
            '<tr style="background: #cccccc;">' +
            `<td><span>${i.product}</span></td>` +
            `<td><span>${i.amount}</span></td>` +
            `<td><span>${i.sumPrice}</span></td>` +
            "</tr>"
        )
        .join("") +
      `<tr style="background: #cccccc;"><td>Всего</td><td></td><td>${obj.sumPrice}</td></tr>` +
      "</table>"
    );
  }

  var mailOptions = {
    from: "vladsemyonov95@ukr.net",
    to: `apolleonmail@gmail.com, ${obj.emailChecked && obj.email}`,
    subject: "test",
    html: createHTML(obj.items),
  };

  let result = await transporter.sendMail(mailOptions);
  return result;
}
