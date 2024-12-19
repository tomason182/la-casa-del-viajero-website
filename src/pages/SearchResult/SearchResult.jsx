import Header from "../../components/Header/Header.jsx";
import AvailabilityForm from "../../components/Forms/AvailabilityForm.jsx";
import AvailabilitySearch from "../../components/AvailabilitySearch/AvailabilitySearch.jsx";
import Booking from "../../components/Booking/Booking.jsx";
import StepIndicator from "../../components/StepIndicator/StepIndicator.jsx";
import styles from "./SearchResult.module.css";
import { useState } from "react";

export default function SearchResult() {
  const [index, setIndex] = useState(1);
  const [roomTypeList, setRoomTypeList] = useState([]);
  const [selectedNumGuest, setSelectedNumOfGuest] = useState({});
  const [numberOfNights, setNumberOfNights] = useState(0);
  const totalSteps = 4;
  const propertyId = "6723e33fc4b3cd67d79f1849";

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
              setRoomTypeList={setRoomTypeList}
              setIndex={setIndex}
              propertyId={propertyId}
              setNumberOfNights={setNumberOfNights}
            />
          )}

          {index === 2 && (
            <AvailabilitySearch
              selectedNumGuest={selectedNumGuest}
              setSelectedNumOfGuest={setSelectedNumOfGuest}
              availableRoomTypes={roomTypeList}
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
