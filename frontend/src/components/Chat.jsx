import { useState } from "react";
import styles from "./Chat.module.css";

function Chat({ className, handleChange, inputValue }) {
  return (
    <div className={styles.Chat + " " + (className || "")}>
      <div className={styles.Menu__arrowIcon__wrapper}>
        <span>Minimize icon</span>
      </div>

      <div className={styles.Chat__wrapper}>
        <button className={styles.Button}>Send</button>
        <textarea
          className={styles.Chat__input}
          value={inputValue}
          onChange={handleChange}
          rows={4}
        />
        <button className={styles.Button}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
