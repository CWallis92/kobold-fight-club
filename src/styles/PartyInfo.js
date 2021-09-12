import { makeStyles } from "@material-ui/core";

import { theme } from "./Theme";

export const useStyles = makeStyles({
  container: {
    minHeight: "150px",
    paddingBottom: "1em",
    borderBottom: `1px solid ${theme.palette.primary.main}`,
  },
  xpInfo: {
    marginTop: "15px",
  },
  dailyBudget: {
    marginTop: "25px",
  },
  dropdownSize: {
    minWidth: "100%",
  },
  deleteButtons: {
    padding: "5px",
  },
  addButton: {
    marginTop: "5px",
  },
});
