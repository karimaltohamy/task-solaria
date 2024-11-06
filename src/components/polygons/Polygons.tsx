import data from "../../assets/data.json";
import "./polygons.scss";

const Polygons = () => {
  return (
    <div className="filtered-results z-30 mt-5 h-full">
      <ul className="filtered-items grid grid-cols-3 gap-4 h-full">
        {data.map((item) => (
          <li
            key={item.code}
            className="filtered-item text-white"
            data-status={item.status}
            data-price={item.price}
            data-type={item.type}
            style={{
              position: "absolute",
              top: item.position.top || "auto",
              left: item.position.left || "auto",
              right: item.position.right || "auto",
              bottom: item.position.bottom || "auto",
            }}
          >
            <div className="circle">
              <span></span>
            </div>

            <div className="box">
              <div className="line">
                <h6 className="text-sm">Unit 104</h6>
                <span
                  className={`py-[2px] px-2 text-[13px] ${
                    item.status === "available" ? "bg-green-600" : "bg-red-600"
                  }  text-white rounded`}
                >
                  {item.status}
                </span>
              </div>
              <div className="line">
                <h6 className="text-sm">Unit Type</h6>
                <p>{item.type}</p>
              </div>
              <div className="line">
                <h6 className="text-sm">Total Area</h6>
                <p>53 M2</p>
              </div>
              <div className="line">
                <h6 className="text-sm">Price</h6>
                <p>
                  {item.price.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}{" "}
                  EGP
                </p>
              </div>
              <button className="bg-white text-black p-1 w-full rounded-md mt-3">
                Callback
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Polygons;
