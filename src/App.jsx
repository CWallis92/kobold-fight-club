import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./styles/App.css";
import { EncounterBuilder } from "./pages";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <EncounterBuilder />
          </Route>
          {/* <Route path="/:monster_name">
            <MonsterPage />
          </Route> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
