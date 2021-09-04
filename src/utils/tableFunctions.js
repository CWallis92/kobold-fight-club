export const toggleColumn = (col, order, setMonsters, setMonstersSort) => {
  setMonstersSort({
    column: col,
    order: order === "asc" ? "desc" : "asc",
  });
  setMonsters((currList) => {
    return currList.sort((a, b) => {
      if (col === "challenge_rating") {
        let first = a[col];
        let second = b[col];
        if (/\//.test(a[col])) {
          first = 1 / parseInt(a[col].slice(-1));
        }
        if (/\//.test(b[col])) second = 1 / parseInt(a[col].slice(-1));
        return order === "asc"
          ? parseInt(second) - parseInt(first)
          : parseInt(first) - parseInt(second);
      } else if (a[col].toUpperCase() < b[col].toUpperCase()) {
        return order === "asc" ? -1 : 1;
      }
      return order === "asc" ? 1 : -1;
    });
  });
};

export const newColumnSort = (col, setMonsters, setMonstersSort) => {
  setMonstersSort({
    column: col,
    order: "desc",
  });
  setMonsters((currList) => {
    return currList.sort((a, b) => {
      if (col === "challenge_rating") {
        let first = a[col];
        let second = b[col];
        if (/\//.test(a[col])) {
          first = 1 / parseInt(a[col].slice(-1));
        }
        if (/\//.test(b[col])) second = 1 / parseInt(a[col].slice(-1));
        return parseInt(second) - parseInt(first);
      } else if (a[col].toUpperCase() < b[col].toUpperCase()) {
        return 1;
      }
      return -1;
    });
  });
};
