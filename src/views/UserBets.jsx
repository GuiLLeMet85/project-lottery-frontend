import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import axios from 'axios';
import BetUser from "../components/BetUser"; 

export default function UserBets() {

    const [bets, setBets] = useState(null);

    useEffect (() => {
        const getBets = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/v1/betusers')
                 console.log(response)
                //  setBets(response.data.data)
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
        {bets && bets.map(bets => {
        return <p key={bets._id}><Link to={`/betusers/${bets._id}`}>{bets.title}</Link></p>
      })}
      <Outlet />
       
        {/* <BetUser /> */}
       
        </div>
    )
}


