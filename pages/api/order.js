import { setMes } from "../../src/utils";

export default async function hsndler(req, res) {
  setMes(JSON.parse(req.body))
    .then(() => res.status(200).send("200"))
    .catch((err) => res.status(400).send("400"));
}
