import { data } from "../../../src/data";

export default function handler(req, res) {
  const { id } = req.query;
  let result = data.filterArr.vendors[id];
  res.status(200).json(result);
}
