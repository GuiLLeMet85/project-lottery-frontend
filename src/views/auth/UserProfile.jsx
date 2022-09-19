import React, {useContext, useState, useEffect} from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";
import toast from 'react-hot-toast';
import axios from 'axios';
import { FaTrashAlt} from "react-icons/fa";

export default function UserProfile() {
    const storedToken = localStorage.getItem('authToken');
    const navigate = useNavigate();
    const { user, logOutUser } = useContext(AuthContext);
    // const { id } = useParams();
    const [errorMessage, setErrorMessage] = useState(undefined);
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        userPicture: '',
        phoneNum: ''
      })

 
   useEffect(() => {
        const getDataUser = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/me`, { headers: { Authorization: `Bearer ${storedToken}` } })
                //console.log(response.data.data)
                setUserData({
                  username: response.data.data.username,
                  email: response.data.data.email,
                  userPicture: response.data.data.userPicture,
                  phoneNum: response.data.data.phoneNum
                })
            }
            catch (error) {
                console.error(error)
            }
        }
    getDataUser();
    }, [])  



    const handleChange = (e) => {
      const val = e.target.name === 'phoneNum' ? parseInt(e.target.value) : e.target.value
        setUserData(prev => {
          return {
            ...prev,
            [e.target.name]: val
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
        await axios.delete(`${process.env.REACT_APP_API_URL}/user/delete/`, { headers: { Authorization: `Bearer ${storedToken}` } });
        navigate('/');
      } 
      catch (error) {
        console.error(error)
      }
    }

    return (
              <div className='signup-page padding2h5w'>
              <div className='background-top-signup'>
              </div>
              <div className="title-page"> 
                  <h1>Editar perfil</h1>
              </div> 
       
                <div className="user-profile">
                    <div className="profile-top"> 
                        <img src={userData.userPicture} alt="user profile"></img>      

                        <div className="delete-user">
                        <p>¿Quieres borrar tu usuario?</p>
                            <button type="submit" className="bt-delete radius25px" onClick= {handleDelete}>
                             <FaTrashAlt  className='title-icon-nav'/>
                            </button>
                        </div>
                    </div>

                    <form className="login-form" onSubmit={handleSubmit}>
                        <label>Nombre de usuario</label>
                        <input required type="text" name="username" value={userData.username} onChange={handleChange} />
                        <label>Dirección eMail</label>
                        <input required type="email" name="email" value={userData.email} onChange={handleChange} />
                        <label>Teléfono contacto</label>
                        <input required type="tel" name="phoneNum" value={userData.phoneNum} onChange={handleChange} />
                        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                        <label>Cambiar imagen de perfil</label>
                        <input type="file" onChange={(e) => handleFileUpload(e)} />
                        <button type="submit" className="bt-submit radius25px">Guardar cambios</button>
                    </form>
                </div>

            


        </div>
    )
}