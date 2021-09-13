import { useMemo, useState } from "react";
import {
  Grid,
  useMediaQuery,
  createTheme,
  CssBaseline,
} from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";

import { EncounterCol, MonstersCol } from "./Components";
import { EncounterContext } from "./utils/contexts";

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = useMemo(
    () =>
      createTheme({
        overrides: {
          MuiCssBaseline: {
            "@global": {
              body: {
                margin: "1em",
              },
            },
          },
        },
        palette: {
          type: prefersDarkMode ? "dark" : "light",
          primary: {
            main: "#f0d2cf",
          },
          secondary: {
            main: "#f44336",
          },
        },
      }),
    [prefersDarkMode]
  );

  const [encounterBuild, setEncounterBuild] = useState([]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <EncounterContext.Provider value={{ encounterBuild, setEncounterBuild }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={5} lg={4}>
            <EncounterCol />
          </Grid>
          <Grid item xs={12} sm={12} md={7} lg={8}>
            <MonstersCol />
          </Grid>
        </Grid>
      </EncounterContext.Provider>
    </ThemeProvider>
  );
}

export default App;
