import React from "react";
import classNames from "classnames";

export default function Die(props){
  /*const styles = {
    backgroundColor: props.isheld? '#59E391': ''
  }*/
  return(
    <div onClick={props.handleClick} className={classNames('diceBtnDiv',{'held-Die':props.isHeld})}>
       <button 
      className={classNames('button-Die',{
      'die1': props.value === 1,
      'die2': props.value === 2,
      'die3': props.value === 3,
      'die4': props.value === 4,
      'die5': props.value === 5,
      'die6': props.value === 6})} /*className={`button-Die ${props.isheld? 'held-Die': ''}`}*/ >
      {props.value}</button>
    </div>
   
  )
}