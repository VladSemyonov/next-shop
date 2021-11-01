import { resultArr } from "../../../src/components/server";

export default function handler(req, res) {
  const { id } = req.query;
  let ex = { vendors: {} };
  for (let item in resultArr.obj) {
    if (resultArr.obj[item].id === id) ex = resultArr.obj[item];
  }
  ex.vendors = resultArr.filterArr.vendors[id];
  res.status(200).json(ex);
}
