import {
  Checkbox,
  Chip,
  Input,
  ListItemText,
  makeStyles,
  MenuItem,
  Select,
  Slider,
} from "@material-ui/core";
import { memo, useEffect, useState, useContext, useRef } from "react";

import { MonstersContext } from "../utils/Context";
import { valueLabelFormat, descale, scale } from "../utils/crRange";

const useStyles = makeStyles((theme) => ({
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  selectAllText: {
    fontWeight: 800,
  },
}));

const allSizes = ["tiny", "small", "medium", "large", "huge", "gargantuan"];
const allTypes = [
  "aberration",
  "beast", // Make sure beasts are included
  "celestial",
  "construct", // Make sure constructs are included
  "dragon",
  "elemental",
  "fey",
  "fiend",
  "giant",
  "humanoid",
  "monstrosity",
  "ooze",
  "plant",
  "swarm",
  "undead",
];

const MonstersFilter = () => {
  const classes = useStyles();

  const { fullMonsters, filteredMonsters, setFilteredMonsters } =
    useContext(MonstersContext);
  const fullRef = useRef(fullMonsters);

  const [searchTerm, setSearchTerm] = useState("");

  const [sizes, setSizes] = useState(allSizes);
  const allSizesSelected =
    allSizes.length > 0 && sizes.length === allSizes.length;

  const [types, setTypes] = useState(allTypes);
  const allTypesSelected =
    allTypes.length > 0 && types.length === allTypes.length;

  const [crRange, setCrRange] = useState([0, 30]);

  const updateSizes = (event) => {
    const value = event.target.value;
    if (value[value.length - 1] === "all") {
      setSizes(sizes.length === allSizes.length ? [] : allSizes);
      return;
    }
    setSizes(event.target.value);
  };

  const updateTypes = (event) => {
    const value = event.target.value;
    if (value[value.length - 1] === "all") {
      setTypes(types.length === allTypes.length ? [] : allTypes);
      return;
    }
    setTypes(event.target.value);
  };

  useEffect(() => {
    setFilteredMonsters(() => {
      return fullRef.current.filter((monster) => {
        let cr = monster.challenge_rating;
        if (cr.indexOf("/") > -1) {
          cr = 1 / parseInt(cr.slice(-1));
        } else cr = parseInt(cr);

        return (
          monster.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 &&
          sizes.includes(monster.size.toLowerCase()) &&
          types.find((type) => monster.type.toLowerCase().indexOf(type) > -1) &&
          cr >= crRange[0] &&
          cr <= crRange[1]
        );
      });
    });
  }, [searchTerm, sizes, types, crRange, setFilteredMonsters]);

  return (
    <div id="monstersFilter">
      <fieldset>
        <legend>Search</legend>
        <input
          id="search"
          type="text"
          val={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </fieldset>
      <fieldset>
        <legend>Size</legend>
        <Select
          labelId="sizesMultiSelect"
          id="sizesMultiSelect"
          multiple
          value={sizes}
          onChange={updateSizes}
          input={<Input />}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {selected.map((value) => (
                <Chip
                  key={value}
                  label={value[0].toUpperCase() + value.slice(1)}
                  className={classes.chip}
                />
              ))}
            </div>
          )}
        >
          <MenuItem
            value="all"
            classes={{
              root: allSizesSelected ? classes.selectedAll : "",
            }}
          >
            <Checkbox
              checked={allSizesSelected}
              indeterminate={sizes.length > 0 && sizes.length < allSizes.length}
            />
            <ListItemText
              primary="Select All"
              classes={{ primary: classes.selectAllText }}
            />
          </MenuItem>
          {allSizes.map((size) => (
            <MenuItem key={size} value={size}>
              <Checkbox checked={sizes.indexOf(size) > -1} />
              <ListItemText primary={size[0].toUpperCase() + size.slice(1)} />
            </MenuItem>
          ))}
        </Select>
      </fieldset>
      <fieldset>
        <legend>Type</legend>
        <Select
          labelId="typesMultiSelect"
          id="typesMultiSelect"
          multiple
          value={types}
          onChange={updateTypes}
          input={<Input />}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {selected.map((value) => (
                <Chip
                  key={value}
                  label={value[0].toUpperCase() + value.slice(1)}
                  className={classes.chip}
                />
              ))}
            </div>
          )}
        >
          <MenuItem
            value="all"
            classes={{
              root: allTypesSelected ? classes.selectedAll : "",
            }}
          >
            <Checkbox
              checked={allTypesSelected}
              indeterminate={types.length > 0 && types.length < allTypes.length}
            />
            <ListItemText
              primary="Select All"
              classes={{ primary: classes.selectAllText }}
            />
          </MenuItem>
          {allTypes.map((type) => (
            <MenuItem key={type} value={type}>
              <Checkbox checked={types.indexOf(type) > -1} />
              <ListItemText primary={type[0].toUpperCase() + type.slice(1)} />
            </MenuItem>
          ))}
        </Select>
      </fieldset>
      <fieldset>
        <legend>Challenge Rating</legend>
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
      </fieldset>
      <p>Total Results: {filteredMonsters.length}</p>
    </div>
  );
};

export default memo(MonstersFilter);
