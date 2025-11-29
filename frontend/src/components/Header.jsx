import styles from "./Header.module.css";

function Header({ className }) {
  return <div className={styles.Header + " " + (className || "")}></div>;
}

export default Header;
