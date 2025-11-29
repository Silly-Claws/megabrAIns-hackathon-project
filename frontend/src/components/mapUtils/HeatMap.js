import L from "leaflet";
import "leaflet.heat";

export function setHeatMap({ map, heatLayer, points, gradient }) {
  if (heatLayer) {
    map.removeLayer(heatLayer);
    heatLayer = null;
  }

  heatLayer = L.heatLayer(points, {
    radius: 50,
    blur: 25,
    maxZoom: 17,
    gradient
  }).addTo(map);

  return heatLayer;
}

export function deleteHeatMap(map, heatLayer) {
  if (heatLayer) {
    map.removeLayer(heatLayer);
    heatLayer = null;
  }
  return null;
}