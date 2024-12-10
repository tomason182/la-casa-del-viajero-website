import Header from "../../components/Header/Header.jsx";
import AvailabilityForm from "../../components/Forms/AvailabilityForm";
import styles from "./SearchResult.module.css";
import { useEffect, useState } from "react";

export default function SearchResult() {
  const [initialsBeds, setInitialBeds] = useState(0);
  const [numberOfGuest, setNumberOfGuest] = useState(2);

  let guestArray = [];

  for (let i = 0; i <= numberOfGuest; i++) {
    guestArray[i] = i;
  }

  const numberOfNights = 4;

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

  const roomTypes = [
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
    },
  ];

  const guestOptions = guestArray.map((r, i) => <option key={i}>{r}</option>);

  const roomTypeList = roomTypes.map(r => {
    return (
      <div key={r._id} className={styles.roomTypeContainer}>
        <div>
          <h1>Imagenes de cuartos</h1>
        </div>
        <div>
          <h3>{r.description}</h3>
          <ul>
            {r.amenities.map((amenity, index) => (
              <li key={index}>{amenity}</li>
            ))}
          </ul>
        </div>
        <div className={styles.priceContainer}>
          <p>us${r.base_rate * numberOfNights}</p>
          <select name="guest">{guestOptions}</select>
        </div>
      </div>
    );
  });

  return (
    <>
      <Header />
      <main>
        <section className={styles.searchContainer}>
          <AvailabilityForm />
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
            <div className={styles.roomsContainer}>{roomTypeList}</div>
            <div className={styles.priceDetailContainer}>
              <h1>Price details</h1>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
