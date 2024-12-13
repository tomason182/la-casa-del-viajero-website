import styles from "./Header.module.css";
import { Link } from "react-router";

export default function Header() {
  return (
    <header className={styles.header}>
      <div>
        <p>Logo del hostel</p>
      </div>
      <nav>
        <ul className={styles.navList}>
          <li>
            <Link to="/searchresult">Reservar</Link>
          </li>
          <li>Nuestros cuartos</li>
          <li>Contactanos</li>
          <li>Sobre Nosotros</li>
        </ul>
      </nav>
    </header>
  );
}
