import React, { useEffect, useState } from 'react'
import { usePostLoginMutation, usePostSignUpMutation } from '../../state/api';

function Login({setUser,setSecret}) {
  const [isRegister,setIsRegister] = useState(false);
  const [username,setUsername]=useState("");
  const [password,setPassword] = useState("");
  const [triggerLogin,resultLogin] = usePostLoginMutation();
  const [triggerSignUp,resultSignUp] = usePostSignUpMutation();
  const [isAuthenticated,setIsAuthenticated]= useState(false);
  const [missingValue,setMissingValue]=useState(false);

  const handleRegister =()=>{
    if(username && password){
      setMissingValue(false)
      triggerSignUp({username,password})
    }
    else{
      setMissingValue(true)
    }
  }
  const handleLogin =()=>{
    if(username && password){
      setMissingValue(false)
      triggerLogin({username,password})
    }
    else{
      setMissingValue(true)
    }
  }
  useEffect(()=>{
    if(resultLogin.data?.response)
    {
        setUser(username);
        setSecret(password);
    }
  },[resultLogin.data])
  useEffect(()=>{
    if(resultSignUp?.data?.response?.is_authenticated){
      setIsRegister(false);
      setIsAuthenticated(true);
    }
  },[resultSignUp.data])
  useEffect(()=>{
    if(isAuthenticated){
      setTimeout(()=>{
        setIsAuthenticated(false)
      },[2000])
    }
  },[isAuthenticated])
  return (
    <div className="login-page">
        <h2 className="login-title">ChatApp With Chatgpt</h2>
        {isAuthenticated ?(
        <p className="login-title">
             User Register succesfully!!
        </p>):(<></>)
        }
        <p className="register-change" onClick={()=>{setIsRegister(!isRegister)}}>
            {isRegister ? "Alreay a user? click here" : "Are you a new user? click here"}
        </p>
        <div>
            <input className="login-input" type='text' placeholder='Username' value={username}
                onChange={(e)=>{setUsername(e.target.value)}}/>
            <input className="login-input" type='password' placeholder='Password' value={password}
                onChange={(e)=>{setPassword(e.target.value)}}/>
        </div>
        
        {missingValue ?
        <p className='login-title'>
           ** Please enter username and password properly **
        </p>:<></>}
        
        <div className="login-actions">
            {isRegister ?(
                <div className='btn'  onClick={handleRegister}>
                    Register
                </div>
            ):(
                <div className='btn'  onClick={handleLogin}>
                    Login
                </div>
            )}
        </div>
    </div>
  )
}

export default Login