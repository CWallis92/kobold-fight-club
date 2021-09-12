import { createTheme } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";

export const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: "#f44336",
    },
  },
});
