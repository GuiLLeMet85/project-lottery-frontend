import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import DatePicker from 'react-datetime';
import moment from 'moment';
import 'react-datetime/css/react-datetime.css';

export default function NewBet() {
  const [errorMessage, setErrorMessage] = useState(undefined);
  const storedToken = localStorage.getItem('authToken');
  const [dt, setDt] = useState(moment())
  //const [errorRepeatMessage, setErrorRepeatMessage] = useState(null);
  const navigate = useNavigate();

  const [newBet, setNewBet] = useState({
    num0: '',
    num1: '',
    num2: '',
    num3: '',
    num4: '',
    num5: '',
    numReint:'',
  })

  const [betNunber, setBetNumber] = useState([]);

  const handleChange = (e) => {    const conditionalValue = e.target.name === 'dateLottery' ? e.target.value : parseInt(e.target.value);
    setNewBet(prev => {
      return {
        ...prev,
        [e.target.name]: conditionalValue
      }
    })
  }

  const updateBetNumbers = (num) => {
    setBetNumber(num);
    // console.log(betNunber);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/bets`, newBet,{ headers: { Authorization: `Bearer ${storedToken}`}});
      toast.success('Item added succesfully!');
      navigate(`/listado-apuestas-primitiva/`)
    } catch (error) {
      setErrorMessage(error.response.data.error)
    }
  }

   // disable weekends
   const disableDays = current => {
    return current.day() !== 0 && current.day() !== 2 && current.day() !== 3 && current.day() !== 5;
  }

  return (
    <div className='signup-page padding2h5w'>
    <div className='background-top-bet'>
    </div>
    <div className="title-page"> 
        <h1>Jugar a la Primitiva </h1>
    </div> 

            <form onSubmit={handleSubmit} className='bet-form padding2x2'>
            {/* <DatePicker
              timeFormat={false}
              onChange={handleChange}
              isValidDate={disableDays}
              name="dateLottery"
              input={true}
              dateFormat="DD-MM-YYYY"
              value={newBet.dateLottery}
              // onChange={dateLottery => handleChange(dateLottery)}
              className="date-picker" 
              type="date"
            /> */}

             <div><b>Date:</b> {dt.format('LLL')}</div>
              <div className='data-bet'>
                  <label>Fecha sorteo<span className="note"> (lunes, jueves y sábados)</span></label>
                  <div>
                  <input className="date-picker" type="date" name="dateLottery" value={newBet.dateLottery} onChange={handleChange} />
                  </div>
              </div>
             <div className='select-numbers'>
                  <label>Números sorteo <span className="note">(del 01 al 49)</span></label>
                  <div>    
                      <input type="number" name="num0" placeholder="S" value={newBet.num0} min='01' max='49' onChange={handleChange} />
                      <input type="number" name="num1" placeholder="U" value={newBet.num1} min='01' max='49' onChange={handleChange} />
                      <input type="number" name="num2" placeholder="E" value={newBet.num2} min='01' max='49' onChange={handleChange} />
                      <input type="number" name="num3" placeholder="R" value={newBet.num3} min='01' max='49' onChange={handleChange} />
                      <input type="number" name="num4" placeholder="T" value={newBet.num4} min='01' max='49' onChange={handleChange} />
                      <input type="number" name="num5" placeholder="E" value={newBet.num5} min='01' max='49' onChange={handleChange} />
                  </div>
              </div>
              <div className='reintegro-num'>
                  <label>Reintegro <span className="note">(del 0 al 09)</span></label>
                  <div>
                  <input type="number" name="numReint" placeholder=":-)" value={newBet.numReint} min='0' max='9' onChange={handleChange} />
                  </div>
              </div>
              <button type="submit" className='bt-submit radius25px'>Jugar</button>
            </form>
    </div>
  )
}
