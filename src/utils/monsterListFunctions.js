export const allSizes = [
  "tiny",
  "small",
  "medium",
  "large",
  "huge",
  "gargantuan",
];

export const allTypes = [
  "aberration",
  "beast", // Make sure beasts are included
  "celestial",
  "construct", // Make sure constructs are included
  "dragon",
  "elemental",
  "fey",
  "fiend",
  "giant",
  "humanoid",
  "monstrosity",
  "ooze",
  "plant",
  "swarm",
  "undead",
];

export const allAlignments = [
  "any",
  "lawful good",
  "lawful neutral",
  "lawful evil",
  "neutral",
  "neutral good",
  "neutral evil",
  "chaotic good",
  "chaotic neutral",
  "chaotic evil",
  "unaligned",
  "other",
];

export const allLegendary = ["ordinary", "legendary"];

export const updateCategory = (event, list, fullList, callback) => {
  const value = event.target.value;
  if (value[value.length - 1] === "all") {
    callback(list.length === fullList.length ? [] : fullList);
    return;
  }
  callback(value);
};

const crs = [
  {
    label: "0",
    value: 0,
    scaledValue: 0,
  },
  {
    label: "1/8",
    value: 1,
    scaledValue: 0.125,
  },
  {
    label: "1/4",
    value: 2,
    scaledValue: 0.25,
  },
  {
    label: "1/2",
    value: 3,
    scaledValue: 0.5,
  },
];

for (let i = 4; i <= 33; i++) {
  crs.push({
    label: (i - 3).toString(),
    value: i,
    scaledValue: i - 3,
  });
}

export const valueLabelFormat = (value) => {
  switch (value) {
    case 0.125:
      return "1/8";
    case 0.25:
      return "1/4";
    case 0.5:
      return "1/2";
    default:
      return value;
  }
};

export const descale = (scaledValue) => {
  const crIndex = crs.findIndex((cr) => cr.scaledValue >= scaledValue);
  const cr = crs[crIndex];
  if (cr.scaledValue === scaledValue) {
    return cr.value;
  }
  if (crIndex === 0) {
    return 0;
  }
  const m =
    (cr.scaledValue - crs[crIndex - 1].scaledValue) /
    (cr.value - crs[crIndex - 1].value || 1);
  const dX = scaledValue - crs[crIndex - 1].scaledValue;
  return dX / m + crs[crIndex - 1].value;
};

export const scale = (value) => {
  const crIndex = crs.findIndex((cr) => cr.value >= value);
  const cr = crs[crIndex];
  if (cr.value === value) {
    return cr.scaledValue;
  }
  const m =
    (cr.scaledValue - crs[crIndex - 1].scaledValue) /
    (cr.value - crs[crIndex - 1].value || 1);
  const dX = value - crs[crIndex - 1].value;
  return m * dX + crs[crIndex - 1].scaledValue;
};

const toggleColumn = (col, order, setMonsters, setMonstersSort) => {
  setMonstersSort({
    column: col,
    order: order === "asc" ? "desc" : "asc",
  });
  setMonsters((currList) => {
    const newList = JSON.parse(JSON.stringify(currList));
    return newList.reverse();
  });
};

const crConvert = (value) => {
  switch (value) {
    case "1/8":
      return 0.125;
    case "1/4":
      return 0.25;
    case "1/2":
      return 0.5;
    default:
      return parseInt(value);
  }
};

const newColumnSort = (col, setMonsters, setMonstersSort) => {
  setMonstersSort({
    column: col,
    order: "asc",
  });
  setMonsters((currList) => {
    const newList = JSON.parse(JSON.stringify(currList));
    return newList.sort((a, b) => {
      if (col === "challenge_rating") {
        let first = crConvert(a[col]);
        let second = crConvert(b[col]);
        return second - first;
      }
      if (a[col].toLowerCase() < b[col].toLowerCase()) return -1;
      return 1;
    });
  });
};

export const applySort = (
  { column, order },
  columnToSort,
  setList,
  setSort
) => {
  if (column === columnToSort)
    toggleColumn(columnToSort, order, setList, setSort);
  else newColumnSort(columnToSort, setList, setSort);
};
