import React from 'react';
import '../variables/variables.scss'
import { Button } from 'antd';
import { fontWeight } from '@mui/system';
const NotFound = () => {
  const divStyle = {
 
    padding: '10px',
    color: '#555555',
    fontSize: '18px',
    fontWeight: 'bold',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const divTwoStyle = {
    marginTop: '10px',
    color:'#7A89E9',
    fontSize: '90px',
    fontWeight: 'bold',
    
  };
  const divThreeStyle = {
    marginTop: '10px',
    color:'#7A89E9', 
  };
  const buttonStyle={
    marginTop:'10px',
    fontWeight:'bold'
  }


  return (
    <div style={divStyle}>
      <div style={divTwoStyle}>401</div>
      <p>Oops! No authorization found</p>
      <div style={divThreeStyle}>
        To access the page please log in as authorized user
      </div>
      <div>
        <Button style={buttonStyle}>Login</Button>
      </div>
    </div>
  );
};

export default NotFound;