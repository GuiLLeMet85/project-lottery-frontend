import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Signup() {
  const [user, setUser] = useState({
    username: '',
    email: '',
    userPicture: '',
    phoneNum: ''
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
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, { username: user.username, email: user.email, phoneNum: user.phoneNum, userPicture: user.userPicture, password});
      navigate('/login');
    } catch (error) {
      setErrorMessage(error.response.data.error)
    }
  }

  const handleFileUpload = async(e) => {
    const uploadData = new FormData();
    uploadData.append("userPicture", e.target.files[0]);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/upload`, uploadData);
      // console.log(response.data.fileUrl);
      setUser(prev => {
        return {
          ...prev,
          userPicture: response.data.fileUrl
        }
      })
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Nombre de usuario</label>
        <input required type="text" name="username" value={user.username} onChange={handleChange} />
        <label>Dirección eMail</label>
        <input required type="email" name="email" value={user.email} onChange={handleChange} />
        <label>Teléfono contactol</label>
        <input required type="phone" name="phoneNum" value={user.phoneNum} onChange={handleChange} />
        <label>Contraseña</label>
        <input required type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value) } />
        <label>Repite la contraseña</label>
        <input required type="password" name="passwordControl" value={passwordControl} onChange={(e) => setPasswordControl(e.target.value)} />
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <label>Selecciona imagen de perfil</label>
        <input type="file" onChange={(e) => handleFileUpload(e)} />
        <button type="submit">Registrarse</button>
      </form>
    </div>
  )
}
