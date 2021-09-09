import { TableCell } from "@material-ui/core";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

import { listSort } from "../../utils/monsterListFunctions";

const MonsterTableHeader = ({
  column,
  prettyColumn,
  monstersSort,
  setMonstersSort,
  setFilteredMonsters,
}) => {
  const applySort = () => {
    const initialSort = monstersSort;
    setMonstersSort((currSort) => {
      return {
        column: column,
        order:
          column !== currSort.column || currSort.order === "desc"
            ? "asc"
            : "desc",
      };
    });
    setFilteredMonsters((currList) => {
      const newList = JSON.parse(JSON.stringify(currList));
      return listSort(initialSort.column, column, newList);
    });
  };

  return (
    <TableCell data={column} onClick={applySort} className="headerColumn">
      {`${prettyColumn} `}
      {(() => {
        if (monstersSort.column === column) {
          return monstersSort.order === "asc" ? (
            <ArrowUpwardIcon className={"arrow"} />
          ) : (
            <ArrowDownwardIcon className={"arrow"} />
          );
        }
      })()}
    </TableCell>
  );
};

export default MonsterTableHeader;
