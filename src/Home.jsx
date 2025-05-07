import React, { useContext } from 'react'
import { getQuote } from './apicall.js'
import { useState, useEffect } from 'react'
import Timer from './Timer.jsx'
import Wpm from './Wpm.jsx'
import { io } from 'socket.io-client'
import { SocketContext } from './socket-context.js'
import Active from './Active.jsx'
import { useParams } from 'react-router-dom'
import {
    Users,
    Clock,
    Trophy,
    RefreshCw,
    Book,
    User,
    Award,
} from "lucide-react";


function Home() {
    const [quote, setQuote] = useState({ content: '' })
    const [type, setType] = useState([])
    const [input, setInput] = useState([])
    const [isTyping, setIsTyping] = useState(false)
    const [timerComplete, setTimerComplete] = useState(false)


    const socket = useContext(SocketContext)
    const { roomName } = useParams();

    useEffect(() => {


        socket.on('currentQuote', (newQuote) => {
            setQuote(newQuote);
            setType([])
            setIsTyping(false)
        })
        socket.emit('getQuote', roomName)

        function handleReset() {
            setIsTyping(false)
            setType([])
            setTimerComplete(false);
        }
        socket.on('statsReset', handleReset)

        return () => {
            socket.off('currentQuote')
            socket.off('statsReset')
        }
    }, [roomName]);

    useEffect(() => {




    }, [])

    function handleQuoteChange() {
        socket.emit('changeQuote', roomName);
        setInput([])
    }

    function typingChange(event) {
        setInput(event.target.value)
        const typedText = event.target.value.split('')
        setType(typedText)
        setIsTyping(true)
    }

    return (
        <div className='bg-purple-100'>

            <div className='flex flex-col justify-center items-center h-screen '>
                <div><Active /></div>
                <div><Timer
                    isTyping={isTyping}
                    complete={quote.content === type.join('')}
                    onComplete={() => setTimerComplete(true)}
                /></div>
                <div><Wpm
                    quote={quote.content}
                    typedText={type}
                    isTyping={isTyping}
                /></div>
                <div className=' w-full mx-auto max-w-xl rounded-md  p-3'>


                    {quote.content && quote.content.split('').map((letter, index) => {
                        const typedChar = type[index]
                        const isCorrect = typedChar === letter;
                        const isIncorrect = typedChar !== undefined && typedChar !== letter
                        return <span className={`  ${isCorrect ? "text-green-400" : ""} ${isIncorrect ? "text-red-400" : ""} `} key={index}>{letter}</span>
                    })
                    }
                </div>
                <div>
                    <textarea onPaste={(e) => e.preventDefault()}
                        onContextMenu={(e) => e.preventDefault()} disabled={(type.join('') === quote.content) || timerComplete} className="resize rounded-md border p-5 w-full mx-auto max-w-xl" value={input} onChange={typingChange}></textarea>
                </div>
                <div>
                    <button className='m-2 bg-green-400 rounded-md py-1 px-4 hover:scale-105 transition-transform duration-200' onClick={handleQuoteChange} >Change Quote</button>
                </div>
            </div>
        </div>
    )
}

export default Home