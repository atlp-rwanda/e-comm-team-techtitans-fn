let chatMessage = ({ message }) => {
  return (
    <>
      <div className="chatMessage-one">
        <div className="chatMessageContainer">
          <span className="makeBold">{message}</span>
          <br />
          <span>12:45</span>
        </div>
      </div>
    </>
  );
};

export default chatMessage;
