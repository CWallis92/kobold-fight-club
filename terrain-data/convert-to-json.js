const fs = require("fs");

fs.readFile("./monsters-by-terrain.csv", "utf-8", (err, data) => {
  if (err) throw err;

  const json = {};

  const monsters = data.match(/\n[\S]+/gi);
  console.log(monsters);

  // fs.writeFile("./monsters-by-terrain.json", data, (err) => {
  //   if (err) throw err;
  // });
});
