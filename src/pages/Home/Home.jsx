import styles from "./Home.module.css";

export default function Home() {
  return (
    <>
      <section className={styles.mainContent}>
        <div className={styles.bookingContent}>
          <h2>Reservá tu próxima estadia</h2>
        </div>
      </section>
      <section className={styles.about}>
        <h2>Acerca de nuestra casa</h2>
        <p>
          En La Casa del Viajero encontraras un entorno cuidado con el cariño de
          quienes aprecian la naturaleza podrás encontrar casas construidas en
          adobe y madera, que las hacen frescas en el verano y cálidas cuando
          llegan los tiempos más fríos, armonizando con el calor humano que
          compartimos en este rincón de la Patagonia cordillerana.
        </p>
        <button>Mas Info</button>
      </section>
      <section className={styles.rooms}>
        <div className={styles.backgroundImg}>
          <h2>Nuestros cuartos</h2>
        </div>

        <div>
          <div>El refugio</div>
          <div>La casita</div>
          <div>El ranchito</div>
        </div>
      </section>
    </>
  );
}
