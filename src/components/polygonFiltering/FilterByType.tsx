import React from "react";

interface Props {
  handleTypeFilter: (type: string) => void;
}

const FilterByType: React.FC<Props> = ({ handleTypeFilter }) => {
  return (
    <div className="items">
      <button
        className="filter-type item bg-[#46E282]"
        data-type="Commercial"
        onClick={() => handleTypeFilter("Commercial")}
      >
        Commercial
      </button>
      <button
        className="filter-type item bg-[#CC8B2A]"
        data-type="Administrative"
        onClick={() => handleTypeFilter("Administrative")}
      >
        Administrative
      </button>
      <button
        className="filter-type item bg-[#2A73D6]"
        data-type="Clinical"
        onClick={() => handleTypeFilter("Clinical")}
      >
        Clinical
      </button>
    </div>
  );
};

export default FilterByType;
