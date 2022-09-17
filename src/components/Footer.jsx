import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaRegPlayCircle, FaRegListAlt, FaArrowCircleLeft, FaPray } from "react-icons/fa";


export default function Footer(){
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <footer className='padding2h5w'>
        {isLoggedIn && <NavLink className={(element) => 
            element.isActive ? 'selected' : ''} to="/apostar-primitiva/"> 
            <div className='bt-back icon-footer-sect'>
                <FaRegPlayCircle className='icon-foot'/> <span className="title-icon">Jugar</span></div>
            </NavLink>}

        {isLoggedIn && <NavLink className={(element) => 
            element.isActive ? 'selected' : ''} to="/listado-apuestas-primitiva/">
            <div className='bt-back icon-footer-sect'>
                <FaPray className='icon-foot'/><span className="title-icon">Apuestas</span></div>
            </NavLink>}

        <NavLink className={(element) => 
            element.isActive ? 'selected' : ''} to="/">
            <div className='bt-back icon-footer-sect'>    
                <FaRegListAlt className='icon-foot'/><span className="title-icon">Sorteos</span></div>
        </NavLink>
        
        <button className='bt-back bk-darkblue radius15px'onClick={() => navigate(-1)}>
             <div className='icon-footer-sect'>
                <FaArrowCircleLeft className='icon-foot'/><span className="title-icon">Atrás</span></div>
        </button>        
        </footer>
    )
}  