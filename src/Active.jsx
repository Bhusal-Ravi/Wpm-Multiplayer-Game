import React, { useContext, useEffect, useState } from 'react'
import { SocketContext } from './socket-context'


function Active() {
    const socket = useContext(SocketContext)
    const [active, setActive] = useState([])

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
        <div>
            <h1>Active List</h1>
            {active.map((list) =>
            (

                <p className='text-black' key={list.id}>{list.name}{list.wpm}</p>
            )
            )}
        </div>
    )
}

export default Active