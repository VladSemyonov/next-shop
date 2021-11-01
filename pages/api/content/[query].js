import { resultArr } from "../../../src/components/server";

export default function handler(req, res) {
  const { query } = req.query;
  let response = getPostContent(query);
  res.status(200).json(response);
}

function getPostContent(cat) {
  let result = [];
  let currentArr = resultArr.productsArr.Сантехника.filter(
    (i) => i.categoryId._text === cat
  );
  let count = currentArr.length;
  for (let i = 0; i < 8; i++) {
    let index = Math.floor(Math.random() * count);
    let item = currentArr[index];
    result.push(item);
  }
  return result;
}
