import { resultArr } from "../../../src/components/server";

export default function handler(req, res) {
  const { id } = req.query;
  let response = resultArr.productsArr.Сантехника.filter(
    (item) =>
      (item.categoryId._attributes.id === id ||
        item.categoryId._attributes.parentId === id) &&
      item
  );
  res.status(200).json(response);
}
