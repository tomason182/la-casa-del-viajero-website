import Header from "../../components/Header/Header.jsx";
import AvailabilityForm from "../../components/Forms/AvailabilityForm";
import styles from "./SearchResult.module.css";

export default function SearchResult() {
  const propertyInfo = {
    name: "La Casa del Viajero",
    address: "Av. Las Flores 4220",
    province: "Rio Negro",
    country: "Argentina",
  };

  return (
    <>
      <Header />
      <main>
        <section className={styles.searchContainer}>
          <AvailabilityForm />
        </section>
        <section className={styles.searchDisplay}>
          <div className={styles.propertyInfo}>
            <h2>{propertyInfo.name}</h2>
            <div className={styles.location}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#000000"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="10" r="3" />
                <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
              </svg>
              <p>
                {propertyInfo.address}, {propertyInfo.province},
                {propertyInfo.country}
              </p>
            </div>
          </div>
          <div className={styles.mainContent}>
            <div className={styles.roomsContainer}></div>
            <div className={styles.priceDetailsContainer}></div>
          </div>
        </section>
      </main>
    </>
  );
}
