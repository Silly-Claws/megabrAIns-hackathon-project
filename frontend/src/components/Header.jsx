import styles from "./Header.module.css";
import stylesGlass from "./Glass.module.css";

function Header({className}) {
  return (
    <div className={styles.Header + ' ' + (className || '') + ' ' + stylesGlass.Glass}>

    </div>
  );
}

export default Header;
