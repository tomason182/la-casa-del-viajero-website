import PropTypes from "prop-types";
import styles from "./Location.module.css";

export default function Location({ address, phone }) {
  return (
    <div className={styles.locationContent}>
      <h2>Nuestra ubicación</h2>
      <div className={styles.content}>
        <div className={styles.leftContainer}>
          <div className={styles.items}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="10" r="3" />
              <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
            </svg>
            <p>{address}</p>
          </div>
          <div className={styles.items}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            <p>{phone}</p>
          </div>
        </div>
        <div className={styles.rightContent}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2223.023151676219!2d-71.54332657520418!3d-41.94918412058193!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x961bbe28e71b1abb%3A0x7171afdf200ffa7a!2sHostel%20La%20Casa%20del%20Viajero!5e0!3m2!1ses-419!2sar!4v1733235529266!5m2!1ses-419!2sar"
            width="600"
            height="450"
            allowfullscreen=""
            style={{ border: "none" }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

Location.propTypes = {
  address: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
};
