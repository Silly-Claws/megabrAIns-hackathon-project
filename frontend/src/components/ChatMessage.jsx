import styles from "./ChatMessage.module.css";

function ChatMessage({ text, author }) {
  return (
    <div
      className={
        author === "user"
          ? styles.Chat__message__right
          : styles.Chat__message__left
      }
    >
      {text}
    </div>
  );
}

export default ChatMessage;
