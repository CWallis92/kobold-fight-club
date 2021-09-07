import { memo, useEffect, useState } from "react";
import { CircularProgress } from "@material-ui/core";

import { MonstersFilter, MonstersList } from ".";
import { getMonsters } from "../utils/api";
import { MonstersContext } from "../utils/Context";

const MonstersCol = () => {
  const [fullMonsters, setFullMonsters] = useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getMonsters()
      .then(({ data: { count } }) => {
        // Assumes 50 items per page, as per docs https://api.open5e.com/
        return getMonsters(count);
      })
      .then(({ data: { results } }) => {
        setFullMonsters(
          results.map((monster) => {
            monster.id = monster.slug;
            return monster;
          })
        );
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    setFilteredMonsters(fullMonsters);
  }, [fullMonsters]);

  return (
    <MonstersContext.Provider
      value={{ fullMonsters, filteredMonsters, setFilteredMonsters }}
    >
      <div id="rightCol" className="col">
        {isLoading ? (
          <CircularProgress id="listLoading" />
        ) : (
          <>
            <MonstersFilter />
            <MonstersList />
          </>
        )}
      </div>
    </MonstersContext.Provider>
  );
};

export default memo(MonstersCol);
