import React, { useContext, useEffect, useState } from 'react'
import { SocketContext } from './socket-context'
import { User } from 'lucide-react'

function Active({ roomName }) {
    const socket = useContext(SocketContext)
    const [active, setActive] = useState([])
    const [userId, setUserId] = useState(socket.id)

    useEffect(() => {
        function handlePlayersList(playerList) {
            // Sort players by WPM in descending order
            const sorted = [...playerList].sort((a, b) => b.wpm - a.wpm)
            setActive(sorted)
        }

        socket.on('players', handlePlayersList);

        // Make sure to pass the room name when requesting players
        socket.emit('getPlayers', roomName);

        return () => {
            socket.off('players', handlePlayersList)
        }
    }, [socket, roomName]) // Added roomName as dependency

    return (
        <div className='w-full mx-auto max-w-xl bg-white p-4 rounded-xl shadow-md mb-6'>
            <div className='flex flex-row text-indigo-600'>
                <User size={20} className='mr-2 font-thin' />
                <h1 className='font-semibold text-lg'>Active Players in {roomName}</h1>
            </div>
            <div className='grid grid-flow-row grid-cols-2 gap-4'>
                {active.map((player, index) => (
                    <div
                        key={player.id}
                        className={`flex flex-row justify-between ${userId === player.id ? "border-2 border-double border-indigo-400" : ""} ${index === 0 ? "bg-blue-200" : "bg-blue-50"} items-center shadow-md rounded-xl p-3 m-2`}
                    >
                        <p className={`mr-2 ${index === 0 ? "font-bold" : ""}`}>{index + 1}</p>
                        <p className={`text-gray-800 ${index === 0 ? "font-bold" : ""}`}>{player.name}</p>
                        {userId === player.id && (<p className='animate-pulse ml-1 text-xs bg-indigo-500 text-white px-2 py-0.5 rounded'>You</p>)}
                        <p className={`${index === 0 ? "bg-cyan-600 shadow-lg shadow-cyan-500/50" : "bg-indigo-500"} text-white font-bold rounded-xl p-1 ml-2`}>{player.wpm}<span className='ml-2'>wpm</span></p>
                    </div>
                ))}
                {active.length === 0 && (
                    <div className="col-span-2 text-center text-gray-500 py-4">
                        No other players in this room yet
                    </div>
                )}
            </div>
        </div>
    )
}

export default Active