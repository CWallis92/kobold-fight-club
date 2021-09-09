import { Fragment } from "react";

import { budgets } from "../../utils/characterXPThresholds";

const EncounterParty = ({ party, setParty, difficulty }) => {
  const partyBudget = party.reduce((prev, curr) => {
    return prev + budgets[curr[0]] * curr[1];
  }, 0);

  const addRows = () => {
    setParty((currParty) => {
      const newParty = JSON.parse(JSON.stringify(currParty));
      newParty.push([1, 1]);
      return newParty;
    });
  };
  const removeRows = () => {
    setParty((currParty) => {
      const newParty = JSON.parse(JSON.stringify(currParty));
      newParty.pop();
      return newParty;
    });
  };

  const updateAmount = (event, row) => {
    setParty((currParty) => {
      const newParty = JSON.parse(JSON.stringify(currParty));
      newParty[row] = [newParty[row][0], parseInt(event.target.value)];
      return newParty;
    });
  };

  const updateLevel = (event, row) => {
    setParty((currParty) => {
      const newParty = JSON.parse(JSON.stringify(currParty));
      newParty[row] = [parseInt(event.target.value), newParty[row][1]];
      return newParty;
    });
  };

  return (
    <section id="encounterParty">
      <span>No. of Players</span>
      <span>Level</span>
      <br />
      {party.map((row, rowIndex) => {
        return (
          <Fragment key={rowIndex}>
            <select
              className="partySize"
              value={party[rowIndex][1]}
              onChange={(event) => updateAmount(event, rowIndex)}
            >
              {[...Array(12).keys()].map((item) => (
                <option key={item + 1} value={item + 1}>
                  {item + 1}
                </option>
              ))}
            </select>
            <select
              className="partyLevel"
              value={party[rowIndex][0]}
              onChange={(event) => updateLevel(event, rowIndex)}
            >
              {[...Array(20).keys()].map((item) => (
                <option key={item + 1} value={item + 1}>
                  {item + 1}
                </option>
              ))}
            </select>
            {rowIndex > 0 && <button onClick={removeRows}>➖</button>}
            <br />
          </Fragment>
        );
      })}
      {party.length < 10 && <button onClick={addRows}>➕</button>}
      {Object.keys(difficulty).map((item) => (
        <p key={item}>
          {item[0].toUpperCase() + item.slice(1)}: {difficulty[item]}XP
        </p>
      ))}
      <p>Daily budget: {partyBudget}XP</p>
    </section>
  );
};

export default EncounterParty;
