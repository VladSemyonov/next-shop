import { data } from "../../../src/data";

export default function handler(req, res) {
  const { pid } = req.query;
  let response = data.productsArr.Сантехника.filter((item) => {
    if (
      item.categoryId._attributes.id === pid ||
      item.categoryId._attributes.parentId === pid
    ) {
      console.log("true");
      return item;
    }
  });
  res.status(200).json(response);
}
