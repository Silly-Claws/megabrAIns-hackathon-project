import styles from "./MobileChat.module.css";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import stylesGlass from "../Glass.module.css";
import ChatMessage from "../ChatMessage";

function MobileChat({
  className,
  handleChange,
  inputValue,
  messages,
  handleSendQuery,
}) {
  const [showLayers, setShowLayers] = useState(false);
  const [isConversationExpanded, setIsConversationExpanded] = useState(false);

  return (
    <div
      className={
        styles.Chat + " " + (className || "") + "" + " " + stylesGlass.Glass
      }
    >
      <AnimatePresence>
        {isConversationExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={styles.Minimize__icon__wrapper}
          >
            <button onClick={() => setIsConversationExpanded((prev) => !prev)}>
              "Minimize Icon"
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isConversationExpanded && (
          <motion.div
            className={styles.Chat__history}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <AnimatePresence mode="popLayout">
              {messages.map((item, index) => (
                <motion.div
                  key={index}
                  className={
                    index % 2 === 0 ? styles.User__Message : styles.GPT__Message
                  }
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  {index % 2 === 0 ? (
                    <ChatMessage
                      text={item}
                      author="user"
                      messageBlockWidth="280px"
                    />
                  ) : (
                    <ChatMessage
                      text={item}
                      author="gpt"
                      messageBlockWidth="280px"
                    />
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={styles.Chat__wrapper}>
        <button
          className={`${styles.Button} ${
            showLayers ? stylesGlass.Glass__orange : stylesGlass.Glass__green
          }`}
          onClick={() => setShowLayers((prev) => !prev)}
        >
          <svg
            className={styles.Button__icon}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.7189 9.52728L19.8442 10.677L20.2891 10.9269C21.237 11.4595 21.237 12.8325 20.2891 13.365L14.2525 16.7566C12.8524 17.5432 11.1476 17.5432 9.74754 16.7566L3.71092 13.365C2.76302 12.8325 2.76303 11.4595 3.71093 10.9269L4.15585 10.677L6.16334 9.52728M18.1811 14.6461L20.1129 15.6185C21.1092 16.1201 21.1412 17.5398 20.1685 18.0862L14.2525 21.4101C12.8524 22.1966 11.1476 22.1966 9.74754 21.4101L3.9178 18.1347C2.9284 17.5789 2.98291 16.1278 4.0112 15.6487L6.16334 14.6461M14.2525 11.8112L20.2891 8.41961C21.237 7.88705 21.237 6.51405 20.2891 5.98149L14.2525 2.58993C12.8524 1.80336 11.1476 1.80336 9.74754 2.58993L3.71093 5.98149C2.76303 6.51405 2.76302 7.88705 3.71092 8.41961L9.74754 11.8112C11.1476 12.5977 12.8524 12.5977 14.2525 11.8112Z"
              stroke="#F3F3EF"
              strokeWidth="1.5"
            />
          </svg>
        </button>
        <textarea
          className={styles.Chat__input + " " + stylesGlass.Glass__green}
          value={inputValue}
          onChange={handleChange}
        />

        {!isConversationExpanded ? (
          <button
            className={`${styles.Toggle__button} ${
              isConversationExpanded
                ? stylesGlass.Glass__orange
                : stylesGlass.Glass__green
            }`}
            onClick={() => setIsConversationExpanded((prev) => !prev)}
          >
            <svg
              className={styles.Toggle__button__icon}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.61539 19.3846L5 19.3846C4.44772 19.3846 4 18.9369 4 18.3846L4 14.7692M4.76918 18.6155L10.1538 13.2309M19.3844 8.61514L19.3844 4.99976C19.3844 4.44747 18.9367 3.99976 18.3844 3.99976L14.769 3.99976M18.6152 4.76902L13.2305 10.1536"
                stroke="#F3F3EF"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        ) : (
          <button
            className={`${styles.Toggle__button} ${stylesGlass.Glass__green}`}
            onClick={() => handleSendQuery()}
          >
            <svg
              className={styles.Toggle__button__icon}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.7232 4.75895C18.6613 4.44624 19.5538 5.33873 19.2411 6.27684L14.1845 21.4467C13.8561 22.4318 12.5163 22.5631 12.0029 21.6603L8.9078 16.2172C8.64089 15.7478 8.25223 15.3591 7.78283 15.0922L2.33973 11.9971C1.437 11.4838 1.56824 10.1439 2.55342 9.81555L17.7232 4.75895Z"
                stroke="#F3F3EF"
                strokeWidth="1.5"
              />
              <path
                d="M10.7856 13.2144L8.78564 15.2144"
                stroke="#F3F3EF"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>
      <AnimatePresence>
        {showLayers && (
          <motion.div
            className={styles.Layer__list}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {[
              "Population",
              "Population",
              "Population",
              "Population",
              "Population",
            ].map((item, idx) => (
              <motion.span
                key={idx}
                className={styles.Layer__item}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                {item}
              </motion.span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default MobileChat;
