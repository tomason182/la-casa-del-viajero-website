import Header from "../../components/Header/Header.jsx";
import AvailabilityForm from "../../components/Forms/AvailabilityForm.jsx";
import AvailabilitySearch from "../../components/AvailabilitySearch/AvailabilitySearch.jsx";
import styles from "./SearchResult.module.css";
import { useEffect, useState } from "react";

export default function SearchResult() {
  const [selectedNumGuest, setSelectedNumOfGuest] = useState({});
  const [formBody, setFormBody] = useState({
    checkIn: "",
    checkOut: "",
    numOfGuest: "",
  });

  const [numberOfNights, setNumberOfNights] = useState(0);
  const [availableRoomTypes, setAvailableRoomTypes] = useState([]);

  useEffect(() => {
    function fetchAvailability() {
      // Cuando el usuario hace click en buscar disponibilidad se modifica el objeto formBody
      // Al modificase formBody, se dispara este useEffect que debe realizar un fetch al servidor buscando disponibilidad
      // Si hay disponibilidad devuelve una lista con los tipos de cuartos disponibles

      if (formBody.checkIn !== "") {
        setAvailableRoomTypes([
          {
            _id: "roomType001",
            property_id: "property001",
            description: "Bed in 4max dormitory",
            type: "dorm",
            gender: "mixed",
            max_occupancy: "4",
            inventory: "1",
            base_rate: "16",
            currency: "USD",
            rates_and_availability: [
              {
                _id: "rates_001",
                start_date: new Date(2025, 1, 1),
                end_date: new Date(2025, 3, 30),
                custom_rate: "20",
                custom_availability: 4,
              },
              {
                _id: "rates_002",
                start_date: new Date(2025, 4, 1),
                end_date: new Date(2025, 5, 30),
                custom_rate: "20",
                custom_availability: 4,
              },
            ],
            amenities: [
              "baño compartido",
              "cocina compartida",
              "ropa de cama",
              "heladera compartida",
              "calefaccion",
              "papel higenico",
              "toallas",
            ],

            availability: "7", // La api deberia devolver en el objeto roomType la disponibilidad en cada uno.
          },
          {
            _id: "roomType002",
            property_id: "property001",
            description: "Private room with bathroom",
            type: "private",
            gender: "mixed",
            max_occupancy: 2,
            inventory: 2,
            base_rate: "32",
            currency: "USD",
            rates_and_availability: [
              {
                _id: "rates_002",
                start_date: new Date(2025, 1, 1),
                end_date: new Date(2025, 3, 30),
                custom_rate: "42",
                custom_availability: 2,
              },
            ],
            amenities: [
              "baño privado",
              "cocina compartida",
              "ropa de cama",
              "heladera compartida",
              "calefaccion",
              "papel higenico",
              "toallas",
            ],
            availability: "3",
          },
        ]);
      }
    }
    function calculateNumberOfNights() {
      if (formBody.checkIn && formBody.checkOut) {
        const [checkInYear, checkInMonth, checkInDate] =
          formBody.checkIn.split("-");
        const [checkOutYear, checkOutMonth, checkOutDate] =
          formBody.checkOut.split("-");
        const checkInFormatted = new Date(
          checkInYear,
          checkInMonth - 1,
          checkInDate
        );
        const checkOutFormatted = new Date(
          checkOutYear,
          checkOutMonth - 1,
          checkOutDate
        );

        const nights =
          (checkOutFormatted - checkInFormatted) / (1000 * 3600 * 24);
        setNumberOfNights(nights);
      }
    }

    fetchAvailability();
    calculateNumberOfNights();
  }, [formBody]);

  const propertyInfo = {
    _id: "property001",
    property_name: "La casa del viajero",
    address: {
      street: "Av. Las Flores 4220",
      city: "el bolson",
      postal_code: "7230",
      country: "Argentina",
    },
    contact_info: {
      phone_number: "2281515151",
      email: "lacasadelviajero@mail.com",
    },
  };

  return (
    <>
      <Header />
      <main>
        <section className={styles.searchContainer}>
          <AvailabilityForm formBody={formBody} setFormBody={setFormBody} />
        </section>
        <section className={styles.searchDisplay}>
          <div className={styles.propertyInfo}>
            <h2>{propertyInfo?.property_name}</h2>
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
                {propertyInfo?.address.street}
                {", "}
                {propertyInfo?.address.city}
                {", "}
                {propertyInfo?.address.country}
              </p>
            </div>
          </div>
          <div className={styles.mainContent}>
            <AvailabilitySearch
              selectedNumGuest={selectedNumGuest}
              setSelectedNumOfGuest={setSelectedNumOfGuest}
              availableRoomTypes={availableRoomTypes}
              numberOfNights={numberOfNights}
            />
          </div>
        </section>
      </main>
    </>
  );
}
