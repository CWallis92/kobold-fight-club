import { memo, useEffect, useState, useContext, useRef } from "react";

import { MonstersContext } from "../utils/Context";

const MonstersFilter = () => {
  const { fullMonsters, filteredMonsters, setFilteredMonsters } =
    useContext(MonstersContext);
  const fullRef = useRef(fullMonsters);
  const [searchTerm, setSearchTerm] = useState("");
  const [sizes, setSizes] = useState({
    tiny: true,
    small: true,
    medium: true,
    large: true,
    huge: true,
    gargantuan: true,
  });

  useEffect(() => {
    setFilteredMonsters(() => {
      return fullRef.current.filter(
        (monster) =>
          monster.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 &&
          sizes[monster.size.toLowerCase()]
      );
    });
  }, [sizes, searchTerm, setFilteredMonsters]);

  const updateSizes = (size) => {
    setSizes((currSizes) => {
      const newSizes = { ...currSizes };
      newSizes[size] = !newSizes[size];
      return newSizes;
    });
  };

  return (
    <div id="monstersFilter">
      <label htmlFor="search">Search</label>
      <input
        id="search"
        type="text"
        val={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      <div>
        {Object.keys(sizes).map((size) => {
          return (
            <div key={size}>
              <input
                type="checkbox"
                id={`size__${size}`}
                name={size}
                checked={sizes[size]}
                onChange={(event) => updateSizes(event.target.name)}
              />
              <label htmlFor={`size__${size}`}>
                {size[0].toUpperCase() + size.slice(1)}
              </label>
            </div>
          );
        })}
      </div>
      <p>Total Results: {filteredMonsters.length}</p>
    </div>
  );
};

export default memo(MonstersFilter);
