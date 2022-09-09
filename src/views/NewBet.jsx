import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function NewBet() {
    
const navigate = useNavigate();
  const [newBet, setNewBet] = useState({
    dateLottery: '',
    numbers: {num0: '', num1: '', num2:'', num3: '', num4: '', num5: ''},
    numReint:'',
    euroBet: 1,
  })

  const handleChange = (e) => {
    const conditionalValue = e.target.name === 'numbers.num0' && e.target.name === 'numbers.num1' && e.target.name === 'numbers.num2' &&  e.target.name === 'numbers.num3' &&  e.target.name === 'numbers.num4' &&  e.target.name === 'numbers.num5' &&  e.target.name === 'numReint'  &&  e.target.name === 'euroBet' ? parseInt(e.target.value) : e.target.value;
    setNewBet(prev => {
      return {
        ...prev,
        [e.target.name]: conditionalValue
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userBetNew = await axios.post('http://localhost:8000/api/v1/betusers', newBet);
      navigate(`/projects/${userBetNew.data.data._id}`)
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="date" name="dateLottery" value={newBet.dateLottery} onChange={handleChange} />
        <input type="number" name="numbers.num0" placeholder="from 1 to 49" value={newBet.numbers.num0} min='01' max='49' onChange={handleChange} />
        <input type="number" name="numbers.num1" placeholder="from 1 to 49" value={newBet.numbers.num1} min='01' max='49' onChange={handleChange} />
        <input type="number" name="numbers.num2" placeholder="from 1 to 49" value={newBet.numbers.num2} min='01' max='49' onChange={handleChange} />
        <input type="number" name="numbers.num3" placeholder="from 1 to 49" value={newBet.numbers.num3} min='01' max='49' onChange={handleChange} />
        <input type="number" name="numbers.num4" placeholder="from 1 to 49" value={newBet.numbers.num4} min='01' max='49' onChange={handleChange} />
        <input type="number" name="numbers.num5" placeholder="from 1 to 49" value={newBet.numbers.num5} min='01' max='49' onChange={handleChange} />
        <input type="number" name="numReint" placeholder="from 0 to 9" value={newBet.numReint} min='0' max='9' onChange={handleChange} />
        <button type="submit">Save</button>
      </form>
    </div>
  )
}
