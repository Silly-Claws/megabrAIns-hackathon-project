import {useEffect, useRef} from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet.heat";

import styles from "./Map.module.css";

function Map({ className }) {
  const mapRef = useRef(null);
  const heatRef = useRef(null);

  useEffect(() => {
    mapRef.current = L.map("map").setView([48.721182, 21.257564], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapRef.current);

    const initialPoints = [
      [48.721182, 21.257564, 0.8],
      [48.722, 21.26, 0.7],
      [48.719, 21.25, 0.6],
    ];

    heatRef.current = L.heatLayer(initialPoints, {
      radius: 50,
      blur: 25,
      maxZoom: 17,
      gradient: {
        0.0: "rgba(0,0,0,0)",
        0.2: "rgba(0,128,0,0.3)",
        0.5: "rgba(0,200,0,0.6)",
        1.0: "rgba(0,255,0,1)"
      }
    }).addTo(mapRef.current);

    return () => mapRef.current.remove();
  }, []);

  const updateHeatmap = () => {
    const newPoints = [
      [48.721, 21.257, 1],
      [48.7225, 21.261, 0.9],
      [48.720, 21.253, 0.7],
      [48.724, 21.259, 0.8],
    ];

    const newGradient = {
      0.0: "rgba(0,0,0,0)",
      0.2: "rgba(0,0,255,0.3)",
      0.5: "rgba(0,128,255,0.6)",
      1.0: "rgba(0,255,255,1)"
    };

    heatRef.current.setLatLngs(newPoints);
    heatRef.current.setOptions({ gradient: newGradient });
  };

  return (
    <>
      <div
        id="map"
        className={`${styles.Map} ${className || ""}`}
        style={{ width: "100%", height: "100vh" }}
      />

      <button className={styles.TestButton} onClick={updateHeatmap} style={{ marginTop: 10 }}>aboba</button>
    </>
  );
}

export default Map;