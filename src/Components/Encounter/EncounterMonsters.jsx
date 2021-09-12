import { useEffect, useState } from "react";
import {
  ButtonGroup,
  Button,
  TextField,
  Typography,
  Grid,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

import {
  addToEncounter,
  resetEncounterMonster,
} from "../../utils/encounterBuild";
import { useStyles } from "../../styles/EncounterBuild";

const EncounterMonsters = ({ monster, setEncounterBuild }) => {
  const classes = useStyles();

  const [monsterCount, setMonsterCount] = useState(monster.count);

  useEffect(() => {
    setMonsterCount(monster.count);
  }, [monster.count]);

  return (
    <Grid container justifyContent="space-between" spacing={2}>
      <Grid item xs={7}>
        <Typography variant="h6">{monster.name}</Typography>
        <Typography variant="body2">
          CR: {monster.challenge_rating} ({monster.xp.toLocaleString("en-US")}
          XP)
        </Typography>
      </Grid>
      <Grid item xs={5}>
        <Typography align="right">
          <ButtonGroup variant="contained" color="primary">
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
                if (/^0$/.test(event.target.value)) {
                  setEncounterBuild((currEncounterBuild) =>
                    resetEncounterMonster(0, monster, currEncounterBuild)
                  );
                }
              }}
              className={classes.totalInput}
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
        </Typography>
      </Grid>
    </Grid>
  );
};

export default EncounterMonsters;
