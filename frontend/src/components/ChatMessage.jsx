import styles from "./ChatMessage.module.css";

function ChatMessage({ text, author, messageBlockWidth }) {
  return (
    <div
      className={
        author === "user"
          ? styles.Chat__message__right
          : styles.Chat__message__left
      }
      style={{ width: messageBlockWidth }}
    >
      {text}
    </div>
  );
}

export default ChatMessage;
