import styles from './Header.module.css';

function Header({className}) {
  return (
    <>
      <div className={styles.Header + ' ' + (className || '')}>

      </div>

      <svg style={{ display: 'none' }}>
        <filter id="displacementFilter">
          <feTurbulence type="turbulence"
                        baseFrequency="0.01"
                        numOctaves="2"
                        result="turbulence"
          />

          <feDisplacementMap in="SourceGraphic"
                             in2="turbulence"
                             scale="200" xChannelSelector="R" yChannelSelector="G"
          />
        </filter>
      </svg>
    </>
  );
}

export default Header;