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
  CircularProgress,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import Modal from "react-modal";

import { getMonsters } from "../utils/api";
import { addToEncounter } from "../utils/encounterBuild";
import { newColumnSort, toggleColumn } from "../utils/tableFunctions";

const MonstersList = ({ setEncounterBuild }) => {
  const [monsters, setMonsters] = useState([]);
  const [monstersSort, setMonstersSort] = useState({
    column: "name",
    order: "asc",
  });
  const [isLoading, setIsLoading] = useState(true);

  const applySort = (col) => {
    if (monstersSort.column !== col)
      toggleColumn(col, monstersSort.order, setMonsters, setMonstersSort);
    else newColumnSort(col, setMonsters, setMonstersSort);
  };

  const useStyles = makeStyles({
    root: {
      width: "100%",
    },
    container: {
      maxHeight: "90vh",
    },
  });
  const classes = useStyles();

  /* Modal stuff */
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  // Modal.setAppElement("#yourAppElement");

  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState({});

  function openModal(data) {
    setIsOpen(true);
    setModalData(data);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }
  /* Finish modal stuff */

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
            return monster;
          })
        );
        setIsLoading(false);
      });
  }, []);

  return isLoading ? (
    <CircularProgress id="listLoading" />
  ) : (
    <>
      <TableContainer
        className={classes.container}
        component={Paper}
        id="monstersList"
      >
        <Table stickyHeader aria-label="Monsters Table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell
                data="name"
                onClick={(event) =>
                  applySort(event.target.getAttribute("data"))
                }
                className="headerColumn"
              >
                Monster Name{" "}
                {(() => {
                  if (monstersSort.column === "name") {
                    return monstersSort.order === "asc" ? (
                      <ArrowUpwardIcon className={"arrow"} />
                    ) : (
                      <ArrowDownwardIcon className={"arrow"} />
                    );
                  }
                })()}
              </TableCell>
              <TableCell
                data="challenge_rating"
                onClick={(event) =>
                  applySort(event.target.getAttribute("data"))
                }
                className="headerColumn"
              >
                CR{" "}
                {(() => {
                  if (monstersSort.column === "challenge_rating") {
                    return monstersSort.order === "asc" ? (
                      <ArrowUpwardIcon className={"arrow"} />
                    ) : (
                      <ArrowDownwardIcon className={"arrow"} />
                    );
                  }
                })()}
              </TableCell>
              <TableCell
                data="size"
                onClick={(event) =>
                  applySort(event.target.getAttribute("data"))
                }
                className="headerColumn"
              >
                Size{" "}
                {(() => {
                  if (monstersSort.column === "size") {
                    return monstersSort.order === "asc" ? (
                      <ArrowUpwardIcon className={"arrow"} />
                    ) : (
                      <ArrowDownwardIcon className={"arrow"} />
                    );
                  }
                })()}
              </TableCell>
              <TableCell
                data="type"
                onClick={(event) =>
                  applySort(event.target.getAttribute("data"))
                }
                className="headerColumn"
              >
                Type{" "}
                {(() => {
                  if (monstersSort.column === "type") {
                    return monstersSort.order === "asc" ? (
                      <ArrowUpwardIcon className={"arrow"} />
                    ) : (
                      <ArrowDownwardIcon className={"arrow"} />
                    );
                  }
                })()}
              </TableCell>
              <TableCell
                data="alignment"
                onClick={(event) =>
                  applySort(event.target.getAttribute("data"))
                }
                className="headerColumn"
              >
                Alignment{" "}
                {(() => {
                  if (monstersSort.column === "alignment") {
                    return monstersSort.order === "asc" ? (
                      <ArrowUpwardIcon className={"arrow"} />
                    ) : (
                      <ArrowDownwardIcon className={"arrow"} />
                    );
                  }
                })()}
              </TableCell>
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
                      setEncounterBuild((currEncounterBuild) =>
                        addToEncounter(1, monster, currEncounterBuild)
                      )
                    }
                  >
                    <AddIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <button onClick={() => openModal(monster)}>
                    {monster.name}
                  </button>
                  {/* <Link to={`/${monster.slug}`}>{monster.name}</Link> */}
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
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
        <button onClick={closeModal}>close</button>
        <div>{modalData.name}</div>
      </Modal>
    </>
  );
};

export default MonstersList;
