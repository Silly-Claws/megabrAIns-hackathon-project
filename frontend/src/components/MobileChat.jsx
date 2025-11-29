import styles from "./MobileChat.module.css";

function MobileChat({ className, handleChange, inputValue }) {
  return (
    <div className={styles.Chat + " " + (className || "")}>
      <textarea
        className={styles.Chat__input}
        value={inputValue}
        onChange={handleChange}
        rows={4}
      />
    </div>
  );
}

export default MobileChat;
