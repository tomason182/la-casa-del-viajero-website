import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div>
        <h1>Logo del hostel</h1>
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
