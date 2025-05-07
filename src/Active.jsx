import React, { useContext, useEffect, useState } from 'react'
import { SocketContext } from './socket-context'
import { User } from 'lucide-react'


function Active() {
    const socket = useContext(SocketContext)
    const [active, setActive] = useState([])
    const [userId, setUserId] = useState(socket.id)

    useEffect(() => {
        function handlePlayersList(playerList) {

            const sorted = [...playerList].sort((a, b) => b.wpm - a.wpm)
            setActive(sorted)

            console.log(sorted)

        }


        socket.on('players', handlePlayersList);

        socket.emit('getPlayers')


        return () => {
            socket.off('players', handlePlayersList)

        }
    }, [socket])
    return (
        <div className=' w-full mx-auto max-w-xl bg-white p-4 rounded-xl shadow-md mb-6'>
            <div className='flex flex-row text-indigo-600'>
                <User size={20} className='mr-2 font-thin' ></User>
                <h1 className='font-semibold'>Active Players</h1>
            </div>
            <div className='grid grid-flow-row grid-cols-2 gap-4'>
                {active.map((list, index) =>
                (<div className={`flex flex-row justify-between ${index + 1 === 1 ? "bg-blue-200" : "bg-blue-50"} justify-items items-center shadow-md rounded-xl p-3 m-2`}>
                    <p className={`mr-2 ${index + 1 === 1 ? "font-bold  " : ""}`}>{index + 1}</p>
                    <p className={`text-gray-800 ${index + 1 === 1 ? "font-bold " : ""}`} key={list.id}>{list.name}</p>
                    {userId === list.id && (<p className='ml-1 text-xs bg-indigo-500 text-white px-2 py-0.5 rounded'>You</p>)}
                    <p className={`${index + 1 === 1 ? "bg-cyan-600 shadow-lg shadow-cyan-500/50" : "bg-indigo-500"} text-white font-bold rounded-xl p-1 ml-2`}>{list.wpm}<span className='ml-2'>wpm</span></p>
                </div>
                )
                )}
            </div>
        </div>
    )
}

export default Active