import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import axios from 'axios';
import BetUser from "../components/BetDetails"; 

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

    return (
        <div>
        <h1>Mis apuestas Primitiva</h1>
        {!bets && <p>Loading</p>}
        {bets && bets.map(bet => {
        return <p key={bet._id}><Link to={`/betusers/${bet._id}`}>{bet.numComplem}</Link></p>
        
      })}
      <Outlet />
       
        {/* <BetUser /> */}
       
        </div>
    )
}


