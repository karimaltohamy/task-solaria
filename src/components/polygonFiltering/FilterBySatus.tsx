import React from "react";
import data from "../../assets/data.json";

interface Props {
  handleStatusFilter: (status: string) => void;
  statusFilter: string;
}

const FilterBySatus: React.FC<Props> = ({
  handleStatusFilter,
  statusFilter,
}) => {
  return (
    <div className="availability-filter grid grid-cols-2 gap-2 py-2 border border-gray-300 rounded-md mt-3">
      {["all", ...new Set(data.map((item) => item.status))].map((status) => (
        <button
          key={status}
          className={`filter-status text-[14px] text-[gray] ${
            status == statusFilter ? "text-white" : ""
          }`}
          data-status={status}
          onClick={() => handleStatusFilter(status.toLocaleLowerCase())}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default FilterBySatus;
