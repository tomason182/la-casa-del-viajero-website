import Header from "../../components/Header/Header.jsx";
import AvailabilityForm from "../../components/Forms/AvailabilityForm";
import styles from "./SearchResult.module.css";
import { useEffect, useState } from "react";

export default function SearchResult() {
  const [selectedNumGuest, setSelectedNumOfGuest] = useState({});
  console.log(selectedNumGuest);
  const [roomTypes, setRoomtypes] = useState([
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
  const numberOfNights = 4;

  /*   const roomDetails = () => {
    const listOfRooms = [];
    for (const item in selectedNumGuest) {
      const selectedRoom = roomTypes.find(r => r._id === item);
      listOfRooms.push(selectedRoom);

      listOfRooms.map(r => (
        <li key={r._id}>
          <p>{r.description}</p>
          <p>{numberOfNights * selectedNumGuest[r._id] * r.base_rate}</p>
        </li>
      ));
    }
  };

  const priceDetail = () => {
    if (!selectedNumGuest) {
      return (
        <div className={styles.priceDetailDefault}>
          Por favor, seleccione las habitaciones que quiere reservar para ver el
          detalle
        </div>
      );
    }

    return (
      <div>
        <h2>Detalle</h2>
        <p>Estadia {numberOfNights} noches</p>
        <ul>{roomDetails()}</ul>
      </div>
    );
  }; */

  function handleGuestSelection(e) {
    e.preventDefault();

    const { name, value } = e.target;

    setSelectedNumOfGuest({
      ...selectedNumGuest,
      [name]: value,
    });
  }

  function renderBedsOptions(availability, id) {
    const bedsArray = [];

    for (let i = 0; i <= Number(availability); i++) {
      bedsArray.push(i);
    }

    const bedsOptions = bedsArray.map(bed => (
      <option key={`${id}-${bed}`} value={bed}>
        {bed}
      </option>
    ));

    return (
      <select name={id} onChange={handleGuestSelection}>
        {bedsOptions}
      </select>
    );
  }

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

  const roomTypeList = roomTypes.map(r => {
    return (
      <div key={r._id} className={styles.roomTypeContainer}>
        <div className={styles.imageSlider}>
          <h1>Imagenes de cuartos</h1>
        </div>
        <div className={styles.description}>
          <h3>{r.description}</h3>
          <ul>
            {r.amenities.map((amenity, index) => (
              <li key={index}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#26701c"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                {amenity}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.priceContainer}>
          <div className={styles.priceDetail}>
            <p>us${r.base_rate * numberOfNights}</p>
            <span>Precio para {numberOfNights} noches</span>
            <span>
              {r.type === "dorm" ? "1 persona" : `${r.max_occupancy} personas`}
            </span>
          </div>
          <div className={styles.bedSelection}>
            {renderBedsOptions(r.availability, r._id)}
          </div>
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
              {Object.keys(selectedNumGuest).length > 0 ? (
                <div>
                  <p>Estadia {numberOfNights} noches</p>
                  <ul>
                    {renderRoomDetails(
                      roomTypes,
                      selectedNumGuest,
                      numberOfNights
                    )}
                  </ul>
                </div>
              ) : (
                <p>No hay datos</p>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

function renderRoomDetails(roomTypesList, selectedRooms, nights) {
  return Object.keys(selectedRooms).map(obj => {
    const room = roomTypesList.find(r => r._id === obj);
    return (
      <li key={obj}>
        <p>{room.description}</p>
        <p>{nights * room.base_rate * selectedRooms[obj]}</p>
      </li>
    );
  });
}
