import React from 'react';

const Unauthorized = () => {
  const divStyle = {
    backgroundColor: '#f8f8f8',
    padding: '10px',
    color: '#ff0000',
    fontSize: '18px',
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    
  };
  const iconStyle = {
    marginRight: '10px',
  };


  return (
    <div style={divStyle}>
         <span style={iconStyle}>⚠️</span>
      Sorry, you do not have access to this page.
    </div>
  );
};

export default Unauthorized;