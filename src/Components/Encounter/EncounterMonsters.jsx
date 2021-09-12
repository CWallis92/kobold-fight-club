import { ButtonGroup, Button, TextField } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { useEffect, useState } from "react";

import {
  addToEncounter,
  resetEncounterMonster,
} from "../../utils/encounterBuild";

const EncounterMonsters = ({ monster, setEncounterBuild }) => {
  const [monsterCount, setMonsterCount] = useState(monster.count);

  useEffect(() => {
    setMonsterCount(monster.count);
  }, [monster.count]);

  return (
    <div className="encounterMonster">
      <h3>{monster.name}</h3>
      <p>CR: {monster.challenge_rating}</p>
      <p>XP: {monster.xp}</p>
      <ButtonGroup variant="contained" style={{ marginLeft: "auto" }}>
        <Button
          size="small"
          onClick={() => {
            setEncounterBuild((currEncounterBuild) =>
              addToEncounter(-1, monster, currEncounterBuild)
            );
          }}
        >
          <RemoveIcon />
        </Button>

        <TextField
          variant="outlined"
          value={monsterCount}
          onChange={(event) => {
            if (event.target.value === "") setMonsterCount("");
            if (/^[1-9][0-9]{0,2}$/.test(event.target.value)) {
              setEncounterBuild((currEncounterBuild) =>
                resetEncounterMonster(
                  event.target.value,
                  monster,
                  currEncounterBuild
                )
              );
            }
          }}
        />

        <Button
          size="small"
          onClick={() => {
            setEncounterBuild((currEncounterBuild) =>
              addToEncounter(1, monster, currEncounterBuild)
            );
          }}
        >
          <AddIcon />
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default EncounterMonsters;
