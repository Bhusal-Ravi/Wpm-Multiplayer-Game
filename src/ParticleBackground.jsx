import React, { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function ParticleBackground() {
    const particlesInit = useCallback(async (engine) => {
        // This adds the bundle to the main package
        await loadFull(engine);
    }, []);

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            options={{
                background: {
                    color: {
                        value: "#000000",
                    },
                },
                fullScreen: {
                    enable: true,
                    zIndex: -1,
                },
                particles: {
                    number: {
                        value: 100,
                    },
                    color: {
                        value: "#ffffff",
                    },
                    size: {
                        value: 2,
                    },
                    move: {
                        enable: true,
                        speed: 1,
                    },
                    links: {
                        enable: true,
                        distance: 150,
                        color: "#ffffff",
                        opacity: 0.4,
                        width: 1
                    },
                },
                detectRetina: true,
            }}
        />
    );
}