import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaPlus, FaWindowClose, FaSearch, FaSortAmountUp, FaTasks} from "react-icons/fa";


export default function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const [openMenu, setOpenMenu] = useState (false);
  const navigate = useNavigate();
  return (
    <div className='navbar'>
        
            <button className="padding2h5w" onClick={() => 
              setOpenMenu(prev => !prev)}>{!openMenu ?  <FaTasks className='icon-foot'/> : <FaWindowClose className='icon-foot'/>}
            </button>
            {
            openMenu &&  
                <div className='hello padding2h5w'>
                    <NavLink className={(element) => element.isActive ? 'selected' : ''} to="/">Home</NavLink>
                    {!isLoggedIn &&<NavLink className={(element) => element.isActive ? 'selected' : ''} to="/signup">Sign up</NavLink>}
                    {!isLoggedIn &&<NavLink className={(element) => element.isActive ? 'selected' : ''} to="/login">Login</NavLink>}
                    {isLoggedIn && <NavLink className={(element) => element.isActive ? 'selected' : ''} to="/perfil-usuario">Perfil</NavLink>}
                    {user && <p>{user.username}</p> }{isLoggedIn && <button onClick={() => logOutUser()}>Log out</button>}
                </div>
            }
    </div>
  )
}
