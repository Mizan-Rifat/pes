import React, { useState, useEffect } from 'react'

export default function Checkbox() {

  const [state, setstate] = useState({
    team1:[1,2,3],
    team2:[4,5,6],
  })

  const a= 1;
  const b= 2;


useEffect(()=>{

  setstate({
    ...state,
    [`team${a}`]:[...state[`team${a}`],4,5,6]
  })
},[])

console.log({state})

  return (
    <div>
      
    </div>
  )
}
