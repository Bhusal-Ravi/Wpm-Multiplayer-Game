import React from 'react'
import { useState, useEffect } from 'react'

function Timer({ isTyping, complete, onComplete }) {
  const [minute, setMinute] = useState(0)
  const [second, setSecond] = useState(59)
  const [button, setButton] = useState(0)
  const [timerComplete, setTimerComplete] = useState(false)
  useEffect(() => {
    let intervalId = null;
    if ((button === 1 || isTyping) && !complete) {
      intervalId = setInterval(() => {
        if (second > 0) {
          setSecond(second - 1);

        } else {
          if (minute > 0) {
            setMinute(minute - 1)
            setSecond(59)
          }
          else {
            setTimerComplete(true);
            onComplete();
            clearInterval(intervalId)
          }
        }
      }, 1000)
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [button, minute, second, isTyping, complete]);

  function toggleButton() {
    { button === 0 ? setButton(1) : setButton(0) }
  }
  return (


    <div className='flex justify-center items-center'>
      <div className='m-5'>
        {minute}:{second}
      </div>
      <div>
        <button className={`m-2 bg-green-400 rounded-md py-1 px-4 hover:scale-105 transition-transform duration-200 ${button === 1 ? "hidden" : ""} `} onClick={toggleButton}>Start</button>
      </div>
    </div>
  )
}

export default Timer