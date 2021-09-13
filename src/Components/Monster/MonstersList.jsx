import { useContext, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  IconButton,
  TablePagination,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import AddIcon from "@material-ui/icons/Add";

import { MonsterTableHeader, TablePaginationActions } from "..";
import { useStyles } from "../../styles/MonsterList";
import { MonstersContext, EncounterContext } from "../../utils/contexts";
import { addToEncounter } from "../../utils/encounterBuild";

const MonstersList = () => {
  const classes = useStyles();
  const matches = useMediaQuery((theme) => theme.breakpoints.down("xs"));
  const StyledTableRow = withStyles((theme) => ({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

  const {
    filteredMonsters,
    setFilteredMonsters,
    monstersSort,
    setMonstersSort,
  } = useContext(MonstersContext);
  const { setEncounterBuild } = useContext(EncounterContext);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const columns = {
    name: "Monster Name",
    challenge_rating: "CR",
    size: "Size",
    type: "Type",
    alignment: "Alignment",
  };

  return (
    <>
      <TableContainer className={classes.container} component={Card}>
        <Table stickyHeader aria-label="Monsters Table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              {matches ? (
                <MonsterTableHeader
                  column="name"
                  prettyColumn="Monster"
                  monstersSort={monstersSort}
                  setMonstersSort={setMonstersSort}
                  setFilteredMonsters={setFilteredMonsters}
                />
              ) : (
                Object.keys(columns).map((column) => (
                  <MonsterTableHeader
                    key={column}
                    column={column}
                    prettyColumn={columns[column]}
                    monstersSort={monstersSort}
                    setMonstersSort={setMonstersSort}
                    setFilteredMonsters={setFilteredMonsters}
                  />
                ))
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredMonsters
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((monster) => (
                <StyledTableRow key={monster.slug}>
                  <TableCell align="center" padding="checkbox">
                    <IconButton
                      color="primary"
                      size="small"
                      onClick={() =>
                        setEncounterBuild((currEncounterBuild) =>
                          addToEncounter(1, monster, currEncounterBuild)
                        )
                      }
                    >
                      <AddIcon />
                    </IconButton>
                    {matches && (
                      <Typography variant="caption">
                        CR: {monster.challenge_rating}
                      </Typography>
                    )}
                  </TableCell>
                  {matches ? (
                    <TableCell>
                      <Typography variant="h6">{monster.name}</Typography>
                      <div className={classes.mobileRow}>
                        <Typography variant="body2">
                          {`Size: ${monster.size}`}
                        </Typography>
                      </div>
                      <div className={classes.mobileRow}>
                        <Typography variant="body2">
                          {`Type: ${monster.type}`}
                        </Typography>
                      </div>
                      <div className={classes.mobileRow}>
                        <Typography variant="body2">
                          {`Alignment: ${monster.alignment}`}
                        </Typography>
                      </div>
                    </TableCell>
                  ) : (
                    Object.keys(columns).map((column) => (
                      <TableCell key={column}>{monster[column]}</TableCell>
                    ))
                  )}
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        rowsPerPageOptions={[10, 25]}
        count={filteredMonsters.length}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        ActionsComponent={TablePaginationActions}
      />
    </>
  );
};

export default MonstersList;
