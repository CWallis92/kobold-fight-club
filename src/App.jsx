import { useState } from "react";
import { Grid } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";

import { EncounterCol, MonstersCol } from "./Components";
import { EncounterContext } from "./utils/contexts";
import "./styles/App.css";
import { theme } from "./styles/Theme";

function App() {
  const [encounterBuild, setEncounterBuild] = useState([]);

  return (
    <ThemeProvider theme={theme}>
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
