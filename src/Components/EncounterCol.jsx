import { useContext } from "react";

import {
  EncounterParty,
  EncounterRandomizer,
  EncounterBuild,
  EncounterTotal,
} from ".";
import { EncounterContext } from "../utils/contexts";

const EncounterCol = () => {
  const { encounterBuild, setEncounterBuild } = useContext(EncounterContext);

  return (
    <div id="leftCol" className="col">
      <EncounterParty />
      <h2>Encounter</h2>
      <EncounterRandomizer setEncounterBuild={setEncounterBuild} />
      {encounterBuild.length === 0 && <p>Start adding some monsters</p>}
      {encounterBuild.length > 0 && (
        <>
          <EncounterBuild
            encounterBuild={encounterBuild}
            setEncounterBuild={setEncounterBuild}
          />
          <EncounterTotal encounterBuild={encounterBuild} />
        </>
      )}
    </div>
  );
};

export default EncounterCol;
