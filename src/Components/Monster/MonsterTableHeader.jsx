import { TableCell, TableSortLabel } from "@material-ui/core";

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
          column !== currSort.column || currSort.order === "asc"
            ? "desc"
            : "asc",
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
      <TableSortLabel
        active={monstersSort.column === column}
        direction={monstersSort.order}
        className={"arrow"}
      />
    </TableCell>
  );
};

export default MonsterTableHeader;
