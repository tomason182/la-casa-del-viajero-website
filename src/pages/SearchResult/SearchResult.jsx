import Header from "../../components/Header/Header.jsx";
import AvailabilityForm from "../../components/Forms/AvailabilityForm";
import styles from "./SearchResult.module.css";
import { useEffect, useState } from "react";

export default function SearchResult() {
  const [selectedNumGuest, setSelectedNumOfGuest] = useState({});
  const [formBody, setFormBody] = useState({
    checkIn: "",
    checkOut: "",
    numOfGuest: "",
  });

  console.log(formBody);
  const [numberOfNights, setNumberOfNights] = useState(0);
  const [availableRoomTypes, setAvailableRoomTypes] = useState(null);

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

  let totalAmount = 0;
  function renderRoomDetails(roomTypesList, selectedRooms, nights) {
    return Object.keys(selectedRooms).map(obj => {
      const room = roomTypesList.find(r => r._id === obj);
      if (selectedRooms[obj] === "0") {
        return false;
      }
      totalAmount += nights * room.base_rate * selectedRooms[obj];
      return (
        <li key={obj}>
          <p>
            {selectedRooms[obj]} * {room.description}
          </p>
          <p>us$ {nights * room.base_rate * selectedRooms[obj]}</p>
        </li>
      );
    });
  }

  const roomTypeList =
    availableRoomTypes &&
    availableRoomTypes.map(r => {
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
                {r.type === "dorm"
                  ? "1 persona"
                  : `${r.max_occupancy} personas`}
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
            {availableRoomTypes === null ? (
              <div>
                <h3>
                  Antes de comenzar, realize una busqueda de disponibilidad
                </h3>
              </div>
            ) : (
              <>
                <div className={styles.roomsContainer}>{roomTypeList}</div>
                <div className={styles.priceDetailContainer}>
                  <h3>Detalle de la reserva</h3>
                  {Object.keys(selectedNumGuest).length === 0 ||
                  Object.values(selectedNumGuest).every(
                    value => value === "0"
                  ) ? (
                    <p className={styles.noRoom}>
                      Seleccione los cuartos que desea reservar para continuar
                    </p>
                  ) : (
                    <div className={styles.reservationDetails}>
                      <div>
                        <p>Estadia {numberOfNights} noches</p>
                      </div>
                      <div className={styles.roomList}>
                        <ul>
                          {renderRoomDetails(
                            availableRoomTypes,
                            selectedNumGuest,
                            numberOfNights
                          )}
                        </ul>
                      </div>
                      <div>
                        <h3>Total: us$ {totalAmount}</h3>
                      </div>
                    </div>
                  )}
                  <div>
                    <button
                      disabled={
                        Object.keys(selectedNumGuest).length === 0 ||
                        Object.values(selectedNumGuest).every(
                          value => value === "0"
                        )
                      }
                    >
                      Reservar
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
