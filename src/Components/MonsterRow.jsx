import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

import { useMonsterData } from "../hooks/useMonsterData";

const MonsterRow = ({ monster, updateEncounterBuild }) => {
  const { monsterData } = useMonsterData(monster.index);

  return monsterData ? (
    <tr>
      <td>
        <Button onClick={() => updateEncounterBuild(monster.index)}>➕</Button>
      </td>
      <td>
        <Link to={`/${monster.index}`}>{monster.name}</Link>
      </td>
      <td>{monsterData.challenge_rating}</td>
      <td>{monsterData.size}</td>
      <td>{monsterData.type}</td>
      <td>{monsterData.alignment}</td>
    </tr>
  ) : (
    <p>Not found</p>
  );
};

export default MonsterRow;
