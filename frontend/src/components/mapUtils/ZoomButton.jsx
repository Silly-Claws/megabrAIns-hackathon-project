import styles from './ZoomButton.module.css';
import {useLayerContext} from "../../contexts/LayerContext.jsx";
import stylesGlass from "../Glass.module.css";

function ZoomButton({className}) {
  const {mapRef} = useLayerContext();

  // eslint-disable-next-line react-hooks/refs
  const map = mapRef?.current || null;

  return (
    <div className={styles.ZoomButton + ' ' + (className || '') + ' ' + stylesGlass.Glass}>
      <button
        className={styles.Button + ' ' + stylesGlass.Glass__green}
        onClick={() => map?.zoomIn()}
      >
        <svg
          className={styles.Icon}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#F3F3EF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 5 L12 19" />
          <path d="M5 12 L19 12" />
        </svg>
      </button>

      <button
        className={styles.Button + ' ' + stylesGlass.Glass__green}
        onClick={() => map?.zoomOut()}
      >
        <svg
          className={styles.Icon}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#F3F3EF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12 L19 12" />
        </svg>
      </button>
    </div>
  );
}

export default ZoomButton;