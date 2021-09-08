import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  //Table
  root: {
    width: "100%",
  },
  container: {
    maxHeight: "70vh",
  },
  //Filter
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
}));
