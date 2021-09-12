import { useContext } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  IconButton,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import { MonsterTableHeader } from "..";
import { useStyles } from "../../styles/MonsterList";
import { MonstersContext, EncounterContext } from "../../utils/contexts";
import { addToEncounter } from "../../utils/encounterBuild";

const MonstersList = () => {
  const classes = useStyles();

  const {
    filteredMonsters,
    setFilteredMonsters,
    monstersSort,
    setMonstersSort,
  } = useContext(MonstersContext);
  const { setEncounterBuild } = useContext(EncounterContext);

  const columns = {
    name: "Monster Name",
    challenge_rating: "CR",
    size: "Size",
    type: "Type",
    alignment: "Alignment",
  };

  return (
    <TableContainer className={classes.container} component={Card}>
      <Table stickyHeader aria-label="Monsters Table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            {Object.keys(columns).map((column) => (
              <MonsterTableHeader
                key={column}
                column={column}
                prettyColumn={columns[column]}
                monstersSort={monstersSort}
                setMonstersSort={setMonstersSort}
                setFilteredMonsters={setFilteredMonsters}
              />
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredMonsters.map((monster) => (
            <TableRow key={monster.slug}>
              <TableCell>
                <IconButton
                  color="primary"
                  size="small"
                  variant="contained"
                  onClick={() =>
                    setEncounterBuild((currEncounterBuild) =>
                      addToEncounter(1, monster, currEncounterBuild)
                    )
                  }
                >
                  <AddIcon />
                </IconButton>
              </TableCell>
              {Object.keys(columns).map((column) => (
                <TableCell key={column}>{monster[column]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MonstersList;
