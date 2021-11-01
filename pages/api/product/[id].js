import { resultArr, addClicks } from "../../../src/components/server";

export default function handler(req, res) {
  const { id } = req.query;
  let responce = resultArr.productsArr.Сантехника.filter(
    (i) => i._attributes.id === id
  );
  addClicks(id);
  res.status(200).json(responce);
}
