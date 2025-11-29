import { useState } from "react";
import styles from "./Chat.module.css";

function Chat({ className }) {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSendQuery = (value) => {
    console.log(value);
  };

  return (
    <div className={styles.Chat + " " + (className || "")}>
      <div className={styles.Menu__arrowIcon__wrapper}>
        <span>Minimize icon</span>
      </div>

      <textarea
        className={styles.Chat__input}
        value={value}
        onChange={handleChange}
        rows={4}
      />
    </div>
  );
}

export default Chat;
