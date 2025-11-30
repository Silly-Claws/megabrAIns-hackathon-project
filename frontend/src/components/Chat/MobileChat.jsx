import styles from "./MobileChat.module.css";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import stylesGlass from "../Glass.module.css";
import ChatMessage from "../ChatMessage";

function MobileChat({ className, handleChange, inputValue }) {
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
            {Array.from({ length: 2 }).map((item, index) => (
              <div key={index}>
                <span>
                  {index % 2 === 0 ? (
                    <ChatMessage
                      text={
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                      }
                      author="user"
                      messageBlockWidth="280px"
                    />
                  ) : (
                    <ChatMessage
                      text={
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                      }
                      author="gpt"
                      messageBlockWidth="280px"
                    />
                  )}
                </span>
              </div>
            ))}
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
        <motion.button
          className={`${styles.Toggle__button} ${
            isConversationExpanded
              ? stylesGlass.Glass__orange
              : stylesGlass.Glass__green
          }`}
          onClick={() => setIsConversationExpanded((prev) => !prev)}
          animate={{ rotate: isConversationExpanded ? 0 : 180 }}
          transition={{ duration: 0.3 }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.84611 13.5381L9.4615 13.5381C10.0138 13.5381 10.4615 13.9858 10.4615 14.5381L10.4615 18.1535"
              stroke="#F3F3EF"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M9.69248 14.3072L4.30786 19.6919"
              stroke="#F3F3EF"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M13.5382 5.84657L13.5382 9.46196C13.5382 10.0142 13.9859 10.462 14.5382 10.462L18.1535 10.462"
              stroke="#F3F3EF"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M14.3075 9.69269L19.6921 4.30807"
              stroke="#F3F3EF"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </motion.button>
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
