import { Outlet } from 'react-router-dom';
import { SocketContext, socket } from './socket-context';
import ParticleBackground from './components/Particles'; // adjust path if different

function App() {
  return (
    <SocketContext.Provider value={socket}>
      <ParticleBackground />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Outlet />
      </div>
    </SocketContext.Provider>
  );
}

export default App;