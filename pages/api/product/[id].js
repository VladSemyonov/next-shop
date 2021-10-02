import { data } from "../../../src/data";

export default function handler(req, res) {
  const { id } = req.query;
  let responce = data.productsArr.filter((i) => i._attributes.id === id);
  res.status(200).json(responce);
}
