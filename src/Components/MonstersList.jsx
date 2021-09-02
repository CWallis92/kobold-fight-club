import { useState, useEffect } from "react";

import { getMonsters } from "../utils/api";
import { MonsterRow } from ".";

const MonstersList = ({ setEncounterBuild }) => {
  const [monsters, setMonsters] = useState([]);

  useEffect(() => {
    getMonsters().then(({ data: { results } }) => {
      setMonsters(results);
    });
  }, []);

  const updateEncounterBuild = (newMonster) => {
    setEncounterBuild((currEncounterBuild) => {
      const newEncounterBuild = [];
      currEncounterBuild.forEach((monster) => {
        let newCount = monster.count;
        if (newMonster === monster.index) newCount++;
        newEncounterBuild.push({
          index: monster.index,
          name: monster.name,
          count: newCount,
        });
      });
      if (!currEncounterBuild.find((monster) => monster.index === newMonster)) {
        newEncounterBuild.push({
          index: newMonster,
          name: "Name",
          count: 1,
        });
      }
      return newEncounterBuild;
    });
  };

  return (
    <div>
      <table>
        <tr>
          <th></th>
          <th>Monster Name</th>
          <th>CR</th>
          <th>Size</th>
          <th>Type</th>
          <th>Alignment</th>
        </tr>
        {monsters.map((monster) => {
          return (
            <MonsterRow
              key={monster.index}
              monster={monster}
              updateEncounterBuild={updateEncounterBuild}
            />
          );
        })}
      </table>
    </div>
  );
};

export default MonstersList;