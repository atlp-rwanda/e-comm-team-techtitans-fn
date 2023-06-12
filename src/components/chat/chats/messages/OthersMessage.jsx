import React from 'react';

export default function OthersMessage({ message, time }) {
  return (
    <div className='all-group-otherMessage'>
      <div className='group-otherMessage'>{message}</div>
      <p id='hour'>{time}</p>
    </div>
  );
}
