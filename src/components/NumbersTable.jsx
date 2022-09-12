import React, { useState } from 'react';

export default function NumbersTable ({limit}) {
    const [betNumbers, setBetNumbers] = useState([]);
    
    const numbers = []
    for (let i = 1; i <= limit; i++) {
        numbers.push(i)
    }

    const handleAddNumber = (num) => {
        setBetNumbers(prev => [...prev, num] )
      }
      
return (
    <div className="number-table">
        {numbers.map(ele => {
            if(ele % 2 === 0){
                return  <button onClick={() => handleAddNumber(ele)}><div key={ele} className="whitebk">{ele}</div></button>
            }else {
                return  <button onClick={() => handleAddNumber(ele)}><div key={ele} className="redbk">{ele}</div></button>
            
            }
        })} 
    </div>   
    )
}
