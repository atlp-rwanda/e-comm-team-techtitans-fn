import React from 'react'
import { useEffect } from 'react';
import jwtDecode from 'jwt-decode';
function Home() {
  localStorage.setItem("token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMyY2M5NTNmLTM4ZjktNDk3OS1iNjIwLWNkZWQ1MzA0YTBhNiIsImZ1bGxuYW1lIjoiYnV5ZXIzIiwiZW1haWwiOiJidXllcjNAZ21haWwuY29tIiwicm9sZUlkIjozLCJpYXQiOjE2ODMyOTM0NDYsImV4cCI6MTcxNDg1MTA0Nn0.H85Mgz-GWLeuxKs9zXNiy9eCraKEKkAI048KO3w7pHA")
  return (
    <div className="homeCont">
      <h1>This is home </h1>
    </div>
  )
  
}

export default Home