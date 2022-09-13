import React, { useState } from 'react';

export default function ReintNumbers ({limit}) {
    const [betNumReint, setBetNumReint] = useState([]);
    
    const reintNumbers = []
    for (let i = 0; i <= limit; i++) {
        reintNumbers.push(i)
    }
    
    const handleAddReintNumber = (num) => {
        setBetNumReint(prev => [...prev, num] )
    }
      
return (
    <div className="numbers-table">
        {reintNumbers.map(ele => {
            if(ele % 2 === 0){
                return  <div key={ele} className="whitebk"><button onClick={() => handleAddReintNumber(ele)}>{ele}</button></div>
            }else {
                return  <div key={ele} className="redbk"><button onClick={() => handleAddReintNumber(ele)}>{ele}</button></div>
            }
        })} 
    </div>   
    )
}  