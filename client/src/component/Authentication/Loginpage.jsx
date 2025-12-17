import React,{useState} from 'react';
import {useNavigate} from "react-router-dom"
import GoogleLogin from '../Authentication/Google';
import axios from 'axios'
import "./Login.css"

const Login = () => {
  const navigate=useNavigate(false)
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState()

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("https://youtube-bbrv.onrender.com/user/signin", {
        email,
        password,
      });
    
      if (response.data) {
      alert("sign-in successful")
      navigate("/videos")
      } else {
        console.log("log in failed");
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <div className="login-page">
      <h2>Login Page</h2>
      <form onSubmit={handleLogin}>
          <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} />
          <input type="text" value={password} onChange={(e)=>setPassword(e.target.value)} />
            <button type='submit'>Login</button>
       
          <div>
          Don't have any account ? 
          <a href="/register"> click here</a>
          </div>
            
          
        
      
      </form>
      <GoogleLogin/>
     
    </div>
  );
};

export default Login;
