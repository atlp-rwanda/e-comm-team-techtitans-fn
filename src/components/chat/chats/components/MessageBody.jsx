import MyMessages from '../messages/MyMessages';
import OthersMessage from '../messages/OthersMessage';

export default function MessageBody({ messages, lastMessageRef }) {
  let userIn = JSON.parse(localStorage.getItem('userIn'));
  let myTime = (time) => {
    const todayDate = new Date();
    const hours = todayDate.getHours();
    const minutes = todayDate.getMinutes();
    if (time) {
      const date = new Date(time);
      const hours = date.getHours();
      const minutes = date.getMinutes();

      const formattedTime = `${hours}:${minutes}`;
      return formattedTime;
    }
    return `${hours}:${minutes}`;
  };

  return (
    <div className='groupCont'>
      <div>
        {messages &&
          messages.map((message) =>
            message.name === userIn.fullname ? (
              <MyMessages
                key={message.id}
                message={message.text}
                time={myTime(message.createdAt)}
              />
            ) : (
              <>
                <p id='user-names'>{message.name}</p>
                <OthersMessage
                  key={message.id}
                  message={message.text}
                  time={myTime(message.createdAt)}
                />
              </>
            )
          )}
      </div>
      <div ref={lastMessageRef} />
    </div>
  );
}
