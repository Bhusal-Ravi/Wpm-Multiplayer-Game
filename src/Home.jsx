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
    ChartNoAxesCombined,
    Clock,
    ChevronsUp,
    Quote,
    RotateCw,
    Keyboard,
    Hash
} from "lucide-react";



function Home() {
    const [quote, setQuote] = useState({ content: '' })
    const [type, setType] = useState([])
    const [isTyping, setIsTyping] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [timerComplete, setTimerComplete] = useState(false)


    const socket = useContext(SocketContext)
    const { roomName } = useParams();

    useEffect(() => {


        socket.on('currentQuote', (newQuote) => {
            setQuote(newQuote);
            setType([])
            setIsTyping(false)
            setInputValue('')
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
        const value = event.target.value
        const typedText = event.target.value.split('')
        setType(typedText)
        setIsTyping(true)
        setInputValue(value)
    }

    return (
        <div className=''>
            <div className='w-full flex justify-between bg-white  h-15 flex items-center shadow-md'>
                <div className=' flex flex-row ml-25'>
                    <Keyboard size={40} className='text-indigo-600 mr-3' />
                    <h1 className='font-bold   text-xl'>Type<span className='text-indigo-600'>Racer</span></h1>
                </div>
                <div className='mr-25 flex flex-row'>
                    <Hash size={35} className='text-indigo-600 mr-3' />
                    <h1 className='font-bold   text-xl'>Room<span className='text-indigo-600'>Id:  "{roomName}"</span></h1>
                </div>
            </div>
            <div className='flex flex-col mt-5  items-center h-screen '>
                <div className='w-full mx-auto max-w-xl'>
                    <Active
                        roomName={roomName}
                    />
                </div>
                <div className=' shadow-lg grid grid-flow-row grid-cols-1     p-4 rounded-xl w-full mx-auto max-w-xl mb-5 mt-1'>
                    <div className='content-start flex flex-row text-indigo-600'>
                        <ChartNoAxesCombined size={20} className='mr-2 font-thin' />
                        <h1 className=' text-lg font-bold'>Stats</h1>
                    </div>
                    <div className='flex flex-row justify-center items-center  '>
                        <div className='shadow-md p-2 mx-4 my-1  rounded-xl bg-blue-50 flex flex-col'>
                            <div className='flex flex-row items-center text-indigo-600'>
                                <Clock size={18} />
                                <h1 className=' my-2 ml-2    font-semibold justify-start'>
                                    Time Left
                                </h1>
                            </div>
                            <Timer

                                isTyping={isTyping}
                                complete={quote.content === type.join('')}
                                onComplete={() => setTimerComplete(true)}

                            /></div>
                        <div className='shadow-md p-2 mx-4 my-1  rounded-xl bg-blue-50 flex flex-col'>
                            <div className='flex flex-row items-center text-indigo-600'>
                                <ChevronsUp
                                    size={19}
                                />
                                <h1 className=' my-2 ml-2    font-semibold justify-start'>
                                    Speed
                                </h1>
                            </div>
                            <Wpm
                                quote={quote.content}
                                typedText={type}
                                isTyping={isTyping}
                            />
                        </div>
                    </div>
                </div>


                <div className=' w-full mx-auto max-w-xl rounded-xl  p-3 '>
                    <div className='flex flex-row'>
                        <div className='flex flex-row items-center text-indigo-600'>
                            <Quote className='mr-2 font-thin' size={20} />
                            <h1 className=' text-lg font-bold justify-start'>Quote</h1>
                        </div>
                        <div>

                            <button className='m-2 ml-5 text-sm text-white font-bold bg-green-600 rounded-md py-1 px-4 hover:scale-105 transition-transform duration-200 flex flex-row jistify-content items-center' onClick={handleQuoteChange} ><RotateCw size={18} className='mr-2 ' />Change Quote</button>
                        </div>
                    </div>
                    <div className='shadow-md shadow-indigo-500/50 p-2 mx-4 my-2 mb-3  rounded-xl bg-blue-50   font-semibold text-md'>
                        {quote.content && quote.content.split('').map((letter, index) => {
                            const typedChar = type[index]
                            const isCorrect = typedChar === letter;
                            const isIncorrect = typedChar !== undefined && typedChar !== letter
                            return <span className={`  ${isCorrect ? "text-green-600" : ""} ${isIncorrect ? "text-red-600" : ""} `} key={index}>{letter}</span>
                        })
                        }
                    </div>
                </div>
                <div className="w-full mx-auto max-w-xl">
                    <textarea

                        onPaste={(e) => e.preventDefault()}
                        onContextMenu={(e) => e.preventDefault()}
                        disabled={(type.join('') === quote.content) || timerComplete}
                        className="w-full h-28 mt-5 bg-white  shadow-lg p-4 border-2 border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 outline-none transition resize-none"
                        placeholder="Start typing here..."
                        value={inputValue}
                        onChange={typingChange}>
                    </textarea>
                </div>

            </div>
        </div>
    )
}

export default Home