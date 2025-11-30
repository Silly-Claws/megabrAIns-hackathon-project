import styles from "./ChatMessage.module.css";
import stylesGlass from "./Glass.module.css";

function ChatMessage({ text, author, messageBlockWidth }) {
  return (
    <div
      className={
        author === "user"
          ? styles.Chat__message__right + ' ' + stylesGlass.Glass__green
          : styles.Chat__message__left + ' ' + stylesGlass.Glass__orange
      }
      style={{ width: messageBlockWidth }}
    >
      {text}
    </div>
  );
}

export default ChatMessage;
