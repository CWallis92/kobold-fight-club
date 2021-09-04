const EncounterTotal = ({ encounterBuild }) => {
  const totalXP = encounterBuild.reduce(
    (init, next) => init + next.xp * next.count,
    0
  );
  const totalMonsters = encounterBuild.reduce(
    (init, next) => init + next.count,
    0
  );
  let multiplier = 1;
  switch (totalMonsters) {
    case 1:
      break;
    case 2:
      multiplier = 1.5;
      break;
    case 3:
    case 4:
    case 5:
    case 6:
      multiplier = 2;
      break;
    case 7:
    case 8:
    case 9:
    case 10:
      multiplier = 2.5;
      break;
    case 11:
    case 12:
    case 13:
    case 14:
      multiplier = 3;
      break;
    default:
      multiplier = 4;
      break;
  }

  return (
    <div id="encounterTotal">
      <p>Difficulty: XX</p>
      <div id="xpTotals">
        <p>Total XP: {totalXP}</p>
        <p>Adjusted XP: {totalXP * multiplier}</p>
      </div>
    </div>
  );
};

export default EncounterTotal;
