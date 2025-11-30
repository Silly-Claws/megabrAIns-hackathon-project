import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet.heat";

import styles from "./Map.module.css";
import { useLayerContext } from "../contexts/LayerContext.jsx";
import { BOTTOM_RIGHT, DEFAULT_MAP_ZOOM, TOP_LEFT } from "../constants.js";

function Map({ className }) {
  const mapRef = useRef(null);

  const { setMapRef } = useLayerContext();

  useEffect(() => {
    mapRef.current = L.map("map", {
      maxBounds: [TOP_LEFT, BOTTOM_RIGHT],
      center: [48.721182, 21.257564],
      zoom: DEFAULT_MAP_ZOOM,
      minZoom: DEFAULT_MAP_ZOOM,
      maxZoom: 18,
      zoomControl: false,
    }).setView([48.721182, 21.257564], DEFAULT_MAP_ZOOM);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapRef.current);

    // const initialPoints = [
    //   [48.721182, 21.257564, 0.8],
    //   [48.722, 21.26, 0.7],
    //   [48.719, 21.25, 0.6],
    // ];
    //
    // heatRef.current = L.heatLayer(initialPoints, {
    //   radius: 50,
    //   blur: 25,
    //   maxZoom: 17,
    //   gradient: {
    //     0.0: "rgba(0,0,0,0)",
    //     0.2: "rgba(0,128,0,0.3)",
    //     0.5: "rgba(0,200,0,0.6)",
    //     1.0: "rgba(0,255,0,1)"
    //   }
    // }).addTo(mapRef.current);

    setMapRef(mapRef);

    return () => mapRef.current.remove();
  }, []);

  return (
    <>
      <div
        id="map"
        className={`${styles.Map} ${className || ""}`}
        style={{ width: "100%", height: "100vh" }}
      />
    </>
  );
}

export default Map;
