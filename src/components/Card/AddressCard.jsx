import PropTypes from "prop-types";
function AddressCard({
  title,
  icon,
  method,
  addressOne,
  addressTwo,
  addressThree,
  address,
  buttonText,
  buttonIcon,
}) {
  return (
    <div>
      <div className="title">
        <h2>{title}</h2>
      </div>
      <div className="sub-title">
        <h4>
          <i className={icon}></i> {method} {address}
        </h4>
      </div>
      <div className="address">
        <p>{addressOne}</p>
        <p>{addressTwo}</p>
        <p>{addressThree}</p>
      </div>
      <div className="button-invoice">
        <button>
          <i className={buttonIcon}></i> {buttonText}
        </button>
      </div>
    </div>
  );
}

AddressCard.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  method: PropTypes.string.isRequired,
  addressOne: PropTypes.string.isRequired,
  addressTwo: PropTypes.string.isRequired,
  addressThree: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  buttonIcon: PropTypes.string.isRequired,
};
export default AddressCard;
