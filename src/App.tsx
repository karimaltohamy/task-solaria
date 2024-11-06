import image from "./assets/0-floor.png";
import svgOverlay from "./assets/0-floor.svg";
import PolygonFiltering from "./components/polygonFiltering/PolygonFiltering";
import "./index.scss";
import Polygons from "./components/polygons/Polygons";

function App() {
  return (
    <div className="h-screen relative">
      <img
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          backgroundColor: "#272727",
          objectFit: "cover",
        }}
        src={image}
      />
      <img
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
        src={svgOverlay}
      />

      {/* polygons */}
      <Polygons />

      {/* polygon filtering */}
      <PolygonFiltering />
    </div>
  );
}

export default App;
