import { Outlet } from 'react-router-dom';
import { SocketContext, socket } from './socket-context';
import ParticleBackground from './ParticleBackground';

function App() {
  return (
    <SocketContext.Provider value={socket}>
      <div className="h-full w-full relative overflow-hidden">
        <ParticleBackground />
        <div className="relative z-10 h-full">
          <Outlet />
        </div>
      </div>
    </SocketContext.Provider>
  );
}

export default App;