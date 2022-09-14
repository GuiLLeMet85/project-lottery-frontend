import React, {useContext, useState, useEffect} from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";
import toast from 'react-hot-toast';
import axios from 'axios';

export default function UserProfile() {
    const storedToken = localStorage.getItem('authToken');
    const navigate = useNavigate();
    const { user, logOutUser } = useContext(AuthContext);
    // const { id } = useParams();
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

    const handleChange = (e) => {
        setUserData(prev => {
          return {
            ...prev,
            [e.target.name]: e.target.value
          }
        })
    }

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

    const handleFileUpload = async(e) => {
      const uploadData = new FormData();
      uploadData.append("userPicture", e.target.files[0]);
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/upload`, uploadData);
        setUserData(prev => {
          return {
            ...prev,
            userPicture: response.data.fileUrl
          }
        })
      } catch (error) {
        console.error(error);
      }
    };

    const handleDelete = async () => {
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/delete/`, userData, { headers: { Authorization: `Bearer ${storedToken}` } });
        navigate('/');
      } 
      catch (error) {
        console.error(error)
      }
    }

    return (
        <div>
             <h1>Profile page</h1>
       
                <div className="user-profile">
                    <h2><span>User name:</span> {userData.username} </h2>
                    <img src={userData.userPicture} alt="user profile"></img>
              
                    <form onSubmit={handleSubmit}>
                        <label>Nombre de usuario</label>
                        <input required type="text" name="username" value={userData.username} onChange={handleChange} />
                        <label>Dirección eMail</label>
                        <input required type="email" name="email" value={userData.email} onChange={handleChange} />
                        <label>Teléfono contacto</label>
                        <input required type="tel" name="phoneNum" value={userData.phoneNum} onChange={handleChange} />
                        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                        <label>Selecciona imagen de perfil</label>
                        <input type="file" onChange={(e) => handleFileUpload(e)} />
                        <button type="submit">Save changes and log out</button>
                    </form>
                </div>

              <h3>¿Quieres borrar tu usuario?</h3>

              <button onClick= {handleDelete}>Eliminar usuario</button>


        </div>
    )
}