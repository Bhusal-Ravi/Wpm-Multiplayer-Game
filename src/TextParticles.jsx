// src/TestParticles.jsx
import React from 'react';
import ParticleBackground from './components/ParticleBackground';

export default function TestParticles() {
    return (
        <div>
            <ParticleBackground />
            <h1 className="text-white relative z-10 text-3xl text-center mt-40">Do you see particles?</h1>
        </div>
    );
}
