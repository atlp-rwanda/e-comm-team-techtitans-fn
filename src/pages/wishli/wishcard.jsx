import React from "react";
import PropTypes from "prop-types";
import "../../scss/wish/wishcard.scss";

const Card = ({ image, name, description, id }) => {
  return (
    <div className="card" key={id}>
      <img src={image} alt={name} className="card__image" />
      <div className="p-footer">
        <h3 className="card__name item-name">{name}</h3>
        <p className="card__description">{description}</p>
      </div>
    </div>
  );
};

Card.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired, // Assuming id is a string, adjust the type if needed
};

export default Card;
