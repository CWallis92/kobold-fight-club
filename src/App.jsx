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
        <div className="App">
          <Grid container spacing={1}>
            <Grid item sm={12} md={5} lg={4}>
              <EncounterCol />
            </Grid>
            <Grid item sm={12} md={7} lg={8}>
              <MonstersCol />
            </Grid>
          </Grid>
        </div>
      </EncounterContext.Provider>
    </ThemeProvider>
  );
}

export default App;
