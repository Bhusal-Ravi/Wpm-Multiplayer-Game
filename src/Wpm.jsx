import React, { useContext } from 'react'
import { useState, useEffect } from 'react';
import { SocketContext } from './socket-context';





function Wpm({ quote, typedText, isTyping }) {
    const socket = useContext(SocketContext)

    const [startTime, setStartTime] = useState(null);
    const [wpm, setWpm] = useState(0);
    const [intervalId, setIntervalId] = useState(null);



    useEffect(() => {
        if (isTyping && !startTime && typedText.length > 0) {
            setStartTime(Date.now())
        }
        function handleReset() {
            setWpm(0)
            setStartTime(null);

            if (intervalId) {
                clearInterval(intervalId);
                setIntervalId(null);
            }
            socket.emit('wpm', 0);
        }
        socket.on('statsReset', handleReset)

        return () => {
            socket.off('statsReset', handleReset);
        };
    }, [isTyping, startTime, typedText, socket, intervalId]);

    useEffect(() => {
        if (!startTime || typedText.length === 0) return

        if (intervalId) {
            clearInterval(intervalId);
        }
        const newInterval = setInterval(calculateWpm, 500);
        setIntervalId(newInterval);



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
                clearInterval(newInterval)
            }
        }
        calculateWpm();





        return () => {
            if (newInterval) clearInterval(newInterval);
        };
    }, [typedText, quote, startTime, socket]);
    return (

        <div>Wpm:{wpm}</div>
    )
}

export default Wpm