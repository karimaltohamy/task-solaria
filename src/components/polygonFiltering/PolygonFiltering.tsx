import { useEffect, useState } from "react";
import MultiRangeSlider from "../multiRangeSlider/MultiRangeSlider";
import "./polygonFiltring.scss";
import data from "../../assets/data.json";
import FilterByType from "./FilterByType";
import FilterBySatus from "./FilterBySatus";

interface RangeValue {
  min: number;
  max: number;
}

const PolygonFiltering = () => {
  const maxPrice = Math.max(...data.map((item) => item.price));
  const [areaValue, setAreaValue] = useState<RangeValue>({ min: 0, max: 1000 });
  const [priceValue, setPriceValue] = useState<RangeValue>({
    min: 0,
    max: maxPrice,
  });
  const [active, setActive] = useState<string>("type");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [filterType, setFilterType] = useState<string>("");

  // Apply filters based on selected values
  const applyFilters = () => {
    const type = filterType;
    const status = statusFilter;
    const priceMin = priceValue.min;
    const priceMax = priceValue.max;

    document.querySelectorAll(".filtered-item").forEach((item) => {
      const itemType = item.getAttribute("data-type");
      const itemStatus = item.getAttribute("data-status");
      // const itemArea = Number(item.getAttribute("data-area"));
      const itemPrice = Number(item.getAttribute("data-price"));

      const matchesType = !type || itemType === type;
      const matchesStatus =
        !status || status === "all" || itemStatus === status;
      // const matchesArea = itemArea >= areaMin && itemArea <= areaMax;
      const matchesPrice = itemPrice >= priceMin && itemPrice <= priceMax;

      if (matchesStatus && matchesPrice && matchesType) {
        item.classList.remove("hidden");
      } else {
        item.classList.add("hidden");
      }
    });
  };

  // Event handler for type filter
  const handleTypeFilter = (selectedType: any) => {
    if (filterType === selectedType) {
      setFilterType("");
    } else {
      setFilterType(selectedType);
    }
  };

  useEffect(() => {
    // Remove active class from all filter buttons
    document
      .querySelectorAll(".filter-type")
      .forEach((btn) => btn.classList.remove("active"));
    document
      .querySelector(`.filter-type[data-type="${filterType}"]`)
      ?.classList.add("active");
    applyFilters();
  }, [filterType]);

  // ##################################################

  // Event handler for status filter
  const handleStatusFilter = (selectedStatus: any) => {
    setStatusFilter(selectedStatus);
  };

  useEffect(() => {
    // Remove active class from all filter buttons
    document
      .querySelectorAll(".filter-status")
      .forEach((btn) => btn.classList.remove("active"));

    // Add active class to the selected status button
    document
      .querySelector(`[data-status="${statusFilter}"]`)
      ?.classList.add("active");

    // Apply the filters after updating the class
    applyFilters();
  }, [statusFilter]);

  // Apply filters on page load
  useEffect(() => {
    applyFilters();
  }, []);

  return (
    <div className="polygon_filtering">
      {/* top */}
      <div className="top flex items-end gap-5 justify-center">
        <button
          className={active === "type" ? "active" : ""}
          onClick={() => setActive("type")}
        >
          <span className="dot"></span>
          <h6>Type</h6>
        </button>
        <button
          className={active === "availability" ? "active" : ""}
          onClick={() => setActive("availability")}
        >
          <span className="dot"></span>
          <h6>Availability</h6>
        </button>
      </div>

      {/* Filter by Type */}
      {active === "type" && (
        <FilterByType handleTypeFilter={handleTypeFilter} />
      )}

      {/* Filter by Status */}
      {active === "availability" && (
        <FilterBySatus
          handleStatusFilter={handleStatusFilter}
          statusFilter={statusFilter}
        />
      )}

      {/* Range Inputs */}
      <div className="inputs mt-5">
        <div className="input_item">
          <label className="flex items-center justify-between text-[12px]">
            <span>Area</span>

            <div>
              <span id="area-min">
                {areaValue.min.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </span>{" "}
              -{" "}
              <span id="area-max">
                {areaValue.max.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </span>{" "}
              Sq.m
            </div>
          </label>
          <MultiRangeSlider
            min={0}
            max={1000}
            onChange={({ min, max }) => {
              setAreaValue({ min, max });
              document
                .querySelector("#area-min")
                ?.setAttribute("data-min", min);
              document
                .querySelector("#area-max")
                ?.setAttribute("data-max", max);
              applyFilters();
            }}
          />
        </div>
        <div className="input_item">
          <label className="flex items-center justify-between text-[12px]">
            <span>Price</span>
            <div>
              LE{" "}
              <span id="price-min">
                {priceValue.min.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </span>{" "}
              {" - "}
              <span id="price-max">
                {priceValue.max.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </span>{" "}
              M
            </div>
          </label>

          <MultiRangeSlider
            min={0}
            max={maxPrice}
            onChange={({ min, max }) => {
              setPriceValue({ min, max });
              document
                .querySelector("#price-min")
                ?.setAttribute("data-min", min);
              document
                .querySelector("#price-max")
                ?.setAttribute("data-max", max);
              applyFilters();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PolygonFiltering;
