import { useState, useContext } from "react";
import {
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

import { MonsterTableHeader, MonsterModal } from "..";
import { useStyles } from "../../styles/makeStyles";
import { MonstersContext, EncounterContext } from "../../utils/contexts";
import { addToEncounter } from "../../utils/encounterBuild";

const MonstersList = () => {
  const classes = useStyles();

  const { filteredMonsters, setFilteredMonsters } = useContext(MonstersContext);
  const { setEncounterBuild } = useContext(EncounterContext);

  const columns = {
    name: "Monster Name",
    challenge_rating: "CR",
    size: "Size",
    type: "Type",
    alignment: "Alignment",
  };

  const [monstersSort, setMonstersSort] = useState({
    column: "name",
    order: "asc",
  });

  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState({});

  function openModal(data) {
    setIsOpen(true);
    setModalData(data);
  }

  return (
    <>
      <TableContainer className={classes.container} component={Paper}>
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
                {Object.keys(columns).map((column) => {
                  if (column === "name")
                    return (
                      <TableCell key={column}>
                        <button onClick={() => openModal(monster)}>
                          {monster[column]}
                        </button>
                      </TableCell>
                    );
                  return <TableCell key={column}>{monster[column]}</TableCell>;
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <MonsterModal
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        modalData={modalData}
      />
    </>
  );
};

export default MonstersList;
