import { useState, useEffect } from "react";

import { getMonsterData } from "../utils/api";

export const useMonsterData = (monster_id) => {
  const [monsterData, setMonsterData] = useState(null);

  useEffect(() => {
    getMonsterData(monster_id)
      .then(({ data }) => {
        console.log(data);
        setMonsterData(data);
      })
      .catch((err) => console.log("Not found"));
  }, [monster_id]);

  return { monsterData, setMonsterData };
};
