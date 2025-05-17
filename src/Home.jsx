import React, { useContext, useState, useEffect } from 'react'
import { useState, useEffect } from 'react'
import Timer from './Timer.jsx'
import Wpm from './Wpm.jsx'
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
    Hash,
    Menu,
    X
} from "lucide-react";

function Home() {
    const [quote, setQuote] = useState({ content: '' })
    const [type, setType] = useState([])
    const [isTyping, setIsTyping] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [timerComplete, setTimerComplete] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    }

    return (
        <div className='min-h-screen flex flex-col'>
         
            <div className='w-full flex justify-between bg-white p-3 h-auto shadow-md'>
                <div className='flex flex-row items-center'>
                    <Keyboard size={28} className='text-indigo-600 mr-2' />
                    <h1 className='font-bold text-lg sm:text-xl'>Type<span className='text-indigo-600'>Racer</span></h1>
                </div>
                
            
                <div className='block md:hidden'>
                    <button onClick={toggleMobileMenu} className='p-2'>
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
           
                <div className='hidden md:flex flex-row items-center'>
                    <Hash size={24} className='text-indigo-600 mr-2' />
                    <h1 className='font-bold text-lg sm:text-xl'>Room<span className='text-indigo-600'>Id: "{roomName}"</span></h1>
                </div>
            </div>
            
  
            {mobileMenuOpen && (
                <div className='md:hidden bg-white p-3 shadow-md'>
                    <div className='flex flex-row items-center mb-2'>
                        <Hash size={24} className='text-indigo-600 mr-2' />
                        <h1 className='font-bold text-lg'>Room<span className='text-indigo-600'>Id: "{roomName}"</span></h1>
                    </div>
                </div>
            )}

            <div className='flex flex-col p-4 flex-grow'>
                
                <div className='w-full mx-auto max-w-xl px-2'>
                    <Active roomName={roomName} />
                </div>

            
                <div className='shadow-lg bg-white p-4 rounded-xl w-full mx-auto max-w-xl mb-4 mt-2 px-2'>
                    <div className='flex flex-row text-indigo-600 mb-2'>
                        <ChartNoAxesCombined size={20} className='mr-2' />
                        <h1 className='text-lg font-bold'>Stats</h1>
                    </div>
                    <div className='flex flex-col sm:flex-row justify-center items-center'>
                        <div className='shadow-md p-2 my-2 sm:mx-4 w-full sm:w-auto rounded-xl bg-blue-50 flex flex-col'>
                            <div className='flex flex-row items-center text-indigo-600'>
                                <Clock size={18} />
                                <h1 className='my-1 ml-2 font-semibold'>Time Left</h1>
                            </div>
                            <Timer
                                isTyping={isTyping}
                                complete={quote.content === type.join('')}
                                onComplete={() => setTimerComplete(true)}
                            />
                        </div>
                        <div className='shadow-md p-2 my-2 sm:mx-4 w-full sm:w-auto rounded-xl bg-blue-50 flex flex-col'>
                            <div className='flex flex-row items-center text-indigo-600'>
                                <ChevronsUp size={18} />
                                <h1 className='my-1 ml-2 font-semibold'>Speed</h1>
                            </div>
                            <Wpm
                                quote={quote.content}
                                typedText={type}
                                isTyping={isTyping}
                            />
                        </div>
                    </div>
                </div>

                
                <div className='w-full mx-auto max-w-xl bg-white rounded-xl p-3 mb-4'>
                    <div className='flex flex-row justify-between items-center mb-2'>
                        <div className='flex flex-row items-center text-indigo-600'>
                            <Quote className='mr-2' size={20} />
                            <h1 className='text-lg font-bold'>Quote</h1>
                        </div>
                        <button 
                            className='text-sm text-white font-bold bg-green-600 rounded-md py-1 px-3 hover:scale-105 transition-transform duration-200 flex flex-row items-center' 
                            onClick={handleQuoteChange}
                        >
                            <RotateCw size={16} className='mr-1' />
                            <span className='hidden sm:inline'>Change Quote</span>
                            <span className='sm:hidden'>New</span>
                        </button>
                    </div>
                    <div className='shadow-md shadow-indigo-500/50 p-2 mx-1 sm:mx-4 mb-3 rounded-xl bg-blue-50 font-semibold text-sm sm:text-md overflow-auto'>
                        {quote.content && quote.content.split('').map((letter, index) => {
                            const typedChar = type[index]
                            const isCorrect = typedChar === letter;
                            const isIncorrect = typedChar !== undefined && typedChar !== letter
                            return (
                                <span 
                                    className={`${isCorrect ? "text-green-600" : ""} ${isIncorrect ? "text-red-600" : ""}`} 
                                    key={index}
                                >
                                    {letter}
                                </span>
                            )
                        })}
                    </div>
                </div>

                
                <div className="w-full mx-auto max-w-xl px-2 mb-4">
                    <textarea
                        onPaste={(e) => e.preventDefault()}
                        onContextMenu={(e) => e.preventDefault()}
                        disabled={(type.join('') === quote.content) || timerComplete}
                        className="w-full h-24 sm:h-28 bg-white shadow-lg p-3 border-2 border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 outline-none transition resize-none"
                        placeholder="Start typing here..."
                        value={inputValue}
                        onChange={typingChange}
                    />
                </div>
            </div>
        </div>
    )
}

export default Home
