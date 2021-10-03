import { data } from "../../../src/data";

export default function handler(req, res) {
  const { id } = req.query;
  let ex = { vendors: {} };
  for (let item in data.obj) {
    if (data.obj[item].id === id) ex = data.obj[item];
  }
  ex.vendors = data.filterArr.vendors[id];
  res.status(200).json(ex);
}
