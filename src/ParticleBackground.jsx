import { useEffect, useRef, useState } from 'react';

export default function ParticleBackground() {
    const canvasRef = useRef(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        // Set initial dimensions
        setDimensions({
            width: window.innerWidth,
            height: window.innerHeight
        });

        // Update dimensions on resize
        const handleResize = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');

        // Particle settings
        const particleCount = 100;
        const particles = [];

        // Initialize particles
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * dimensions.width,
                y: Math.random() * dimensions.height,
                size: Math.random() * 2 + 1,
                speedX: (Math.random() - 0.5) * 1,
                speedY: (Math.random() - 0.5) * 1
            });
        }

        // Animation function
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(particle => {
                ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fill();

                // Update position
                particle.x += particle.speedX;
                particle.y += particle.speedY;

                // Handle boundary collisions
                if (particle.x < 0 || particle.x > dimensions.width) {
                    particle.speedX *= -1;
                }

                if (particle.y < 0 || particle.y > dimensions.height) {
                    particle.speedY *= -1;
                }
            });

            // Connect particles with lines if they're close enough
            for (let a = 0; a < particles.length; a++) {
                for (let b = a; b < particles.length; b++) {
                    const dx = particles[a].x - particles[b].x;
                    const dy = particles[a].y - particles[b].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / 100})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }

            requestAnimationFrame(animate);
        };

        const animationId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animationId);
        };
    }, [dimensions]);

    return (
        <canvas
            ref={canvasRef}
            width={dimensions.width}
            height={dimensions.height}
            className="fixed top-0 left-0 w-full h-full bg-black -z-10"
        />
    );
}