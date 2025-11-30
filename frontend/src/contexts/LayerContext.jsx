/* eslint-disable react-refresh/only-export-components */

import {createContext, useContext, useEffect, useRef, useState} from "react";
import {deleteHeatMap, setHeatMap,} from "../components/mapUtils/HeatMap.js";

const LayerContext = createContext(null);

export function LayerContextProvider({ children }) {
  const initialGradients = {
    population: {
      0.0: "rgba(255,0,0,0.0)",
      0.01: "rgba(255,0,0)",
      1.0: "rgb(255,0,0)"
    },
    transportation: {
      0.0: "rgba(0,0,0,0)",
      0.5: "rgba(0,0,255,0.5)",
      1.0: "rgba(100,100,255,1)"
    },
    education: {
      0.0: "rgba(0,0,0,0)",
      0.5: "rgba(0,128,0,0.5)",
      1.0: "rgba(0,255,0,1)"
    },
    social: {
      0.0: "rgba(0,0,0,0)",
      0.5: "rgba(255,255,0,0.5)",
      1.0: "rgba(255,255,100,1)"
    },
    culture: {
      0.0: "rgba(0,0,0,0)",
      0.5: "rgba(255,0,242,0.5)",
      1.0: "rgb(216,100,255)"
    }
  };

  const [heatmaps, setHeatmaps] = useState({});
  const [activeHeatIds, setActiveHeatIds] = useState([]);
  const activeHeatIdsRef = useRef([]);
  const heatLayersRef = useRef({});
  const [mapRef, setMapRef] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const newHeatmaps = {};

      for (const id of Object.keys(availableLayers)) {
        try {
          const response = await fetch(`http://localhost:8080/map?${id}=true`);
          if (!response.ok) throw new Error("Network response was not ok");
          const result = await response.json();

          const layerData = result.find(layer => layer.name === id);
          if (layerData && layerData.points) {
            newHeatmaps[id] = {
              points: layerData.points.map(p => [
                p.coordinate.lat,
                p.coordinate.lon,
                p.weight
              ]),
              gradient: initialGradients[id] || initialGradients.population
            };
          }
        } catch (err) {
          console.error(err.message);
        }
      }

      setHeatmaps(newHeatmaps);
    };

    fetchData();
  }, []);

  const availableLayers = {
    "population": {
      name: "Population",
    },
    "transportation": {
      name: "Transportation",
    },
    "education": {
      name: "Education",
    },
    "social": {
      name: "Social services",
    },
    "culture": {
      name: "Culture",
    },
  }

  function enableHeatmap(id) {
    if (!id || !mapRef?.current || activeHeatIds.includes(id)) return;

    const heat = setHeatMap({
      map: mapRef.current,
      points: heatmaps[id].points,
      gradient: heatmaps[id].gradient,
      radius: 50
    });

    heatLayersRef.current[id] = heat;
    setActiveHeatIds(prev => [...prev, id]);
  }

  function disableHeatmap(id) {
    if (!id || !mapRef.current || !heatLayersRef.current[id]) return;

    setActiveHeatIds(prev => prev.filter(x => x !== id));

    const layer = heatLayersRef.current[id];
    if (!layer) return;

    deleteHeatMap(mapRef.current, layer);
    layer.destroy?.();
    delete heatLayersRef.current[id];

    activeHeatIdsRef.current =
      activeHeatIdsRef.current.filter(x => x !== id);
  }

  function disableAllHeatmaps() {
    activeHeatIds.forEach(id => {
      deleteHeatMap(mapRef.current, heatLayersRef.current[id]);
      heatLayersRef.current[id].destroy?.();
    });
    heatLayersRef.current = {};
    activeHeatIdsRef.current = [];
  }

  return (
    <LayerContext.Provider value={{ setMapRef, availableLayers, enableHeatmap, disableHeatmap, disableAllHeatmaps, activeHeatIds }}>
      {children}
    </LayerContext.Provider>
  );
}

export const useLayerContext = () => useContext(LayerContext);