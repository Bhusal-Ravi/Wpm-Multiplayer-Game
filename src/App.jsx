import { Outlet } from 'react-router-dom';
import { SocketContext, socket } from './socket-context';
import ParticleBackground from './ParticleBackground';

function App() {
  return (
    <SocketContext.Provider value={socket}>
      <div className="h-screen w-full relative overflow-hidden bg-transparent">
        <ParticleBackground />
        <div className="relative z-10 h-full w-full">
          <Outlet />
        </div>
      </div>
    </SocketContext.Provider>
  );
}

export default App;