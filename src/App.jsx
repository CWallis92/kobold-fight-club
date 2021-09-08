import { useState } from "react";

import { EncounterCol, MonstersCol } from "./Components";
import { EncounterContext } from "./utils/contexts";
import "./styles/App.css";

function App() {
  const [encounterBuild, setEncounterBuild] = useState([]);

  return (
    <EncounterContext.Provider value={{ encounterBuild, setEncounterBuild }}>
      <div className="App">
        <main>
          <EncounterCol />
          <MonstersCol />
        </main>
      </div>
    </EncounterContext.Provider>
  );
}

export default App;
