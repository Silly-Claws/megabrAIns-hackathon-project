import styles from './LayerPicker.module.css';
import {useState} from "react";
import {useLayerContext} from "../contexts/LayerContext.jsx";

function LayerPicker({ className }) {
  const { enableHeatmap, disableHeatmap } = useLayerContext();

  const layers = [0, 1, 2, 3];
  const [checked, setChecked] = useState({
    0: false,
    1: false,
    2: false,
    3: false
  });

  const handleChange = (id) => {
    const newValue = !checked[id];
    setChecked(prev => ({ ...prev, [id]: newValue }));

    const heatmapKey = `heat${id + 1}`;

    if (newValue) {
      enableHeatmap(heatmapKey);
    } else {
      disableHeatmap(heatmapKey);
    }
  };

  return (
    <div className={styles.LayerPicker + ' ' + (className || '')}>
      {layers.map(id => (
        <label key={id} style={{ display: "block", marginBottom: "5px" }}>
          <input
            type="checkbox"
            checked={checked[id]}
            onChange={() => handleChange(id)}
          />
          {id}
        </label>
      ))}
    </div>
  );
}

export default LayerPicker;