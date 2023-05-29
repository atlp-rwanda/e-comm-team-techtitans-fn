import "../styles/button.scss";

// eslint-disable-next-line react/prop-types
let Button = ({ verify, handleSubmit }) => {
  return (
    <button className="button" onClick={() => handleSubmit()}>
      {verify}
    </button>
  );
};

export default Button;
