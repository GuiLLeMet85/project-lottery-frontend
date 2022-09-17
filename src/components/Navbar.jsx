import React, { useContext, useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaArrowCircleLeft, FaWindowClose, FaHome, FaHouseUser, FaTasks, FaArrowAltCircleRight, FaUserPlus, FaDoorClosed  } from "react-icons/fa";
import axios from 'axios';

export default function Navbar() {
  const storedToken = localStorage.getItem('authToken');
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const [openMenu, setOpenMenu] = useState (false);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: '',
    userPicture: '',
  })

  useEffect(() => {
    const getDataUser = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/me`, { headers: { Authorization: `Bearer ${storedToken}` } })
            console.log(response.data.data)
            setUserData({
              username: response.data.data.username,
              userPicture: response.data.data.userPicture,
            })
        }
        catch (error) {
            console.error(error)
        }
    }
getDataUser();
}, [])  


  return (

    <div className='navbar'>
          <div className='bt-top padding2h5w'>
            <button onClick={() => 
                setOpenMenu(prev => !prev)}>{!openMenu ?  
                <FaTasks className='icon-nav-top'/> : <FaWindowClose className='icon-nav-top'/>}
            </button>
            <button onClick={() => navigate(-1)}>     
                <FaArrowCircleLeft className='icon-nav-top'/><span className="title-icon">Atrás</span>
            </button>  
          </div> 
            {
            openMenu &&  
                <div className='hello padding2h5w'>
                    <h4><span>Hola </span> {userData.username}!</h4>
                    {isLoggedIn && 
                      <img src={userData.userPicture} className="profile-pict-menu radius25px" alt="user-profile"></img>
                    }

                    {isLoggedIn && 
                            <NavLink className={(element) => element.isActive ? 'selected' : ''} to="/perfil-usuario">
                              <div className='icon-navbar-sect'>  
                                    <FaHouseUser className='icon-nav' /><span className="title-icon-nav"> Editar perfil</span>
                              </div>
                            </NavLink>}
                    {isLoggedIn && 
                              <button className='' onClick={() => logOutUser()}>
                                <div className='icon-navbar-sect'> 
                                      <FaDoorClosed className='icon-nav'/><span className="title-icon-nav"> Cerrar sesión</span>
                                </div>
                              </button>}  

                    {!isLoggedIn &&
                            <NavLink className={(element) => element.isActive ? 'selected' : ''} to="/login">
                              <div className='icon-navbar-sect'> 
                                <FaArrowAltCircleRight className='icon-nav' /><span className="title-icon-nav"> Iniciar sesión</span>
                              </div>
                            </NavLink>}
                            
                    {!isLoggedIn &&
                            <NavLink className={(element) => element.isActive ? 'selected' : ''} to="/signup">
                              <div className='icon-navbar-sect'> 
                                <FaUserPlus className='icon-nav' /> <span className="title-icon-nav"> Registrarse</span>
                              </div>
                            </NavLink>}
                      
                          <NavLink className={(element) => element.isActive ? 'selected' : ''} to="/">
                              <div className='icon-navbar-sect'> 
                                  <FaHome className='icon-nav' /><span className="title-icon-nav"> Home</span>
                              </div>
                          </NavLink>

                 
                </div>
            }
    </div>
  )
}
