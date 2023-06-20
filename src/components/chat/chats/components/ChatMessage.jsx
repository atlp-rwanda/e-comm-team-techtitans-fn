import React, { useState, useEffect, useRef } from 'react';
import ChatSendMessage from './ChatSendMessage';
import MessageBody from './MessageBody';
import { useSelector, useDispatch } from 'react-redux';
import { getAllMessages } from '../../../../Redux/Features/chat/allmessagesSlice';

export default function ChatMessage({ socket }) {
  const dispatch = useDispatch();
  const allMyMessage = useSelector(
    (state) => state.allmessage?.myMessages?.data.data
  );

  const [messages, setMessages] = useState([]);
  const lastMessageRef = useRef(null);

  useEffect(() => {
    socket.on('messageResponse', (data) => setMessages([...messages, data]));
  }, [socket, messages]);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    dispatch(getAllMessages());
  }, [dispatch]);

  return (
    <div className='group-messages-cont'>
      <MessageBody
        messages={allMyMessage ? [...allMyMessage, ...messages] : [...messages]}
        lastMessageRef={lastMessageRef}
      />
      <div>
        <ChatSendMessage socket={socket} />
      </div>
    </div>
  );
}
