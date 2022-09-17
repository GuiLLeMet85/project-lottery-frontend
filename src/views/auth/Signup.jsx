import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaArrowAltCircleRight } from "react-icons/fa";

export default function Signup() {
        const [user, setUser] = useState({
          username: '',
          email: ''
        })

        const [password, setPassword] = useState('');
        const [passwordControl, setPasswordControl] = useState('');
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
        
        useEffect(() => {
          if (password !== passwordControl) {
            setErrorMessage("Passwords don't match")
          } else {
            setErrorMessage(undefined)
          }
          // eslint-disable-next-line
        }, [passwordControl])

        const handleSubmit = async (e) => {
          console.log(user)
          e.preventDefault();
          try {
            await axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, { username: user.username, email: user.email, password});
            navigate('/login');
            // navigate('/perfil-usuario');
          } catch (error) {
            setErrorMessage(error.response.data.error)
          }
        }

  return (
    <div className='signup-page padding2h5w'>
      <div className='background-top-signup'>
      </div>
      <div className="title-page"> 
          <h1>Darse de alta</h1>
      </div> 
      <form className="login-form" onSubmit={handleSubmit}>
        <label>Nombre de usuario</label>
        <input required type="text" name="username" value={user.username} onChange={handleChange} />
        <label>Dirección eMail</label>
        <input required type="email" name="email" value={user.email} onChange={handleChange} />
        <label>Contraseña</label>
        <input required type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value) } />
        <label>Repite la contraseña</label>
        <input required type="password" name="passwordControl" value={passwordControl} onChange={(e) => setPasswordControl(e.target.value)} />
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
   
        <button type="submit" className="bt-submit radius25px"><span className="title-icon-subm">Registrar</span> <FaArrowAltCircleRight className='icon-foot'/> </button>      </form>
    </div>
  )
}
