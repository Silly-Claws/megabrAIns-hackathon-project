import styles from "./Header.module.css";
import stylesGlass from "./Glass.module.css";
import logo from '../assets/logo.svg';

function Header({className}) {
  return (
    <div className={styles.Header + ' ' + (className || '') + ' ' + stylesGlass.Glass}>
      <div className={styles.Logo__wrapper}>
        <img src={logo} className={styles.Logo} />
        <div className={styles.Title__wrapper}>
          <h1>Area</h1>
          <h2>Campfire</h2>
        </div>
      </div>
    </div>
  );
}

export default Header;
