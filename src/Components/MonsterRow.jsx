import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

import { updateEncounterBuild } from "../utils/encounterBuild";

const MonsterRow = ({ monster, setEncounterBuild }) => {
  return monster ? (
    <tr>
      <td>
        <Button
          onClick={() => updateEncounterBuild(monster, setEncounterBuild)}
        >
          ➕
        </Button>
      </td>
      <td>
        <Link to={`/${monster.slug}`}>{monster.name}</Link>
      </td>
      <td>{monster.challenge_rating}</td>
      <td>{monster.size}</td>
      <td>{monster.type}</td>
      <td>{monster.alignment}</td>
    </tr>
  ) : (
    <p>Not found</p>
  );
};

export default MonsterRow;
