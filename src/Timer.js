import React, {useState, useEffect, forwardRef, useImperativeHandle} from "react";



function convertSecondstoHMS(seconds){

  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainningSeconds = seconds % 60

  const formatedHours = hours.toString().padStart(2, '0')
  const formatedMunites = minutes.toString().padStart(2,'0')
  const formatedSeconds = remainningSeconds.toString().padStart(2,'0')
  
  return `${formatedHours}:${formatedMunites}:${formatedSeconds}`

}

 const Timer = forwardRef((props, ref) => { 
  const [seconds, setSeconds] = useState(0)
 
 useEffect(()=>
  {

    if(!props.pause)
    {
      const timer = setInterval(()=>
    {
      setSeconds(s=> s +1)
    }, 1000)
    return ()=>clearInterval(timer)
  } else 
 {
  const timer = setInterval(()=>
{
  setSeconds(seconds)
}, 1000)
return ()=>clearInterval(timer)
  
 }
 
},[props.pause])
  

const time = convertSecondstoHMS(seconds)
const bestRecord = props.pause && time
//const record2 = time
 const [bestTimes, setBestTimes] = useState(()=>{
  const storedScore = window.localStorage.getItem('score');
  return storedScore? (JSON.parse(storedScore)): "24:00:00";
  }
 )
useImperativeHandle(ref,()=>({
    score(){
      window.localStorage.setItem('score', JSON.stringify(bestTimes.toString() 
      < bestRecord.toString()? bestTimes.toString(): bestRecord.toString()))
    }
}))
    

    

 useEffect(()=>
 {
  const storedScore = JSON.parse(window.localStorage.getItem('score'));
  setBestTimes(storedScore? storedScore : bestTimes);
 },[time])

  

 
 

  return(
    <div>
      <p className="timer-p">Timer: {time}</p>
      <p className="timer-p2">Score: {bestTimes}</p>
    </div>
  ) 
 
  })

  export default Timer;