import { TableCell } from "@material-ui/core";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

import { applySort } from "../../utils/monsterListFunctions";

const MonsterTableHeader = ({
  column,
  prettyColumn,
  monstersSort,
  setMonstersSort,
  setFilteredMonsters,
}) => {
  return (
    <TableCell
      data={column}
      onClick={(event) =>
        applySort(
          monstersSort,
          event.target.getAttribute("data"),
          setFilteredMonsters,
          setMonstersSort
        )
      }
      className="headerColumn"
    >
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
