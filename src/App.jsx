import TestParticles from './TestParticles';

function App() {
  return (
    <SocketContext.Provider value={socket}>
      <ParticleBackground />
      <div className="relative z-10">
        <TestParticles />
      </div>
    </SocketContext.Provider>
  );
}
