import React from "react";


// const handleAddNumber = (num) => {
//     setBetNumber(prev => [...prev, num] )
//   }


export default function NumbersTable ({limit}) {
    const numbers = []
    for (let i = 1; i <= limit; i++) {
        numbers.push(i)
    }

    
return (
    <div className="number-table">
        {numbers.map(ele => {
            if(ele % 2 === 0){
                return  <div key={ele} className="whitebk">{ele}</div>
            }else {
                return  <div key={ele} className="redbk">{ele}</div>
            }
        })} 
    </div>   
    )
}