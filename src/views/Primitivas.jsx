import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import axios from 'axios';
import LogoPrimitiva from '../img/logo-primitiva.png'
import { FaHashtag, FaCalendarAlt, FaRegistered, FaCopyright } from "react-icons/fa";

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
      <div className='signup-page padding2h5w'>
              <div className='background-top-primitivas radius15px'>
            </div>
              <div className="title-page"> 
                    <h1>Resultados Primitiva </h1>
                    
              </div>
        {!primitivas && <p>Loading</p>}
        {primitivas && primitivas.map(primitiva => {
             return <div className='card' key={primitiva._id}>
                        <div className='bet-card'>
                                <div className='bet-img-prim'>
                                    <img src={LogoPrimitiva} alt="logo-primitiva"></img> 
                                </div>
                                <div className='info-bet-prim'>
                                        <p className='date-bet'><FaCalendarAlt className='icons-bet'/>:<span className='date-bet'> {primitiva.date}</span></p>
                                        <div className='combination-bet'>
                                            <p className='nums-bet'><FaHashtag className='icons-bet' /><span className='data-bet-prim'> {primitiva.num0}, {primitiva.num1}, {primitiva.num2}, {primitiva.num3}, {primitiva.num4}, {primitiva.num5} </span></p>
                                            <p className='reint-bet-prim'> <FaCopyright className='icons-bet'/><span className='data-bet'> {primitiva.numCompl}</span></p>
                                            <p className='reint-bet-prim'> <FaRegistered className='icons-bet'/><span className='data-bet'> {primitiva.numReint}</span></p>
                                        </div>
                                </div>
                        </div>
                        <div className='bottom-card-opt'>
                            <div className='options-bet prized'>
                            <p></p>
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
  