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
