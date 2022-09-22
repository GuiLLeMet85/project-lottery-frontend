import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import DatePicker from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

export default function NewBet() {
  const [errorMessage, setErrorMessage] = useState(undefined);
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
    //console.log(newBet)
  } 
  const handleDate = (e) => {
    setNewBet(prev => {
      return {
        ...prev,
        dateLottery: e._d
      }
    })
    //console.log(newBet)
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

   // To disable days week whithout bet
   const disableDays = current => {
      return current.day() !== 0 && current.day() !== 2 && current.day() !== 3 && current.day() !== 5;
  }



// submit numbers of Primitiva sorting in a array and checking if there are unique

// don't work: error message --> Duplicate field value entered

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const numbersLotery=[newBet.num0, newBet.num1, newBet.num2, newBet.num3, newBet.num4,newBet.num5].sort(function (a, b) {  return a - b;  });
  //   // array de numeros unicos
  //   const unicos = numbersLotery.filter(function(numero, index, array) {
  //        return array.indexOf(numero) === index;
  //   })
  //   if(unicos.length !== numbersLotery.length && ){
  //       console.log (unicos)
  //      setErrorMessage("Hay numeros repetidos"); 
  //   }
  //   else{
  //       try {
  //            const response = await axios.post(`${process.env.REACT_APP_API_URL}/bets`, newBet,{ headers: { Authorization: `Bearer ${storedToken}`}});
  //            toast.success('Item added succesfully!');
  //            navigate(`/listado-apuestas-primitiva/`)
  //          } catch (error) {
  //            setErrorMessage(error.response.data.error)
  //          }
  //       }
  // }


// const handleCheckNum= (e) => {
  //   // set inputs numbers in array sorting 
  //   const numbersLotery=[newBet.num0, newBet.num1, newBet.num2, newBet.num3, newBet.num4,newBet.num5].sort(function (a, b) {  return a - b;  });
  //   const unicos = numbersLotery.filter(function(numero, index, array) {
  //            return array.indexOf(numero) === index;
  //   })

  //   // check if numbers are from 1 to 49 and are uniques
  //   const inputNumPrim = document.getElementById('numPrim');
  //         inputNumPrim.addEventListener('input', e => {
  //           if (inputNumPrim > 50 ) {
  //                 inputNumPrim.value = 0;
  //                 setErrorMessage('Por favor ingresa un número entre 1 y 49');
  //           }
  //           if(unicos.length !== numbersLotery.length){
  //                   console.log (unicos)
  //                  setErrorMessage("Hay numeros repetidos"); 
  //           }  
  //   // If cheks are ok, save data on setNumBet
  //           else {
  //           setNewBet(prev => {
  //             return {
  //               ...prev,
  //               num0: e._d,
  //               num1: e._d,
  //               num2: e._d,
  //               num3: e._d,
  //               num4: e._d,
  //               num5: e._d,
  //             } 
  //         }
  //       }
  //   )}


  return (
    <div className='signup-page padding2h5w'>
    <div className='background-top-bet'></div>
    <div className="title-page"> 
        <h1>Jugar a la Primitiva </h1>
    </div> 

            <form onSubmit={handleSubmit} className='bet-form padding2x2'>
              <div className='data-bet'>
                  <label>Fecha sorteo<span className="note"> (lunes, jueves y sábados)</span></label>
                    <DatePicker
                      timeFormat={false}
                      onChange={handleDate}
                      isValidDate={disableDays}
                      name="dateLottery"
                      input={true}
                      dateFormat="DD-MM-YYYY"
                      value={newBet.dateLottery}
                      className="date-picker" 
                      type="date"
                    />              </div>
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
                  <input type="number" name="numReint" placeholder=":-)" value={newBet.numReint} min='0' max='9' onChange={handleChange} />
                  </div>
              </div>
              <button type="submit" className='bt-submit radius25px'>Jugar</button>
            </form>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>} 
            
    </div>
  )
}