import { resultArr } from "../../../src/components/server";

export default function handler(req, res) {
  const { selector } = req.query;
  let result = resultArr.productsArr.Сантехника.filter(
    (item) =>
      item.name._text.toLocaleLowerCase().includes(selector) ||
      (item.description._text.toLocaleLowerCase().includes(selector) && item)
  );
  res.status(200).json(result);
}
