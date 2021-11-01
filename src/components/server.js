const fs = require("fs");
const convert = require("xml-js");
var path = require("path");
const dirname = path.resolve(process.cwd(), "src");

export const resultArr = {
  productsArr: {
    Сантехника: [],
    Автомобили: [],
    Фаберже: [],
    "Частные дома": [],
  },
  categoriesArr: {
    Сантехника: [],
    Автозапчасти: [
      { _text: "Шины", _attributes: { id: "2" } },
      { _text: "Двигатели", _attributes: { id: "2" } },
      { _text: "Диски", _attributes: { id: "2" } },
      { _text: "глушители", _attributes: { id: "2" } },
      { _text: "Елочки", _attributes: { id: "2" } },
    ],
    Стройматериалы: [
      { _text: "Песок", _attributes: { id: "2" } },
      { _text: "Доски", _attributes: { id: "2" } },
      { _text: "Гвозди", _attributes: { id: "2" } },
      { _text: "Молотки", _attributes: { id: "2" } },
    ],
    "Частные дома": [
      { _text: "Дачи", _attributes: { id: "2" } },
      { _text: "Коттеджи", _attributes: { id: "2" } },
      { _text: "Не коттеджи", _attributes: { id: "2" } },
      { _text: "гаражи", _attributes: { id: "2" } },
    ],
    Гидравлика: [],
    Спецтехника: [
      { _text: "комбайны", _attributes: { id: "2" } },
      { _text: "поливочные машины", _attributes: { id: "2" } },
      { _text: "трактора", _attributes: { id: "2" } },
      { _text: "Косилки", _attributes: { id: "2" } },
    ],
  },
  filterArr: { vendors: {} },
  obj: {},
};

async function start() {
  var result1 = convert.xml2json(
    fs.readFileSync(path.join(dirname, "test.xml"), "utf8"),
    {
      compact: true,
      spaces: 4,
    }
  );
  var result = await JSON.parse(result1);
  makeArr(result);
}

start();

function makeArr(item) {
  for (let i of item.yml_catalog.shop.categories.category) {
    resultArr.categoriesArr.Сантехника.push(i);
    resultArr.filterArr.vendors[i._attributes.id] = {};
  }
  let arr = [];
  for (let i of item.yml_catalog.shop.offers.offer) {
    i.amountBuy = 1;
    i.clicks = 0;
    i.shop = item.yml_catalog.shop.name;
    for (let a of item.yml_catalog.shop.categories.category) {
      if (i.categoryId._text === a._attributes.id) {
        i.categoryId = a;
        arr.push(i);
      }
    }
  }
  arr.map((i) => {
    resultArr.filterArr.vendors[i.categoryId._attributes.id] = {
      ...resultArr.filterArr.vendors[i.categoryId._attributes.id],
    };
    resultArr.filterArr.vendors[i.categoryId._attributes.id][i.vendor._text] =
      "";
  });
  resultArr.productsArr.Сантехника.push(...arr);
  let testObj = {};
  for (let category in resultArr.categoriesArr.Сантехника) {
    testObj[resultArr.categoriesArr.Сантехника[category]._text] = {
      id: resultArr.categoriesArr.Сантехника[category]._attributes.id,
    };
  }
  for (let item of arr) {
    if (item.categoryId._text in testObj) {
      for (let parametr of item.param) {
        if (!(parametr._attributes.name in testObj[item.categoryId._text])) {
          testObj[item.categoryId._text][parametr._attributes.name] = [];
          testObj[item.categoryId._text][parametr._attributes.name].push({
            value: parametr._text,
            doFilter: true,
          });
        } else {
          let counter = 0;
          for (let param of testObj[item.categoryId._text][
            parametr._attributes.name
          ]) {
            if (param.value === parametr._text) counter++;
          }
          if (counter === 0)
            testObj[item.categoryId._text][parametr._attributes.name].push({
              value: parametr._text,
              doFilter: true,
            });
        }
      }
    }
  }
  Object.assign(resultArr.obj, testObj);
}

export function setMes() {}

export function addClicks(id) {
  resultArr.productsArr.Сантехника.map((i) =>
    i._attributes.id === id ? { ...i, clicks: (i.clicks += 1) } : i
  );
}
