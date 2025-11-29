import L from "leaflet";
import "leaflet.heat";
import {DEFAULT_MAP_ZOOM, POINTS_BLUR, POINTS_RADIUS} from "../../constants.js";

const zoomToRadius = {
  16: 1,
  15: 0.5,
  14: 0.25,
  13: 0.125,
  12: 0.0625,
};

export function setHeatMap({ map, points, gradient, baseRadius = POINTS_RADIUS}) {
  if (!map || !points || points.length === 0) return null;

  const radius = getRadius();

  const heatLayer = L.heatLayer(points, {
    radius: radius,
    blur: radius / 2,
    gradient,
    minOpacity: 0,
  }).addTo(map);

  function getRadius() {
    const zoom = map.getZoom();

    console.log("New zoom: " + zoom);

    const newBaseRadius = baseRadius * zoomToRadius[zoom];

    console.log("New baseRadius: " + newBaseRadius);

    return newBaseRadius;
  }

  function onZoom() {
    const radius = getRadius();
    heatLayer.setOptions({
      radius: radius,
      blur: radius / 2,
      gradient,
      minOpacity: 0,
    });
    heatLayer.redraw();
  }

  map.on("zoomend", onZoom);

  return {
    layer: heatLayer,
    destroy() {
      map.off("zoomend", onZoom);
      if (heatLayer) map.removeLayer(heatLayer);
    }
  };
}

export function deleteHeatMap(map, heatLayer) {
  if (!map || !heatLayer) return;
  map.removeLayer(heatLayer);
}