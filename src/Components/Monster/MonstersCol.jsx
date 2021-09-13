import { memo } from "react";
import { CircularProgress, Typography } from "@material-ui/core";

import { MonstersFilter, MonstersList } from "..";
import { MonstersContext } from "../../utils/contexts";
import { useMonsters } from "../../hooks/useMonsters";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  loading: {
    position: "absolute",
    top: "50%",
    right: "50%",
  },
});

const MonstersCol = () => {
  const classes = useStyles();

  const {
    fullMonsters,
    filteredMonsters,
    setFilteredMonsters,
    isLoading,
    monstersSort,
    setMonstersSort,
    error,
  } = useMonsters();

  return (
    <MonstersContext.Provider
      value={{
        fullMonsters,
        filteredMonsters,
        setFilteredMonsters,
        monstersSort,
        setMonstersSort,
      }}
    >
      {isLoading ? (
        <CircularProgress className={classes.loading} />
      ) : error ? (
        <Typography variant="h6">
          There was an error loading the data. Try again later
        </Typography>
      ) : (
        <>
          <MonstersFilter />
          <MonstersList />
        </>
      )}
    </MonstersContext.Provider>
  );
};

export default memo(MonstersCol);
