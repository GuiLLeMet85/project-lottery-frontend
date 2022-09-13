import React, { useState } from 'react';

export default function NumbersTable ({limit, updateBetNumbers}) {
    const [betNumbers, setBetNumbers] = useState([]);
    
    
    const numbers = []
    for (let i = 1; i <= limit; i++) {
        numbers.push(i)
    }

    const handleAddNumber = (num) => {
        setBetNumbers(prev => [...prev, num] )
        // If numbers no es mes gran que 6, fes aixo,
        updateBetNumbers(betNumbers);
        // else
        console.log(betNumbers)
    }
      
return (
    <div className="numbers-table">
        {numbers.map(ele => {
            if(ele % 2 === 0){
                return  <div key={ele} className="whitebk"><button value={ele} onClick={() => handleAddNumber(ele)}>{ele}</button></div>
            }else {
                return  <div key={ele} className="redbk"><button value={ele} onClick={() => handleAddNumber(ele)}>{ele}</button></div> 
            }
        })} 
    </div>   
    )
}
