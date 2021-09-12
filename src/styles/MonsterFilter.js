import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
  container: {
    padding: "0 0.5em",
    marginBottom: "1em",
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
