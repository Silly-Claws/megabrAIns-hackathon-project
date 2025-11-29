import styles from './App.module.css';
import './App.module.css'
import Header from "./components/Header.jsx";
import Map from "./components/Map.jsx";
import LayerPicker from "./components/LayerPicker.jsx";

function App() {
  return (
    <div className={styles.Main__wrapper}>
      <Header className={styles.Header} />
      <Map className={styles.Map} />
      <LayerPicker className={styles.LayerPicker} />
    </div>
  )
}

export default App
