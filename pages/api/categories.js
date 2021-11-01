import { resultArr } from "../../src/components/server";

export default function handler(request, response) {
  response.status(200).json(resultArr.categoriesArr);
}
