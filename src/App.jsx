import { Outlet } from 'react-router-dom';
import { SocketContext, socket } from './socket-context';
import ParticleBackground from './ParticleBackground';

function App() {
  return (
    <SocketContext.Provider value={socket}>
      <ParticleBackground />
      <div className="relative z-10">
        <Outlet />
      </div>
    </SocketContext.Provider>
  );
}

export default App;