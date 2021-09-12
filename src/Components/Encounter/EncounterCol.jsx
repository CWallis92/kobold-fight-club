import { Typography } from "@material-ui/core";
import { useContext } from "react";

import {
  EncounterParty,
  EncounterRandomizer,
  EncounterBuild,
  EncounterTotal,
} from "..";
import useParty from "../../hooks/useParty";
import { EncounterContext } from "../../utils/contexts";

const EncounterCol = () => {
  const { encounterBuild, setEncounterBuild } = useContext(EncounterContext);

  const { party, setParty, difficulty } = useParty();

  return (
    <>
      <EncounterParty
        party={party}
        setParty={setParty}
        difficulty={difficulty}
      />
      <Typography variant="h5" gutterBottom>
        Encounter
      </Typography>
      <EncounterRandomizer setEncounterBuild={setEncounterBuild} />
      {encounterBuild.length === 0 && (
        <Typography variant="body1">Start adding some monsters</Typography>
      )}
      {encounterBuild.length > 0 && (
        <>
          <EncounterBuild
            encounterBuild={encounterBuild}
            setEncounterBuild={setEncounterBuild}
          />
          <EncounterTotal
            encounterBuild={encounterBuild}
            party={party}
            difficulty={difficulty}
          />
        </>
      )}
    </>
  );
};

export default EncounterCol;
