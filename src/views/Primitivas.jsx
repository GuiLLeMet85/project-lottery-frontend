import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import axios from 'axios';
import LogoPrimitiva from '../img/logo-primitiva.png'
import { FaHashtag, FaCalendarAlt, FaRegistered, FaCopyright } from "react-icons/fa";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; 

export default function Primitivas() {
    const [primitivas, setPrimitivas] = useState(null);

    useEffect(() => {
        const getData = async () => {
          try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/primitiva`)
           console.log(response)
            setPrimitivas(response.data.data);
          } catch (error) {
            console.error(error)
          }
        }
        getData();
      }, [])

    return (
        <div>
        <h1> Resultados y Estadísticas</h1>
        {!primitivas && <p>Loading</p>}
        {primitivas && primitivas.map(primitiva => {
             return <div className='card' key={primitiva._id}>
                        <div className='bet-card'>
                                <div className='bet-img'>
                                    <img src={LogoPrimitiva} alt="logo-primitiva"></img> 
                                </div>
                            <Link to={`/detalles-apuesta/${primitiva._id}`}>
                                <div className='info-bet'>
                                        <p className='date-bet'><FaCalendarAlt className='icons-bet'/>:<span className='date-bet'> {primitiva.date}</span></p>
                                    <div className='combination-bet'>
                                        <p className='nums-bet'><FaHashtag className='icons-bet' /><span className='data-bet'> {primitiva.num0}, {primitiva.num1}, {primitiva.num2}, {primitiva.num3}, {primitiva.num4}, {primitiva.num5} </span></p>
                                        <p className='reint-bet'> <FaCopyright className='icons-bet'/><span className='data-bet'> {primitiva.numCompl}</span></p>
                                        <p className='reint-bet'> <FaRegistered className='icons-bet'/><span className='data-bet'> {primitiva.numReint}</span></p>
                                    </div>
                                </div>
                            </Link>
                           
                        </div>
                        <div className='bottom-card-opt'>
                            <div className='options-bet prized'>
                            <p>Premiado: {primitiva.isPrized}</p>
                            </div>
                            <div className='options-bet eurobed'>
                            <p>Inversión: 1€</p>
                            </div>

                        </div>   
                        
                    </div>
            })}
            <Outlet />
      </div>
    )
  }
  