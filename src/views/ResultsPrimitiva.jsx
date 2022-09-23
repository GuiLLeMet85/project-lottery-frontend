import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import axios from 'axios';

export default function ResultsPrimitiva() {
    const [resultPrim, setResultPrim] = useState(null);

    useEffect(() => {
        const getData = async () => {
          try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/primitivaresults/`)
            //console.log(response)
            setResultPrim(response.data.data);
          } catch (error) {
            console.error(error)
          }
        }
        getData();
      }, [])

    return (
        <div>
        <h1> Resultados y Estadísticas</h1>{!resultPrim && <p>Loading</p>}
        {resultPrim && resultPrim.map(resultsprimitiva => {
          return <p key={resultsprimitiva._id}><Link to={`/resultsprimitiva/${resultsprimitiva._id}`}>{resultPrim.date}</Link></p>
        })}
        <Outlet />
      </div>
    )
  }
  