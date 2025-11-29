import { useState } from "react";
import styles from "./Chat.module.css";
import { AnimatePresence, motion } from "framer-motion";

function Chat({ className, handleChange, inputValue }) {
  const [showLayers, setShowLayers] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <motion.div
      className={styles.Chat + " " + (className || "")}
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: isExpanded ? "auto" : 60, opacity: 0.8 }}
      exit={{ width: 0, opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      layout
    >
      <div className={styles.Menu__arrowIcon__wrapper}>
        <motion.button
          className={styles.ToggleButton}
          onClick={() => setIsExpanded((prev) => !prev)}
          animate={{ rotate: isExpanded ? 0 : 180 }}
          transition={{ duration: 0.3 }}
          title={isExpanded ? "Minimize" : "Expand"}
        >
          ◀
        </motion.button>
      </div>
      <AnimatePresence mode="wait">
        {isExpanded && (
          <motion.div
            className={styles.Chat__history}
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {Array.from({ length: 30 }).map((item, index) => (
              <div
                key={index}
                className={index % 2 === 0 ? styles.User__Message : ""}
              >
                <span>{index % 2 === 0 ? "User message" : "Chat message"}</span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {isExpanded && (
          <div>
            <div className={styles.Chat__wrapper}>
              <button
                className={styles.Button}
                onClick={() => setShowLayers((prev) => !prev)}
              >
                Layers
              </button>
              <textarea
                className={styles.Chat__input}
                value={inputValue}
                s
                onChange={handleChange}
                rows={4}
              />
              <button className={styles.Button}>Send</button>
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
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Chat;
