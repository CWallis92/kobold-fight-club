import { Grid, Typography } from "@material-ui/core";
import { useStyles } from "../../styles/EncounterTotal";

const EncounterTotal = ({ encounterBuild, party, difficulty }) => {
  const classes = useStyles();

  const totalXP = encounterBuild.reduce(
    (init, next) => init + next.xp * next.count,
    0
  );
  const totalMonsters = encounterBuild.reduce(
    (init, next) => init + next.count,
    0
  );
  let multiplier = 1;
  switch (totalMonsters) {
    case 1:
      break;
    case 2:
      multiplier = 1.5;
      break;
    case 3:
    case 4:
    case 5:
    case 6:
      multiplier = 2;
      break;
    case 7:
    case 8:
    case 9:
    case 10:
      multiplier = 2.5;
      break;
    case 11:
    case 12:
    case 13:
    case 14:
      multiplier = 3;
      break;
    default:
      multiplier = 4;
      break;
  }

  const adjustedXP = totalXP * multiplier;

  let encounterDiff = "*Yawns*";
  switch (true) {
    case adjustedXP >= difficulty.deadly:
      encounterDiff = "Deadly";
      break;
    case adjustedXP >= difficulty.hard:
      encounterDiff = "Hard";
      break;
    case adjustedXP >= difficulty.medium:
      encounterDiff = "Medium";
      break;
    case adjustedXP >= difficulty.easy:
      encounterDiff = "Easy";
      break;
    default:
      break;
  }

  const partySize = party.reduce((prev, curr) => prev + curr[1], 0);

  return (
    <Grid
      container
      justifyContent="space-between"
      className={classes.container}
    >
      <Grid item>
        <Typography variant="h5">Difficulty: {encounterDiff}</Typography>
      </Grid>
      <Grid item>
        <Typography variant="h6" align="right">
          Total XP: {totalXP.toLocaleString("en-US")}
        </Typography>
        <Typography variant="body2" align="right">
          ({Math.ceil(totalXP / partySize).toLocaleString("en-US")} per player)
        </Typography>
        <Typography variant="h6" align="right">
          Adjusted XP: {adjustedXP.toLocaleString("en-US")}
        </Typography>
        <Typography variant="body2" align="right">
          ({Math.ceil(adjustedXP / partySize).toLocaleString("en-US")} per
          player)
        </Typography>
      </Grid>
    </Grid>
  );
};

export default EncounterTotal;
