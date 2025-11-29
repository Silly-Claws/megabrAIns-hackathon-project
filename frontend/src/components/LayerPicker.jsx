import styles from './LayerPicker.module.css';
import {useState} from "react";
import {useLayerContext} from "../contexts/LayerContext.jsx";

function LayerPicker({ className }) {
  const { availableLayers, enableHeatmap, disableHeatmap } = useLayerContext();

  const layerKeys = Object.keys(availableLayers);

  const initialState = Object.fromEntries(
    layerKeys.map(key => [key, false])
  );

  const [checked, setChecked] = useState(initialState);

  const handleChange = (layerId) => {
    const newValue = !checked[layerId];

    setChecked(prev => ({
      ...prev,
      [layerId]: newValue
    }));

    if (newValue) {
      enableHeatmap(layerId);
    } else {
      disableHeatmap(layerId);
    }
  };


  return (
    <div className={styles.LayerPicker + ' ' + (className || '')}>
      {layerKeys.map(layerId => (
        <label key={layerId} style={{ display: "block", marginBottom: "5px" }}>
          <input
            type="checkbox"
            checked={checked[layerId]}
            onChange={() => handleChange(layerId)}
          />
          {availableLayers[layerId].name}
        </label>
      ))}
    </div>
  );
}

export default LayerPicker;