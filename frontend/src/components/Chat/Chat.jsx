import { useState } from "react";
import styles from "./Chat.module.css";
import { AnimatePresence, motion } from "framer-motion";
import stylesGlass from "../Glass.module.css";
import ChatMessage from "../ChatMessage";
import LayerPicker from "../LayerPicker.jsx";

function Chat({ className, handleChange, inputValue }) {
  const [showLayers, setShowLayers] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <motion.div
      className={
        styles.Chat + " " + (className || "") + " " + stylesGlass.Glass
      }
      initial={{
        width: 0,
        opacity: 0,
      }}
      animate={{
        width: isExpanded ? "500px" : 60,
        opacity: 1,
      }}
      exit={{ width: 0, opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      layout
    >
      <div className={styles.Menu__arrowIcon__wrapper}>
        <motion.button
          className={`${styles.Toggle__button} ${
            isExpanded ? stylesGlass.Glass__orange : stylesGlass.Glass__green
          }`}
          onClick={() => setIsExpanded((prev) => !prev)}
          animate={{ rotate: isExpanded ? 0 : 180 }}
          transition={{ duration: 0.3 }}
          title={isExpanded ? "Minimize" : "Expand"}
        >
          {isExpanded ? (
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
          ) : (
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
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
          )}
        </motion.button>
      </div>

      <AnimatePresence mode="wait">
        {isExpanded && (
          <div>
            <motion.div
              className={styles.Chat__history}
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              {Array.from({ length: 2 }).map((item, index) => (
                <div
                  key={index}
                  className={
                    index % 2 === 0 ? styles.User__Message : styles.GPT__Message
                  }
                >
                  <span>
                    {index % 2 === 0 ? (
                      <ChatMessage
                        text={
                          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                        }
                        author="user"
                      />
                    ) : (
                      <ChatMessage
                        text={
                          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                        }
                        author="gpt"
                      />
                    )}
                  </span>
                </div>
              ))}
            </motion.div>
            <div className={styles.Chat__wrapper}>
              <button
                className={`${styles.Button} ${
                  showLayers
                    ? stylesGlass.Glass__orange
                    : stylesGlass.Glass__green
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
              <button
                className={`${styles.Button} ${stylesGlass.Glass__green}`}
              >
                <svg
                  className={styles.Button__icon}
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="8"
                    y="2"
                    width="8"
                    height="13"
                    rx="4"
                    stroke="#F3F3EF"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M20 11.5C20 15.9183 16.4183 19.5 12 19.5C7.58172 19.5 4 15.9183 4 11.5"
                    stroke="#F3F3EF"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M12 22V20"
                    stroke="#F3F3EF"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
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
                  <LayerPicker />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Chat;
