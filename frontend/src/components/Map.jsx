import { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet.heat";

import styles from "./Map.module.css";

function Map({ className }) {
  useEffect(() => {
    const map = L.map("map").setView([48.721182, 21.257564], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const marker = L.marker([48.721182, 21.257564]).addTo(map);
    marker.bindPopup("Košice").openPopup();

    return () => map.remove();
  }, []);

  return (
    <div
      id="map"
      className={`${styles.Map} ${className || ""}`}
      style={{ width: "100%", height: "100vh" }}
    />
  );
}

export default Map;