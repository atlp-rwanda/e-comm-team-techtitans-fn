import React from 'react';

const ExampleButton = ({ label, onClick, backgroundColor }) => {
    
  const buttonStyle = {
    backgroundColor,
    color: 'white',
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
  };
  return (
    <button style={buttonStyle} onClick={onClick}>
      {label}
    </button>
  );
};
export default ExampleButton;