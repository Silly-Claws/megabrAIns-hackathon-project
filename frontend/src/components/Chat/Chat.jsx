import { useState } from "react";
import styles from "./Chat.module.css";
import { AnimatePresence, motion } from "framer-motion";
import stylesGlass from "../Glass.module.css";

function Chat({ className, handleChange, inputValue }) {
  const [showLayers, setShowLayers] = useState(false);

  return (
    <div className={styles.Chat + " " + (className || "") + ' ' + stylesGlass.Glass}>
      <div className={styles.Menu__arrowIcon__wrapper}>
        <span>Minimize icon</span>
      </div>
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
    </div>
  );
}

export default Chat;
