import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import LogoPrimitiva from '../img/logo-primitiva.png'
import axios from 'axios';
import XMark from '../img/circle-xmark-regular.svg'
import { FaHashtag, FaCalendarAlt } from "react-icons/fa";



export default function UserBets() {
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
            return <div className='bet-card'key={bet._id}>
                <div className='bet-img'>
                     <img src={LogoPrimitiva} alt="logo-primitiva"></img> 
                </div>
                <div className='info-bet'>
                    <p><FaHashtag /><span className='data-bet'> {bet.num0}, {bet.num1}, {bet.num2}, {bet.num3}, {bet.num4}, {bet.num5} </span></p>
                    <p><FaHashtag /><span className='data-bet'> {bet.numReint}</span></p>
                    <p><FaCalendarAlt />:<span className='data-bet'> {bet.dateLottery}</span></p>
                </div>
                <div className='option-bet'>
                     <Link to={`/detalles-apuesta/${bet._id}`}><img src={XMark} className="icon-svg" alt="icon"></img> </Link>
                     {/* <button onClick={() => onDelete(name)} className="delete-bt"> <FaCalendarTimes className="icon-btn"/> </button> */}


                </div>
                
                </div>
            })}
            <Outlet />
        </div>
    )
}