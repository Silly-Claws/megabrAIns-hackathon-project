import styles from "./App.module.css";
import "./App.module.css";
import Header from "./components/Header.jsx";
import Map from "./components/Map.jsx";
import Chat from "./components/Chat.jsx";

function App() {
  return (
    <div className={styles.Main__wrapper}>
      <Header className={styles.Header} />
      <Map className={styles.Map} />
      <Chat className={styles.Chat} />
    </div>
  );
}

export default App;
