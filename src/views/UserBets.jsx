import React, { useEffect, useState } from 'react';
import {useParams, useNavigate, Link, Outlet } from 'react-router-dom';
import LogoPrimitiva from '../img/logo-primitiva.png'
import axios from 'axios';
import XMark from '../img/circle-xmark-regular.svg'
import { FaHashtag, FaCalendarAlt, FaRegistered, FaCalendarTimes } from "react-icons/fa";



export default function UserBets() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [bets, setBets] = useState(null);
    const storedToken = localStorage.getItem('authToken');

    useEffect (() => {
        const getBets = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/bets`, { headers: { Authorization: `Bearer ${storedToken}` } })
                 console.log(response)
                setBets(response.data.data)
            } 
            catch (error) {
                console.log(error)
            }
        }
    getBets();
    }, [])

    const handleDelete = async () => {
        try {
          await axios.delete(`${process.env.REACT_APP_API_URL}/bets/id`, { headers: { Authorization: `Bearer ${storedToken}` } });
          navigate('/listado-apuestas-primitiva');
        } catch (error) {
          console.error(error);
        }
    }
    

    // const numSorted = [{bet.num0}, {bet.num1}, {bet.num2}, {bet.num3}, {bet.num4}, {bet.num5}]


    return (
            <div className='signup-page padding2h5w'>
              <div className='background-top-signup'>
            </div>
              <div className="title-page"> 
                  <h1>Mis apuestas </h1>
              </div>
            {!bets && <p>Loading</p>}
            {bets && bets.map(bet => {
            return <div className='card' key={bet._id}>
                        <div className='bet-card'>
                                <div className='bet-img'>
                                    <img src={LogoPrimitiva} alt="logo-primitiva"></img> 
                                </div>
                            <Link to={`/detalles-apuesta/${bet._id}`}>
                                <div className='info-bet'>
                                        <p className='date-bet'><FaCalendarAlt className='icons-bet'/>:<span className='date-bet'> {bet.dateLottery}</span></p>
                                    <div className='combination-bet'>
                                        <p className='nums-bet'><FaHashtag className='icons-bet' /><span className='data-bet'> {bet.num0}, {bet.num1}, {bet.num2}, {bet.num3}, {bet.num4}, {bet.num5} </span></p>
                                        <p className='reint-bet'> <FaRegistered className='icons-bet'/><span className='data-bet'> {bet.numReint}</span></p>
                                    </div>
                                </div>
                            </Link>
                                <div className='option-bet'>
                                    <button onClick={handleDelete} className="delete-bt"> <FaCalendarTimes className="icon-btn"/></button>
                                </div>
                        </div>
                        <div className='bottom-card-opt'>
                            <div className='options-bet prized'>
                            <p>Premiado: {bet.isPrized}</p>
                            </div>
                            <div className='options-bet eurobed'>
                            <p>Invetido: {bet.euroBet}€</p>
                            </div>

                        </div>   
                        
                    </div>
            })}
            <Outlet />
        </div>
    )
}