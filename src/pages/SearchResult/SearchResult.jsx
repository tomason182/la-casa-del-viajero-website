import Header from "../../components/Header/Header.jsx";
import AvailabilityForm from "../../components/Forms/AvailabilityForm.jsx";
import AvailabilitySearch from "../../components/AvailabilitySearch/AvailabilitySearch.jsx";
import Booking from "../../components/Booking/Booking.jsx";
import StepIndicator from "../../components/StepIndicator/StepIndicator.jsx";
import styles from "./SearchResult.module.css";
import { useEffect, useState } from "react";

export default function SearchResult() {
  const [index, setIndex] = useState(1);
  const [selectedNumGuest, setSelectedNumOfGuest] = useState({});
  const [dates, setDates] = useState({
    checkIn: "",
    checkOut: "",
  });

  const [numberOfNights, setNumberOfNights] = useState(0);
  const [availableRoomTypes, setAvailableRoomTypes] = useState([]);
  const totalSteps = 4;
  const propertyId = "1234";

  /*   useEffect(() => {
    function fetchAvailability() {
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
  }, [formBody]); */

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
        <StepIndicator totalSteps={totalSteps} currentStep={index} />
        <section className={styles.searchDisplay}>
          {index === 1 && (
            <AvailabilityForm
              dates={dates}
              setDates={setDates}
              setIndex={setIndex}
              propertyId={propertyId}
            />
          )}

          {index === 2 && (
            <AvailabilitySearch
              selectedNumGuest={selectedNumGuest}
              setSelectedNumOfGuest={setSelectedNumOfGuest}
              availableRoomTypes={availableRoomTypes}
              numberOfNights={numberOfNights}
              setIndex={setIndex}
            />
          )}
          {index === 3 && (
            <Booking
              setIndex={setIndex}
              propertyInfo={propertyInfo}
              /* formBody={formBody} */
              numberOfNights={numberOfNights}
              selectedNumGuest={selectedNumGuest}
              availableRoomTypes={availableRoomTypes}
            />
          )}
        </section>
      </main>
    </>
  );
}
