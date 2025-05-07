import React, { useContext } from 'react'
import { useState, useEffect } from 'react';
import { SocketContext } from './socket-context';





function Wpm({ quote, typedText, isTyping }) {
    const socket = useContext(SocketContext)

    const [startTime, setStartTime] = useState(null);
    const [wpm, setWpm] = useState(0);



    useEffect(() => {
        if (isTyping && !startTime && typedText.length > 0) {
            setStartTime(Date.now())
        }
    }, [isTyping, startTime, typedText]);

    useEffect(() => {
        if (!startTime || typedText.length === 0) return
        const interval = setInterval(calculateWpm, 500);



        function calculateWpm() {
            const timeElapsed = ((Date.now() - startTime) / 1000 / 60)

            let correctChar = 0;
            for (let i = 0; i < typedText.length; i++) {
                if (quote[i] === typedText[i]) {
                    correctChar++;
                }
            }
            const wordsTyped = correctChar / 5;
            const currentWpm = Math.round(wordsTyped / timeElapsed);
            setWpm(currentWpm || 0)
            socket.emit('wpm', currentWpm);
            if (correctChar === quote.length) {
                clearInterval(interval)
            }
        }
        calculateWpm();





        return () => clearInterval(interval);
    }, [typedText, quote, startTime]);
    return (

        <div>Wpm:{wpm}</div>
    )
}

export default Wpm