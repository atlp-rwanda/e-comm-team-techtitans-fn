let myMessage = ({ message }) => {
  return (
    <>
      <div className="myMessage">
        <div className="messageBox">
          <span className="makeBold">{message}</span>
          <br />
          <span>12:23</span>
        </div>
      </div>
    </>
  );
};

export default myMessage;
