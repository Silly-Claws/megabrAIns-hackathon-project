/* eslint-disable react-refresh/only-export-components */

import {createContext, useContext, useEffect, useRef, useState} from "react";
import {deleteHeatMap, setHeatMap,} from "../components/mapUtils/HeatMap.js";

const LayerContext = createContext(null);

export function LayerContextProvider({ children }) {
  const [mapRef, setMapRef] = useState(null);
  const activeHeatIdsRef = useRef([]);
  const heatLayersRef = useRef({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/map?population=true`);
        if (!response.ok) throw new Error("Network response was not ok");
        const result = await response.json();

        const populationData = result.find(layer => layer.name === "population");
        if (populationData && populationData.points) {
          heatmaps.population.points = populationData.points.map(p => [
            p.coordinate.lat,
            p.coordinate.lon,
            p.weight
          ]);
        }
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchData();
  }, [])

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
    "socialServices": {
      name: "Social services",
    },
    "culture": {
      name: "Culture",
    },
  }

  const heatmaps = {
    population: {
      points: [
        [48.721182, 21.257564, 1],
        [48.722, 21.26, 0.8],
        [48.719, 21.25, 0.6],
      ],
      gradient: {
        0.0: "rgba(255,0,0,0.5)",
        0.5: "rgba(255,0,0,0.8)",
        1.0: "rgb(255,0,0)"
      }
    },
    transportation: {
      points: [
        [48.722, 21.257, 1],
        [48.723, 21.26, 0.7],
        [48.720, 21.254, 0.6],
      ],
      gradient: {
        0.0: "rgba(0,0,0,0)",
        0.5: "rgba(0,0,255,0.5)",
        1.0: "rgba(100,100,255,1)"
      }
    },
    education: {
      points: [
        [48.721, 21.259, 0.8],
        [48.7195, 21.258, 0.7],
        [48.724, 21.257, 0.9],
      ],
      gradient: {
        0.0: "rgba(0,0,0,0)",
        0.5: "rgba(0,128,0,0.5)",
        1.0: "rgba(0,255,0,1)"
      }
    },
    socialServices: {
      points: [
        [48.7225, 21.256, 0.7],
        [48.7205, 21.259, 0.8],
        [48.723, 21.255, 0.6],
      ],
      gradient: {
        0.0: "rgba(0,0,0,0)",
        0.5: "rgba(255,255,0,0.5)",
        1.0: "rgba(255,255,100,1)"
      }
    },
    culture: {
      points: [
        [48.722, 21.257, 1],
        [48.723, 21.26, 0.7],
        [48.720, 21.254, 0.6],
      ],
      gradient: {
        0.0: "rgba(0,0,0,0)",
        0.5: "rgba(255,0,242,0.5)",
        1.0: "rgb(216,100,255)"
      }
    },
  };

  function enableHeatmap(id) {
    if (!id || !mapRef.current) return;
    if (activeHeatIdsRef.current.includes(id)) return;

    const heat = setHeatMap({
      map: mapRef.current,
      points: heatmaps[id].points,
      gradient: heatmaps[id].gradient,
      radius: 50
    });

    heatLayersRef.current[id] = heat;
    activeHeatIdsRef.current.push(id);
  }

  function disableHeatmap(id) {
    if (!id || !mapRef.current || !heatLayersRef.current[id]) return;

    const layer = heatLayersRef.current[id];
    if (!layer) return;

    deleteHeatMap(mapRef.current, layer);
    layer.destroy?.();
    delete heatLayersRef.current[id];

    activeHeatIdsRef.current =
      activeHeatIdsRef.current.filter(x => x !== id);
  }

  function disableAllHeatmaps() {
    activeHeatIdsRef.current.forEach(id => {
      deleteHeatMap(mapRef.current, heatLayersRef.current[id]);
    });
    heatLayersRef.current = {};
    activeHeatIdsRef.current = [];
  }

  return (
    <LayerContext.Provider value={{ setMapRef, availableLayers, enableHeatmap, disableHeatmap, disableAllHeatmaps }}>
      {children}
    </LayerContext.Provider>
  );
}

export const useLayerContext = () => useContext(LayerContext);