import { memo } from "react";
import { CircularProgress } from "@material-ui/core";

import { MonstersFilter, MonstersList } from "..";
import { MonstersContext } from "../../utils/contexts";
import { useMonsters } from "../../hooks/useMonsters";

const MonstersCol = () => {
  const { fullMonsters, filteredMonsters, setFilteredMonsters, isLoading } =
    useMonsters();

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
