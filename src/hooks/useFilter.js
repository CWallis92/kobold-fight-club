import { useState, useEffect, useRef } from "react";

import {
  allSizes,
  allTypes,
  allAlignments,
  allLegendary,
} from "../utils/monsterListFunctions";

export const useFilter = (fullMonsters, setFilteredMonsters) => {
  const fullRef = useRef(fullMonsters);

  const [searchTerm, setSearchTerm] = useState("");

  const [sizes, setSizes] = useState(allSizes);
  const allSizesSelected =
    allSizes.length > 0 && sizes.length === allSizes.length;

  const [types, setTypes] = useState(allTypes);
  const allTypesSelected =
    allTypes.length > 0 && types.length === allTypes.length;

  const [alignments, setAlignments] = useState(allAlignments);
  const allAlignmentsSelected =
    allAlignments.length > 0 && alignments.length === allAlignments.length;

  const [legendary, setLegendary] = useState(allLegendary);

  const [crRange, setCrRange] = useState([0, 30]);

  useEffect(() => {
    setFilteredMonsters(() => {
      return fullRef.current.filter((monster) => {
        let cr = monster.challenge_rating;
        if (cr.indexOf("/") > -1) {
          cr = 1 / parseInt(cr.slice(-1));
        } else cr = parseInt(cr);

        const searchFilter =
          monster.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
        const sizeFilter = sizes.includes(monster.size.toLowerCase());
        const typeFilter = types.find(
          (type) => monster.type.toLowerCase().indexOf(type) > -1
        );
        const alignmentFilter =
          alignments.find(
            (alignment) =>
              monster.alignment.toLowerCase().indexOf(alignment) > -1
          ) ||
          (alignments.includes("other") &&
            !allAlignments.find(
              (alignment) =>
                monster.alignment.toLowerCase().indexOf(alignment) > -1
            ));
        const legendaryFilter =
          (legendary.includes("legendary") && monster.legendary_desc !== "") ||
          (legendary.includes("ordinary") && monster.legendary_desc === "");
        const crFilter = cr >= crRange[0] && cr <= crRange[1];

        return (
          searchFilter &&
          sizeFilter &&
          typeFilter &&
          alignmentFilter &&
          legendaryFilter &&
          crFilter
        );
      });
    });
  }, [
    searchTerm,
    sizes,
    types,
    alignments,
    legendary,
    crRange,
    setFilteredMonsters,
  ]);

  return {
    searchTerm,
    setSearchTerm,
    sizes,
    setSizes,
    allSizesSelected,
    types,
    setTypes,
    allTypesSelected,
    alignments,
    setAlignments,
    allAlignmentsSelected,
    legendary,
    setLegendary,
    crRange,
    setCrRange,
  };
};
