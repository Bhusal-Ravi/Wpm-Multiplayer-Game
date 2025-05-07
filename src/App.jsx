import { useState } from 'react'
import Home from './Home'
import { Outlet } from 'react-router-dom'
import { SocketContext, socket } from './socket-context';



function App() {


  return (
    <SocketContext.Provider value={socket}>
      <Outlet />
    </SocketContext.Provider>
  )
}

export default App
