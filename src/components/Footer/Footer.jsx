import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div>
          <h2>La Casa del Viajero</h2>
        </div>
        <div>
          <p>Av. Las Flores 4220</p>
          <p>El bolsón, Rio Negro</p>
        </div>
        <div>
          <p>Tel: 294 - xxxx - xxxx</p>
          <p>email: some@email.com</p>
        </div>
        <div>
          <p>facebook</p>
          <p>instagram</p>
        </div>
      </div>
      <div className={styles.copyright}>
        <p>© SimpleHostel - www.simplehostel.net</p>
      </div>
    </footer>
  );
}
