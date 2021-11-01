import { resultArr } from "../../src/components/server";

export default function handler(request, response) {
  let result = getClicked();
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.status(200).json(result);
}

function getClicked() {
  let items = resultArr.productsArr.Сантехника.filter(
    (item) => item.clicks > 0
  );
  let items2 = items.sort((a, b) => (a.clicks - b.clicks > 0 ? -1 : 1));
  let result = items2.slice(0, 6);
  return result;
}
