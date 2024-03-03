import React, { useEffect, useRef, useState } from "react";
import Die from './Die'
import {nanoid} from 'nanoid'
import './index.css'
import Confetti from "react-confetti";
import Timer from "./Timer";




function App() {
  const [stateArray, setStateArray] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
  const [counter, setCounter] = useState(0)

  
  function allNewDice(){
    const diceArray = []
    for(let i = 0; i < 10; i++){
      const randomNber = Math.ceil(Math.random() * 6);
      diceArray.push({
        value:randomNber, 
        isHeld: false,
        id: nanoid()
      })}
    return (diceArray)
  } 

  function rollDice(){
    setCounter(counter + 1)
    setStateArray(allNewDice=>{
      return allNewDice.map(newDice=>{
        console.log(newDice)
        return newDice.isHeld? newDice:  
        {
          ...newDice, value: Math.ceil(Math.random() * 6), id: nanoid()
        };
    
      }
    )
  })}
 
  useEffect(()=>
  {
      const condition = stateArray.every(checkCondition=>
        {
          return checkCondition.value === stateArray[0].value && checkCondition.isHeld
        })
    if(condition){
      setTenzies(true)
      console.log("You won")
    }
  },[stateArray])
 
  function holdDice(id){
    setStateArray(prevStateArray=>{
      return prevStateArray.map(die=>{
        return die.id === id? {...die, isHeld:!die.isHeld}: die;
      })
    })
  }

   const newDie = stateArray.map(x => 
    (<Die isHeld ={x.isHeld} value = {x.value} key = {x.id} handleClick={()=>holdDice(x.id)} />))
   
    const childREf = useRef()

    function newGame(){
      setCounter(0)
      setTenzies(false)
      window.location.reload(true)
      childREf.current.score()
     return setStateArray(allNewDice())
    }

    const reseter = ()=> window.location.reload(true)

    
/*function handleClick(){
  return childREf.current.score()
}*/
      
     
    

  return (
    <main className="App">
      <div className="App-div" >
        <div className="header">
          <h1>Tenzies</h1>
          <p className="header-p">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls</p>
        </div>
        <div className="dice-div">
          {newDie}
          {tenzies && <Confetti className="confetti"/>}
        </div>
       {tenzies? <button onClick={newGame} className="rollDiceBtn">New Game</button>: 
       <button onClick={rollDice} className="rollDiceBtn">Roll</button>}
       <button className="counter">{`Rolls: ${counter}`}</button>
       <Timer pause = {tenzies} ref={childREf}/>
       <button onClick={reseter} className="resetter">Reset</button>
      </div>
    </main>
  );
}


export default App;
  