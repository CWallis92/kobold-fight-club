import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import { getMonsters } from "../utils/api";
import { updateEncounterBuild } from "../utils/encounterBuild";

const MonstersList = ({ setEncounterBuild }) => {
  const [monsters, setMonsters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const useStyles = makeStyles({
    root: {
      width: "100%",
    },
    container: {
      maxHeight: "90vh",
    },
  });
  const classes = useStyles();

  useEffect(() => {
    setIsLoading(true);
    getMonsters()
      .then(({ data: { count } }) => {
        // Assumes 50 items per page, as per docs https://api.open5e.com/
        return getMonsters(count);
      })
      .then(({ data: { results } }) => {
        setMonsters(
          results.map((monster) => {
            monster.id = monster.slug;
            monster.button = <button>Test</button>;
            return monster;
          })
        );
        setIsLoading(false);
      });
  }, []);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <TableContainer
      className={classes.container}
      component={Paper}
      id="monstersList"
    >
      <Table stickyHeader aria-label="Monsters Table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Monster Name</TableCell>
            <TableCell>CR</TableCell>
            <TableCell>Size</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Alignment</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {monsters.map((monster) => (
            <TableRow key={monster.slug}>
              <TableCell
                component="th"
                scope="row"
                style={{ padding: "0 0 0 5px" }}
              >
                <IconButton
                  color="primary"
                  size="small"
                  variant="contained"
                  onClick={() =>
                    updateEncounterBuild(monster, setEncounterBuild)
                  }
                >
                  <AddIcon />
                </IconButton>
              </TableCell>
              <TableCell>
                <Link to={`/${monster.slug}`}>{monster.name}</Link>
              </TableCell>
              <TableCell>{monster.challenge_rating}</TableCell>
              <TableCell>{monster.size}</TableCell>
              <TableCell>{monster.type}</TableCell>
              <TableCell>{monster.alignment}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MonstersList;
