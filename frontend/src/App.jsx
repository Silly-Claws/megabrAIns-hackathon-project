import styles from "./App.module.css";
import "./App.module.css";
import Header from "./components/Header.jsx";
import Map from "./components/Map.jsx";
import LayerPicker from "./components/LayerPicker.jsx";
import Chat from "./components/Chat/Chat.jsx";
import MobileChat from "./components/Chat/MobileChat.jsx";
import { useState } from "react";
import { useWindow } from "./hooks/useWindow.js";

import { useChat } from "./hooks/useChat.js";

import { Zoom } from "leaflet/src/control/Control.Zoom.js";

import ZoomButton from "./components/mapUtils/ZoomButton.jsx";

function App() {
  const [value, setValue] = useState("");
  const { windowWidth } = useWindow();

  const [messages, setMessages] = useState([]);

  const { sendRequest } = useChat();

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  function handleSendQuery() {
    if (value.trim().length === 0) return;
    const prompt = `User context: ${messages.join(
      "; "
    )}; Current prompt: ${value}`;

    setMessages((prev) => [...prev, value]);
    setValue("");

    sendRequest(prompt).then(
      (response) =>
        response && setMessages((prev) => [...prev, response.response])
    );
  }

  return (
    <div className={styles.Main__wrapper}>
      <Header className={styles.Header} />
      <Map className={styles.Map} />
      <ZoomButton className={styles.Zoom__button} />
      {windowWidth > 478 ? (
        <Chat
          className={styles.Chat}
          inputValue={value}
          handleChange={handleChange}
          handleSendQuery={handleSendQuery}
          messages={messages}
        />
      ) : (
        <MobileChat
          className={styles.MobileChat}
          inputValue={value}
          handleChange={handleChange}
          handleSendQuery={handleSendQuery}
          messages={messages}
        />
      )}
    </div>
  );
}

export default App;
