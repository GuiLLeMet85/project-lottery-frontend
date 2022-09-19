import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import {useParams, useNavigate, Link, Outlet } from 'react-router-dom';
import LogoPrimitiva from '../img/logo-primitiva.png'
import { FaHashtag, FaCalendarAlt, FaRegistered, FaCalendarTimes, FaFilter, FaSort } from "react-icons/fa";


export default function BetDetails() {
    const { id } = useParams();
    const storedToken = localStorage.getItem('authToken');
    const navigate = useNavigate();
    const [bet, setBet] = useState(null);
    
        useEffect(() => {
        const getData = async () => {
          try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/bets/${id}`, { headers: { Authorization: `Bearer ${storedToken}` } })
            //console.log(response);
            setBet(response.data.data)
          } catch (error) {
            console.error(error);
          }
        }
        getData();
      }, []);

    const handleChange = (e) => {
        // const val = e.target.name === 'phoneNum' ? parseInt(e.target.value) : e.target.value
          setBet(prev => {
            return {
              ...prev,
              [e.target.name]: e.target.value
            }
          })
          console.log(bet)
    }

    const handleDelete = async () => {
        try {
          await axios.delete(`${process.env.REACT_APP_API_URL}/bets/${id}`, { headers: { Authorization: `Bearer ${storedToken}` } })
          toast.success('Bet deleted')
          navigate("/listado-apuestas-primitiva/");
        } catch (error) {
          console.error(error);
        }
    };  

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const betUpdated= await axios.put(`${process.env.REACT_APP_API_URL}/bet/${id}`, bet, { headers: { Authorization: `Bearer ${storedToken}` } });
          navigate(`/`)
        } catch (error) {
          console.error(error);
        }
      }
  
    return (      

               <div className='bet-details-view'>
                        { bet && (
                               <div className='signup-page padding2h5w'>
                               <div className='background-top-signup'>
                               </div>
                               <div className="title-page"> 
                               <h1>Detalles apuesta</h1>  
                                   <div className='filter-bet flex-row '>
            
                                   </div>
                               </div>
                        <div>
                        <form className="login-form" onSubmit={handleSubmit}>
                            <label>Fecha</label>
                        <input required type="text" name="dateLottery" value={bet.dateLottery} onChange={handleChange} />
                            <div className='select-numbers'>
                                <label>Números sorteo <span className="note">(del 01 al 49)</span></label>
                                    <div>    
                                        <input type="number" name="num0" placeholder="1 a 49" value={bet.num0} min='01' max='49' onChange={handleChange} />
                                        <input type="number" name="num1" placeholder="1 a 49" value={bet.num1} min='01' max='49' onChange={handleChange} />
                                        <input type="number" name="num2" placeholder="1 a 49" value={bet.num2} min='01' max='49' onChange={handleChange} />
                                        <input type="number" name="num3" placeholder="1 a 49" value={bet.num3} min='01' max='49' onChange={handleChange} />
                                        <input type="number" name="num4" placeholder="1 a 49" value={bet.num4} min='01' max='49' onChange={handleChange} />
                                        <input type="number" name="num5" placeholder="1 a 49" value={bet.num5} min='01' max='49' onChange={handleChange} />
                                    </div>
                            </div>
                            <div className='reintegro-num'>
                                    <label>Reintegro <span className="note">(del 0 al 09)</span></label>
                                    <div>
                                        <input type="number" name="numReint" placeholder="0 to 9" value={bet.numReint} min='0' max='9' onChange={handleChange} />
                                    </div>

                            </div>
                                    <button type="submit" className="bt-submit radius25px">Guardar cambios</button>
                        </form>
                        <button onClick={handleDelete}> Borrar</button>

                       
                        </div>
                            
                </div>
   
                        )}

             </div>
    )
}
 
