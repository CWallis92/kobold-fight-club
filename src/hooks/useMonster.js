import { useState, useEffect } from "react";

import { getMonsterData } from "../utils/api";

export const useMonsterData = (monster_id) => {
  const [monsterData, setMonsterData] = useState(null);

  useEffect(() => {
    getMonsterData(monster_id).then(({ data }) => {
      setMonsterData({
        ac: data.armor_class,
      });
    });
  }, [monster_id]);

  return { monsterData, setMonsterData };
};
