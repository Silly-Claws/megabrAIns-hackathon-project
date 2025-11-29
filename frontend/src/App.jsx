import styles from "./App.module.css";
import "./App.module.css";
import Header from "./components/Header.jsx";
import Map from "./components/Map.jsx";
import LayerPicker from "./components/LayerPicker.jsx";
import Chat from "./components/Chat.jsx";
import MobileChat from "./components/MobileChat.jsx";
import { useState } from "react";
import { useWindow } from "./hooks/useWindow.js";

function App() {
  const [value, setValue] = useState("");
  const { windowWidth } = useWindow();

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSendQuery = (value) => {
    console.log(value);
  };

  return (
    <div className={styles.Main__wrapper}>
      <Header className={styles.Header} />
      <Map className={styles.Map} />
      <LayerPicker className={styles.LayerPicker} />
      {/*{windowWidth > 478 ? (*/}
      {/*  <Chat*/}
      {/*    className={styles.Chat}*/}
      {/*    inputValue={value}*/}
      {/*    handleChange={handleChange}*/}
      {/*    handleSendQuery={handleSendQuery}*/}
      {/*  />*/}
      {/*) : (*/}
      {/*  <MobileChat className={styles.MobileChat} />*/}
      {/*)}*/}
    </div>
  );
}

export default App;
