import React from 'react'
import '../App.css';
import { Link, useNavigate } from "react-router-dom"

export default function Landing() {
  const router = useNavigate()
  return (
    <div className="landingPageContainer">
      <nav>
        <div className='navHeader'>
          <h2>Zoomify</h2>
        </div>
        <div className='navlist'>
          <p onClick={()=>{
            router("/ghete4")
          }} >Join as guest</p>
          <p onClick={()=>{
            router('/auth')
          }}>Register</p>
          <div onClick={()=>{
            router('/auth')
          }} role='button'>
            <p>Login</p>
          </div>
        </div>
      </nav>

      <div className="landingMainContainer">
        <div>
          <h1><span style={{ color: "orange" }}>Connect</span> with your loveones</h1>
          <p>Cover a distance by video call</p>
          <div role='button'>
            <Link to={"/auth"}>Get Started</Link>
          </div>
        </div>

        <div>
          <img src="/mobile.png" alt="not found" />
        </div>
      </div>

    </div>
  )
}
