import React, { useContext, useState } from 'react'
import withAuth from '../utils/withAuth';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import {Button, IconButton, TextField} from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore'
import { AuthContext } from '../contexts/AuthContext';

function Home() {

  let navigate = useNavigate();
  const [meetingCode, SetMeetingCode] = useState('');

  const {addToUserHistory} = useContext(AuthContext)
  let handleJointVideocall = async() =>{
    await addToUserHistory(meetingCode)
    navigate(`/${meetingCode}`)
  }

  return (
    <>
    
    <div className="navBar">
         <div style={{display:'flex', alignItems:'center'}}>
            <h2>Zoomify</h2>
         </div>
         <div style={{display:'flex', alignItems:'center'}}>
            <IconButton onClick={()=>{navigate('/history')}}>
              <RestoreIcon/>
              <p>History</p>
            </IconButton>
            <Button onClick={()=>{localStorage.removeItem('token'); navigate('/auth')}}>Logout</Button>
         </div>
    </div>

    <div className="meetContainer">
      <div className="leftPanel">
        <div>
          <h2>Privide quality video calls</h2>
          <div style={{display:'flex', gap:'10px'}} >
            <TextField onChange={e=> SetMeetingCode(e.target.value)} id='outlined-basic' label='Meeting Code' variant='outlined'></TextField>
            <Button onClick={handleJointVideocall} variant='contained' >Join</Button>
          </div>
        </div>
      </div>

      <div className="rightPanel">
        <img srcSet='/logo3.png' alt='no found' />
      </div>
    </div>
    
    </>
  )
}

export default withAuth(Home);
