import { useState, useEffect } from "react";

import { getMonsters } from "../utils/api";
import { MonsterRow } from ".";

const MonstersList = ({ setEncounterBuild }) => {
  const [monsters, setMonsters] = useState([]);

  useEffect(() => {
    getMonsters()
      .then(({ data: { count } }) => {
        // Assumes 50 items per page, as per docs https://api.open5e.com/
        return getMonsters(count);
      })
      .then(({ data: { results } }) => {
        setMonsters(results);
      });
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Monster Name</th>
            <th>CR</th>
            <th>Size</th>
            <th>Type</th>
            <th>Alignment</th>
          </tr>
        </thead>
        <tbody>
          {monsters.map((monster) => {
            return (
              <MonsterRow
                key={monster.slug}
                monster={monster}
                setEncounterBuild={setEncounterBuild}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MonstersList;
