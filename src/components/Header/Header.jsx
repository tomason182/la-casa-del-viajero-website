import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div>
        <p>Logo del hostel</p>
      </div>
      <nav>
        <ul className={styles.navList}>
          <li>Servicios</li>
          <li>Nuestros cuartos</li>
          <li>Contactanos</li>
          <li>Sobre Nosotros</li>
        </ul>
      </nav>
    </header>
  );
}
