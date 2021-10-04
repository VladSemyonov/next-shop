export function createDom(o, fn) {
  let arr = [];
  let keys = Object.keys(o);
  for (let i of keys) {
    arr.push(
      <div
        key={i}
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "150px",
        }}
      >
        <span>{i}</span>
        <input onChange={fn} type={"checkbox"} value={i} id="vendor" />
      </div>
    );
  }
  return arr;
}

export function advancedFilters(obj, fn) {
  let result = [];
  for (let category in obj) {
    if (category !== "id" && category !== "vendors" && category !== "price") {
      if (obj[category].length > 1) {
        result.push(
          <div key={category}>
            <div>{category}</div>
            {obj[category].map((i, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "150px",
                }}
              >
                <span>{i.value}</span>
                <input
                  onChange={fn}
                  type={"checkbox"}
                  id={category}
                  value={i.value}
                />
              </div>
            ))}
            <hr />
          </div>
        );
      }
    }
  }
  return result;
}
