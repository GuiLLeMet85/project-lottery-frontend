import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import axios from 'axios';

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
            return <div key={bet._id}>
                <Link to={`/detalles-apuesta/${bet._id}`}>
                
                <p>Fecha:</p><h3>{bet.dateLottery}</h3>
                <p>Números</p><h3>{bet.num0}, {bet.num1}, {bet.num2}, {bet.num3}, {bet.num4}, {bet.num5} </h3>
                <p>Reintegro</p><h3>{bet.numReint}</h3>
                
                </Link>
                
                </div>
            })}
            <Outlet />
        </div>
    )
}