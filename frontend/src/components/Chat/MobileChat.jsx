import styles from "./MobileChat.module.css";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

function MobileChat({ className, handleChange, inputValue }) {
  const [showLayers, setShowLayers] = useState(false);
  const [isConversationExpanded, setIsConversationExpanded] = useState(false);

  return (
    <div className={styles.Chat + " " + (className || "")}>
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
          onChange={handleChange}
          rows={3}
        />
        <button
          className={styles.Button}
          onClick={() => setIsConversationExpanded((prev) => !prev)}
        >
          Expand
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
