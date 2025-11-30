import styles from './LayerPicker.module.css';
import {useEffect, useState} from "react";
import {useLayerContext} from "../contexts/LayerContext.jsx";

function LayerPicker({ className }) {
  const { availableLayers, enableHeatmap, disableHeatmap, activeHeatIds } = useLayerContext();

  const layerKeys = Object.keys(availableLayers);

  const handleChange = (layerId) => {
    if (activeHeatIds.includes(layerId)) {
      disableHeatmap(layerId);
    } else {
      enableHeatmap(layerId);
    }
  };

  return (
    <div className={styles.LayerPicker + ' ' + (className || '')}>
      {layerKeys.map(layerId => (
        <label key={layerId} className={styles.Checkbox}>
          <input
            type="checkbox"
            checked={activeHeatIds.includes(layerId)}
            onChange={() => handleChange(layerId)}
          />
          <span className={styles.Checkmark}></span>
          {availableLayers[layerId].name}
        </label>
      ))}
    </div>
  );
}

export default LayerPicker;