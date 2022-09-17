import axios from 'axios';
import React, { useState, useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaArrowAltCircleRight } from "react-icons/fa";

export default function Login() {
  const { storeToken, authenticateUser } = useContext(AuthContext);
  const [user, setUser] = useState({
    email: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState(undefined);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login/`, user);
      toast.success('Welcome back!')
      storeToken(response.data.authToken);
      authenticateUser();
      console.log(response)
      navigate(`/perfil-usuario/`);
    } catch (error) {
      setErrorMessage(error.response.data.error)
    }
  }

  return (
    <div className='signup-page padding2h5w'>
        <div className='background-top-login'>
        </div>

      <div className="title-page"> 
          <h1>Iniciar sesión</h1>
      </div> 

      <form className="login-form" onSubmit={handleSubmit}>
        <label>Email</label>
        <input required type="email" name="email" value={user.email} onChange={handleChange} />
        <label>Password</label>
        <input required type="password" name="password" value={user.password} onChange={handleChange} />
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <button type="submit" className="bt-submit radius25px"><span className="title-icon-subm">Log in</span> <FaArrowAltCircleRight className='icon-foot'/> </button>
        <p>Si aun no tienes cuenta <strong> <a href="/signup"> registrate</a></strong></p>
      </form>
    </div>
  )
}
