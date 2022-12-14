import React, {useContext, useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";
import toast from 'react-hot-toast';
import axios from 'axios';
import { FaTrashAlt} from "react-icons/fa";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

export default function UserProfile() {
    const storedToken = localStorage.getItem('authToken');
    const navigate = useNavigate();
    const {logOutUser } = useContext(AuthContext);
    const [errorMessage] = useState(undefined);
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
    }, [storedToken])  

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

    const submit = () => {

      confirmAlert({
        // title: 'Confirm to submit',
        message: '??Seguro que quieres borrarlo?',
        buttons: [
          {
            label: 'Yes',
            onClick: () => handleDelete()
          },
          {
            label: 'No',
            //onClick: () => alert('Click No')
          }
        ]
      });
    }

    return (
              <div className='signup-page padding2h5w'>
              <div className='background-top-signup radius15px'>
              </div>
              <div className="title-page"> 
                  <h1>Editar perfil</h1>
              </div> 
       
                <div className="user-profile">
                    <div className="profile-top"> 
                        <img src={userData.userPicture} alt="user profile"></img>      

                        <div className="delete-user">
                        <p>??Quieres borrar tu usuario?</p>
                            <button type="submit" className="bt-delete radius25px" onClick= {submit}>
                             <FaTrashAlt  className='title-icon-nav'/>
                            </button>
                        </div>
                    </div>

                    <form className="login-form" onSubmit={handleSubmit}>
                        <label>Nombre de usuario</label>
                        <input required type="text" name="username" value={userData.username} onChange={handleChange} />
                        <label>Direcci??n eMail</label>
                        <input required type="email" name="email" value={userData.email} onChange={handleChange} />
                        <label>Tel??fono contacto</label>
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