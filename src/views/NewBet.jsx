import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

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

  const [betNunber, setBetNumber] = useState([]);

  const handleChange = (e) => {
    //const conditionalValue = e.target.name === 'numbers.num0' && e.target.name === 'numbers.num1' && e.target.name === 'numbers.num2' &&  e.target.name === 'numbers.num3' &&  e.target.name === 'numbers.num4' &&  e.target.name === 'numbers.num5' &&  e.target.name === 'numReint'  &&  e.target.name === 'euroBet' ? parseInt(e.target.value) : e.target.value;
    const conditionalValue = e.target.name === 'dateLottery' ? e.target.value : parseInt(e.target.value);
    setNewBet(prev => {
      return {
        ...prev,
        [e.target.name]: conditionalValue
      }
    })
  }

  const updateBetNumbers = (num) => {
    setBetNumber(num);
    console.log(betNunber);
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


  return (
    <div>
       <h2>Selecciona la fecha y la combinación del sorteo</h2>
            <form onSubmit={handleSubmit} className='padding2x2'>
              <label>Fecha sorteo</label>
              <input type="date" name="dateLottery" value={newBet.dateLottery} onChange={handleChange} />
              <input type="number" name="num0" placeholder="from 1 to 49" value={newBet.num0} min='01' max='49' onChange={handleChange} />
              <input type="number" name="num1" placeholder="from 1 to 49" value={newBet.num1} min='01' max='49' onChange={handleChange} />
              <input type="number" name="num2" placeholder="from 1 to 49" value={newBet.num2} min='01' max='49' onChange={handleChange} />
              <input type="number" name="num3" placeholder="from 1 to 49" value={newBet.num3} min='01' max='49' onChange={handleChange} />
              <input type="number" name="num4" placeholder="from 1 to 49" value={newBet.num4} min='01' max='49' onChange={handleChange} />
              <input type="number" name="num5" placeholder="from 1 to 49" value={newBet.num5} min='01' max='49' onChange={handleChange} />
              <label>Reintegro</label>
              <input type="number" name="numReint" placeholder="from 0 to 9" value={newBet.numReint} min='0' max='9' onChange={handleChange} />
              <button type="submit" className='sub-bt'>Save</button>
            </form>
    </div>
  )
}
