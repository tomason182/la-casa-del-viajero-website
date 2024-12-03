import PropTypes from "prop-types";

export default function Location({ title }) {
  return (
    <div>
      <h2>{title}</h2>
    </div>
  );
}

Location.propTypes = {
  title: PropTypes.string.isRequired,
};
