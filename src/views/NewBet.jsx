import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import DatePicker from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import 'moment/locale/es';
// import { format } from 'date-fns'
// import { es } from 'date-fns/locale'


export default function NewBet() {
  const [errorMessage, setErrorMessage] = useState(null);
  const storedToken = localStorage.getItem('authToken');
  const navigate = useNavigate();
  const [newBet, setNewBet] = useState({
    dateLottery: '',
    num0: '',
    num1: '',
    num2: '',
    num3: '',
    num4: '',
    num5: '',
    numReint:'',
  })


  const handleChange = (e) => {
      setNewBet(prev => {
        return {
          ...prev,
          [e.target.name]: e.target.value
        }
      })
  }
  const handleDate = (e) => {
    setNewBet(prev => {
      return {
        ...prev,
        dateLottery: e._d
      }
    })
  }

   const disableDays = current => {
      return current.day() !== 0 && current.day() !== 2 && current.day() !== 3 && current.day() !== 5;
   }
  // useEffect(() => {
  //   console.log(newBet);
  // },[newBet])

  const checkValidations = (e) => {
    e.preventDefault()
    const numbersLotery = [newBet.num0, newBet.num1, newBet.num2, newBet.num3, newBet.num4, newBet.num5].sort(function (a, b) { return a - b; });
    const unicos = numbersLotery.filter(function (numero, index, array) {
      return array.indexOf(numero) === index;
    })
        if (unicos.length !== numbersLotery.length) {
          setErrorMessage("Hay números repetidos");
        } 
        else if (unicos.length === numbersLotery.length) {
          setErrorMessage(undefined)
          handleSubmit();
        }
  }
  const handleSubmit = async () => {
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/bets`, newBet, { headers: { Authorization: `Bearer ${storedToken}` } });
        console.log(response.data.data)
          toast.success('Item added succesfully!');
          navigate(`/listado-apuestas-primitiva`)
        } catch (error) {
          setErrorMessage(error.response.data.error)
        }
  };

  
  return (
    
    <div className='signup-page padding2h5w'>
    <div className='background-top-bet'></div>
    <div className="title-page">
        <h1>Jugar a la Primitiva </h1>
    </div>
            <form onSubmit={checkValidations} className='bet-form padding2x2'>
                  <div className='data-bet'>
                      <label>Fecha sorteo<span className="note"> (lunes, jueves y sábados)</span></label>
                        <DatePicker
                          timeFormat={false}
                          onChange={handleDate}
                          isValidDate={disableDays}
                          name="dateLottery"
                          input={true}
                          // dateFormat="YYYY-MM-DD"
                          dateFormat="L"
                          value={newBet.dateLottery}
                          className="date-picker"
                          type="String"
                        />
{/* 
          <DatePicker
                  timeFormat={true}
                  
             
                  name="dateLottery"
                  input={true}
              
             
                  className="date-picker"
                  type="date"
                  initialViewMode="Monday"
                  
                  value={newBet.dateLottery}
                  selected={startDate}
                  onChange={handleDate}
                  isValidDate={disableDays}
                  tabIndex={1}
               
              /> */}
                                  
                </div>
             <div className='select-numbers'>
                  <label>Números sorteo <span className="note">(del 01 al 49)</span></label>
                  <div>
                      <input type="number" id="numPrim" name="num0" placeholder="S" value={newBet.num0} min='01' max='49' onChange={handleChange} />
                      <input type="number" id="numPrim" name="num1" placeholder="U" value={newBet.num1} min='01' max='49' onChange={handleChange} />
                      <input type="number" id="numPrim" name="num2" placeholder="E" value={newBet.num2} min='01' max='49' onChange={handleChange} />
                      <input type="number" id="numPrim" name="num3" placeholder="R" value={newBet.num3} min='01' max='49' onChange={handleChange} />
                      <input type="number" id="numPrim" name="num4" placeholder="T" value={newBet.num4} min='01' max='49' onChange={handleChange} />
                      <input type="number" id="numPrim" name="num5" placeholder="E" value={newBet.num5} min='01' max='49' onChange={handleChange} />
                  </div>
              </div>
              <div className='reintegro-num'>
                  <label>Reintegro <span className="note">(del 0 al 09)</span></label>
                  <div>
                  <input required type="number" name="numReint" placeholder=":-)" value={newBet.numReint} min='0' max='9' onChange={handleChange} />
                  </div>
        </div>
        <div>
          <p></p>
        </div>
              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
              <button type="submit" className='bt-submit radius25px'>Jugar</button>
            </form>
            
    </div>
  )
}