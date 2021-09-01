import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

import { useMonsterData } from "../hooks/useMonster";

const MonsterRow = ({ monster, updateEncounterBuild }) => {
  const { monsterData } = useMonsterData(monster.index);

  return (
    <div>
      <Button onClick={() => updateEncounterBuild(monster.index)}>➕</Button>
      <Link to={`/${monster.index}`}>{monster.name}</Link>
      <p>{monsterData}</p>
    </div>
  );
};

export default MonsterRow;
