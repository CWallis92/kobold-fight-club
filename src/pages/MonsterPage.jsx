import { useParams } from "react-router";

const MonsterPage = () => {
  const { monster_name } = useParams();

  console.log(monster_name);

  return <div>{monster_name}</div>;
};

export default MonsterPage;
