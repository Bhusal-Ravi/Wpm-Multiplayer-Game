import React from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function ParticlesBackground() {
    const particlesInit = async (main) => {
        await loadFull(main);
    };

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            options={{
                background: {
                    color: {
                        value: "#000000", // dark background
                    },
                },
                fullScreen: {
                    enable: true,
                    zIndex: -1, // place behind everything
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
                },
            }}
        />
    );
}
