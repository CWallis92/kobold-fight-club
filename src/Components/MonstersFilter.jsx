import { Slider, Typography } from "@material-ui/core";
import { memo, useEffect, useState, useContext, useRef } from "react";

import { MonstersContext } from "../utils/Context";
import { valueLabelFormat, descale, scale } from "../utils/crRange";

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
  const [crRange, setCrRange] = useState([0, 30]);

  useEffect(() => {
    setFilteredMonsters(() => {
      return fullRef.current.filter((monster) => {
        let cr = monster.challenge_rating;
        if (cr.indexOf("/") > -1) {
          cr = 1 / parseInt(cr.slice(-1));
        } else cr = parseInt(cr);

        return (
          monster.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 &&
          sizes[monster.size.toLowerCase()] &&
          cr >= crRange[0] &&
          cr <= crRange[1]
        );
      });
    });
  }, [searchTerm, sizes, crRange, setFilteredMonsters]);

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
      <Typography id="cr-slider" gutterBottom>
        Challenge Rating
      </Typography>
      <Slider
        value={[descale(crRange[0]), descale(crRange[1])]}
        onChange={(e, value) => {
          setCrRange([scale(value[0]), scale(value[1])]);
        }}
        valueLabelFormat={valueLabelFormat}
        valueLabelDisplay="auto"
        aria-labelledby="cr-slider"
        min={0}
        max={33}
        scale={scale}
        marks
      />
      <p>Total Results: {filteredMonsters.length}</p>
    </div>
  );
};

export default memo(MonstersFilter);
