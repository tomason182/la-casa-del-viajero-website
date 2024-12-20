import PropTypes from "prop-types";

export default function StepIndicator({ totalSteps, currentStep, setIndex }) {
  return (
    <div style={styles.container}>
      {Array.from({ length: totalSteps }, (_, index) => {
        const stepNumber = index + 1;
        return (
          <div key={index} style={styles.stepContainer}>
            {/* circulo del paso */}
            <div
              style={{
                ...styles.circle,
                backgroundColor:
                  stepNumber === currentStep
                    ? "#007bff"
                    : stepNumber < currentStep
                    ? "#28a745"
                    : "#ccc",
                cursor: stepNumber < currentStep ? "pointer" : "not-allowed",
              }}
              onClick={() => stepNumber < currentStep && setIndex(stepNumber)}
            >
              {stepNumber}
            </div>
            {/* Linea entre circulos */}
            <div>
              {stepNumber < totalSteps && (
                <div
                  style={{
                    ...styles.line,
                    backgroundColor:
                      stepNumber < currentStep ? "#28a745" : "#ccc",
                  }}
                ></div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "1rem 0",
  },
  stepContainer: {
    display: "flex",
    alignItems: "center",
  },
  circle: {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "1rem",
  },
  active: {
    cursor: "pointer",
  },
  line: {
    minWidth: "150px",
    height: "2px",
  },
};

StepIndicator.propTypes = {
  totalSteps: PropTypes.number.isRequired,
  currentStep: PropTypes.number.isRequired,
  setIndex: PropTypes.func.isRequired,
};
