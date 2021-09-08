import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
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
