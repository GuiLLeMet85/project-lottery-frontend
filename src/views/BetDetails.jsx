import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';



import {useParams, useNavigate, Link, Outlet } from 'react-router-dom';
import LogoPrimitiva from '../img/logo-primitiva.png'


import { FaHashtag, FaCalendarAlt, FaRegistered, FaCalendarTimes, FaFilter, FaSort } from "react-icons/fa";


export default function BetDetails(props) {

    const {betUser} = props;
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


    
     return (
               <div className='bet-details-view'>
               <h1>hello</h1>         
                        { bet && (

                        <p>{bet.dateLottery}</p>



                        )}





               </div> 
     
            )
        
}
 
