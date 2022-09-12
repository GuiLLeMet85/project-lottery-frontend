import React from 'react';
import {Link, Outlet} from 'react-router-dom';

export default function BetUser(props) { 

    const {betUser} = props;

    return (
        <div className='bet-card' key={betUser._id}>
            {betUser && (
                <div className="bet-info">
                <div className="lottery-pict">
                    <img src={betUser.image} alt="Primitiva bet"> </img>    
                </div> 
                <div className="numbers-section">
                    <table>
                        <tr className="header-table"> 
                            <th>Números jugados</th>
                            <th>Complementario</th>
                            <th>Reintegro</th>
                        </tr>
                        <tr>
                            <td>{betUser.numbers.num0}</td>
                            <td>{betUser.numbers.num1}</td>
                            <td>{betUser.numbers.num2}</td>
                            <td>{betUser.numbers.num3}</td>
                            <td>{betUser.numbers.num4}</td>
                            <td>{betUser.numbers.num5}</td>
                        </tr>
                        <tr>
                            <td>{betUser.numComplem}</td>
                        </tr>
                        <tr>
                            <td>{betUser.numReint}</td>
                        </tr>

                    </table>
                </div>
                <div className="lotter-info">
                    <h2>Date: <span clasName="date">{betUser.date}</span></h2>
                    


                </div>      
                </div>
            )}
        </div>
    )
}