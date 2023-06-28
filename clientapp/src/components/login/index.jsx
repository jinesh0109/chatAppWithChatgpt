import React, { useEffect, useState } from 'react'
import { usePostLoginMutation, usePostSignUpMutation } from '../../state/api';

function Login({setUser,setSecret}) {
  const [isRegister,setIsRegister] = useState(false);
  const [username,setUsername]=useState("");
  const [password,setPassword] = useState("");
  const [triggerLogin,resultLogin] = usePostLoginMutation();
  const [triggerSignUp] = usePostSignUpMutation();
  const handleRegister =()=>{
    triggerSignUp({username,password})
  }
  const handleLogin =()=>{
    triggerLogin({username,password})
  }
  useEffect(()=>{
    if(resultLogin.data?.response)
    {
        setUser(username);
        setSecret(password);
    }
  },[resultLogin.data])
  return (
    <div className="login-page">
        <h2 className="title">ChatApp With Chatgpt</h2>
        <p className="register-change" onClick={()=>{setIsRegister(!isRegister)}}>
            {isRegister ? "Alreay a user?" : "Are you a new user"}
        </p>
        <div>
            <input className="login-input" type='text' placeholder='Username' value={username}
                onChange={(e)=>{setUsername(e.target.value)}}/>
            <input className="login-input" type='password' placeholder='Password' value={password}
                onChange={(e)=>{setPassword(e.target.value)}}/>
        </div>
        <div className="login-actions">
            {isRegister ?(
                <button type='button' onClick={handleRegister}>
                    Register
                </button>
            ):(
                <button type='button' onClick={handleLogin}>
                    Login
                </button>
            )}
        </div>
    </div>
  )
}

export default Login