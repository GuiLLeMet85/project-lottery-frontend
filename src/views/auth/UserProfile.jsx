import React, {useContext, useEffect, useState} from "react";
import { useNavigate} from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";
import toast from 'react-hot-toast';
import axios from 'axios';

export default function UserProfile() {
    const storedToken = localStorage.getItem('authToken');
    const navigate = useNavigate();
    const { user, logOutUser } = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState(undefined);
    const [userData, setUserData] = useState({
        username: user.username,
        email: user.email,
        userPicture: user.userPicture,
        phoneNum: user.phoneNum
      })
  
    useEffect(() => {
        const getDataUser = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/me`, { headers: { Authorization: `Bearer ${storedToken}` } })
                // console.log(response)
                setUserData(response.data.data)
            }
            catch (error) {
                console.error(error)
            }
        }
    getDataUser();
    }, [])
    

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/user/edit`, userData, { headers: { Authorization: `Bearer ${storedToken}` } });
      toast.success('User edited successfully. Please log in again.');
      logOutUser();
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  }

  const handleChange = (e) => {
    setUserData(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleFileUpload = async(e) => {
    const uploadData = new FormData();
    uploadData.append("userPicture", e.target.files[0]);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/upload`, uploadData);
      // console.log(response.data.fileUrl);
      setUserData(prev => {
        return {
          ...prev,
          userPicture: response.data.fileUrl
        }
      })
      // In case of multiple file upload
      // setImageUrls(prev => [...prev, response.data.fileUrl]);
      // setImgForUser(prev => [...prev, e.target.files[0].name]);
    } catch (error) {
      console.error(error);
    }
  };

    return (
        <div>
             <h1>Profile page</h1>
       
                <div className="user-profile">
                    <h2><span>User name:</span> {userData.username} </h2>
                    <img src={userData.userPicture} alt="user profile"></img>
                    {/* <form onSubmit={handleSubmit}>
                        
                        <input type="file" onChange={(e) => handleFileUpload(e)} />
                        <input required type="text" name="username" value={userData.username} onChange={handleChange} />
                        <input required type="email" name="email" value={userData.email} onChange={handleChange} />
                        <button type="submit">Save changes and log out</button>
                    </form> */}



                    <form onSubmit={handleSubmit}>
                        <label>Nombre de usuario</label>
                        <input required type="text" name="username" value={userData.username} onChange={handleChange} />
                        <label>Dirección eMail</label>
                        <input required type="email" name="email" value={userData.email} onChange={handleChange} />
                        <label>Teléfono contactol</label>
                        <input required type="phone" name="phoneNum" value={user.phoneNum} onChange={handleChange} />
                        {/* <label>Contraseña</label> */}
                        {/* <input required type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value) } />
                        <label>Repite la contraseña</label>
                        <input required type="password" name="passwordControl" value={passwordControl} onChange={(e) => setPasswordControl(e.target.value)} /> */}
                        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                        <label>Selecciona imagen de perfil</label>
                        <input type="file" onChange={(e) => handleChange(e)} />
                        <button type="submit">Save changes and log out</button>
                    </form>
                </div>
        </div>
    )
}