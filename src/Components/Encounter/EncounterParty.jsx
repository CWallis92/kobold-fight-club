import { Fragment } from "react";
import {
  Grid,
  MenuItem,
  Select,
  Typography,
  Button,
  IconButton,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";

import { budgets } from "../../utils/characterXPThresholds";
import { useStyles } from "../../styles/PartyInfo";

const EncounterParty = ({ party, setParty, difficulty }) => {
  const classes = useStyles();

  const partyBudget = party.reduce((prev, curr) => {
    return prev + budgets[curr[0]] * curr[1];
  }, 0);

  const addRows = () => {
    setParty((currParty) => {
      const newParty = JSON.parse(JSON.stringify(currParty));
      newParty.push([1, 1]);
      return newParty;
    });
  };
  const removeRows = (row) => {
    setParty((currParty) => {
      const newParty = JSON.parse(JSON.stringify(currParty));
      newParty.splice(row, 1);
      return newParty;
    });
  };

  const updateAmount = (event, row) => {
    setParty((currParty) => {
      const newParty = JSON.parse(JSON.stringify(currParty));
      newParty[row] = [newParty[row][0], parseInt(event.target.value)];
      return newParty;
    });
  };

  const updateLevel = (event, row) => {
    setParty((currParty) => {
      const newParty = JSON.parse(JSON.stringify(currParty));
      newParty[row] = [parseInt(event.target.value), newParty[row][1]];
      return newParty;
    });
  };

  return (
    <Grid container className={classes.container}>
      <Grid item xs={6}>
        <Typography variant="h5" gutterBottom>
          Group Info
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={5}>
            <Typography variant="body1">Players</Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography variant="body1">Level</Typography>
          </Grid>
          <Grid item xs={2}></Grid>
          {party.map((row, rowIndex) => {
            return (
              <Fragment key={rowIndex}>
                <Grid item xs={5}>
                  <Select
                    value={party[rowIndex][1]}
                    onChange={(event) => updateAmount(event, rowIndex)}
                    className={classes.dropdownSize}
                  >
                    {[...Array(12).keys()].map((item) => (
                      <MenuItem key={item + 1} value={item + 1}>
                        {item + 1}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={5}>
                  <Select
                    value={party[rowIndex][0]}
                    onChange={(event) => updateLevel(event, rowIndex)}
                    className={classes.dropdownSize}
                  >
                    {[...Array(20).keys()].map((item) => (
                      <MenuItem key={item + 1} value={item + 1}>
                        {item + 1}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                {rowIndex > 0 ? (
                  <Grid item xs={2}>
                    <IconButton
                      aria-label="delete"
                      onClick={() => removeRows(rowIndex)}
                      className={classes.deleteButtons}
                    >
                      <DeleteIcon color="primary" />
                    </IconButton>
                  </Grid>
                ) : (
                  <Grid item xs={2}></Grid>
                )}
              </Fragment>
            );
          })}
        </Grid>
        {party.length < 10 && (
          <Grid item xs={12} className={classes.addButton}>
            <Button variant="contained" color="primary" onClick={addRows}>
              <AddIcon></AddIcon> Add level
            </Button>
          </Grid>
        )}
      </Grid>
      <Grid container item xs={6} className={classes.xpInfo} direction="column">
        <Grid item>
          {Object.keys(difficulty).map((item) => (
            <Typography variant="body2" key={item} align="right">
              {item[0].toUpperCase() + item.slice(1)}:{" "}
              {difficulty[item].toLocaleString("en-US")}XP
            </Typography>
          ))}
        </Grid>
        <Grid item>
          <Typography
            variant="body2"
            align="right"
            className={classes.dailyBudget}
          >
            Daily budget: {partyBudget.toLocaleString("en-US")}XP
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default EncounterParty;
