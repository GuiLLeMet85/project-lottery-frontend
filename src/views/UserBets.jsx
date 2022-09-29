import React, { useEffect, useState} from 'react';
import {useNavigate, Link, Outlet } from 'react-router-dom';
import LogoPrimitiva from '../img/logo-primitiva.png'
import toast from 'react-hot-toast';
import axios from 'axios';
import { FaHashtag, FaCalendarAlt, FaRegistered, FaCalendarTimes, FaSort } from "react-icons/fa";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import 'moment/locale/es';



export default function UserBets() {
    // const { id } = useParams();
    const navigate = useNavigate();
    const [bets, setBets] = useState(null);
    const storedToken = localStorage.getItem('authToken');
    const [setBetNum] = useState({
        num0: '',
        num1: '',
        num2: '',
        num3: '',
        num4: '',
        num5: '',
      })


    useEffect (() => {
        const getBets = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/bets/`, { headers: { Authorization: `Bearer ${storedToken}` } })
                setBets(response.data.data);
                setBetNum({
                    num0: response.data.data.num0,
                    num1: response.data.data.num1,
                    num2: response.data.data.num2,
                    num3: response.data.data.num3,
                    num4: response.data.data.num4,
                    num5: response.data.data.num5,
                })
            } 
            catch (error) {
            }
        }
    getBets();
    }, [setBetNum, storedToken])
  

    const handleDelete = async (id) => {
        try {
          await axios.delete(`${process.env.REACT_APP_API_URL}/bets/${id}`, { headers: { Authorization: `Bearer ${storedToken}` } });
          toast.success('Bet deleted')
          navigate('/listado-apuestas-primitiva');
        } catch (error) {
          console.error(error);
        }
    }

    const submit = (id) => {
        confirmAlert({
          title: 'Confirmación',
          message: '¿Estás que deseas eliminarlo?',
          buttons: [
            {
              label: 'Sí',
              onClick: () => handleDelete(id)
            },
            {
              label: 'No',
            }
          ]
        });
      }

    const handleSortDate = () => {
        const sortDate = [...bets].sort((a, b) => a.dateLottery - b.dateLottery);
        setBets(sortDate);
    }


    return (
            <div className='signup-page padding2h5w'>
              <div className='background-top-signup radius15px'>
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
                                                  <p className='date-bet'><FaCalendarAlt className='icons-bet'/>:<span className='date-bet'>{bet.dateLottery}</span></p> 
                                              <div className='combination-bet'>
                                                  <p className='nums-bet'><FaHashtag className='icons-bet' /><span className='data-bet'> {bet.num0}, {bet.num1}, {bet.num2}, {bet.num3}, {bet.num4}, {bet.num5} </span></p>
                                                  <p className='reint-bet'> <FaRegistered className='icons-bet'/><span className='data-bet'> {bet.numReint}</span></p>
                                              </div>
                                          </div>
                                      </Link>
                                          <div className='option-bet'>
                                              <button onClick={() => submit(bet._id)} className="delete-bt"> <FaCalendarTimes className="icon-btn"/></button>
                                          </div>
                                  </div>
                                  <div className='bottom-card-opt'>
                                      <div className='options-bet prized'>
                                      <p></p>
                                      </div>
                                      <div className='options-bet eurobed'>
                                      <p>Inversión: {bet.euroBet}€</p>
                                      </div>
                                  </div>       
                              </div>
                      })}
                      <Outlet />
           </div>
      )
}