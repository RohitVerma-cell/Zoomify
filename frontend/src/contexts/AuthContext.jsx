import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import httpStatus from 'http-status';
import { useNavigate } from 'react-router-dom';
import server from '../environment';


export const AuthContext = createContext({});


const client = axios.create({
  // baseURL: 'http://localhost:8001/api/v1/users', 
  baseURL: `${server}/api/v1/users`, 
  headers: {
    'Content-Type': 'application/json',
  },
});

export const AuthProvider = ({ children }) => {
  const authContext = useContext(AuthContext); 

  const [userData, setUserData] = useState(authContext);

const handleRegister = async (name, username, password) => {
  try {
    const response = await client.post('/register', {
      name,
      username,
      password,
    });
    if (response.status === httpStatus.CREATED) {
      return response.data.message;
    }
  } catch (error) {
    console.error("Register error:", error);
    throw error;
  }
};

 const navigate = useNavigate(); 
  const handleLogin = async (username, password) => {

  try {
    let request = await client.post('/login', {
      username: username,
      password: password
    });

    if (request.status === httpStatus.OK) {
      localStorage.setItem('token', request.data.token);
      navigate('/home'); 
    }
  } catch (error) {
    console.error('Login error:', error);
    alert('Invalid username or password');
  }
};

  const getHistoryofUser = async() =>{
   try {
    let request = await client.get("/get_all_activity",{
      params:{
        token : localStorage.getItem("token")
      }
    })
    return request.data
   } catch (error) {
     throw error
   }
  }

  const addToUserHistory = async(meetingCode) =>{
    try {
      let request = await client.post("/add_to_activity",{
        token : localStorage.getItem('token'),
        meeting_code : meetingCode
      })
      return request
    } catch (error) {
      throw error;
    }
  }


  // ✅ Expose context data
  const data = {
    userData,
    setUserData,
    handleRegister,
    handleLogin,
    getHistoryofUser,
    addToUserHistory 
  };

  return (
    <AuthContext.Provider value={data}>
      {children}
    </AuthContext.Provider>
  );
};

