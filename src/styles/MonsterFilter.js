import { makeStyles } from "@material-ui/core";

import { theme } from "./Theme";

export const useStyles = makeStyles({
  container: {
    padding: "0 0.5em 1em",
    marginBottom: "1em",
    borderBottom: `1px solid ${theme.palette.primary.main}`,
  },
  fields: {
    width: "100%",
  },
  formControl: {
    minWidth: "100%",
    maxWidth: 300,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  selectAllText: {
    fontWeight: 800,
  },
});
