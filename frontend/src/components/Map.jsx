import styles from './Map.module.css';
import {useEffect} from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function Map({className}) {
  useEffect(() => {
    const map = L.map("map").setView([48.72118205130795, 21.2575640746237], 11);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png")
      .addTo(map);

    const points = [
      [48.721, 21.257, 0.2],
      [48.722, 21.258, 0.4],
      [48.723, 21.256, 0.6],
      [48.720, 21.255, 0.9],
    ];

    L.marker([48.72118205130795, 21.2575640746237]).addTo(map);

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div
      className={styles.Map + ' ' + (className || '')}
      id="map"
    >

    </div>
  );
}

export default Map;