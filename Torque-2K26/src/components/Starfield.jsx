import { useEffect, useRef } from 'react';

const Starfield = () => {
    const canvasRef = useRef(null);
    const starsRef = useRef([]);
    const animationFrameRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let width = window.innerWidth;
        let height = window.innerHeight;

        canvas.width = width;
        canvas.height = height;

        // Star class
        class Star {
            constructor(x, y, maxSpeed) {
                this.x = x;
                this.y = y;
                this.slope = y / x;
                this.opacity = 0;
                this.speed = Math.max(Math.random() * maxSpeed, 1);
            }

            update(width, height, maxSpeed) {
                const increment = Math.min(this.speed, Math.abs(this.speed / this.slope));
                this.x += this.x > 0 ? increment : -increment;
                this.y = this.slope * this.x;
                this.opacity += this.speed / 100;

                if (Math.abs(this.x) > width / 2 || Math.abs(this.y) > height / 2) {
                    const randomX = Math.floor(Math.random() * (width / 5) - width / 10);
                    const randomY = Math.floor(Math.random() * (height / 5) - height / 10);
                    this.x = randomX;
                    this.y = randomY;
                    this.slope = randomY / randomX;
                    this.opacity = 0;
                    this.speed = Math.max(Math.random() * maxSpeed, 1);
                }
            }
        }

        // Initialize stars
        const numStars = 333;
        const maxSpeed = 5;
        starsRef.current = [];

        for (let i = 0; i < numStars; i++) {
            const x = Math.floor(Math.random() * width - width / 2);
            const y = Math.floor(Math.random() * height - height / 2);
            starsRef.current.push(new Star(x, y, maxSpeed));
        }

        let prevTime = 0;

        const animate = (currentTime) => {
            const elapsed = currentTime - prevTime;

            if (elapsed >= 30 || prevTime === 0) {
                prevTime = currentTime;

                // Clear canvas
                ctx.fillStyle = 'rgba(18, 18, 18, 0.5)'; // Using #121212 with opacity
                ctx.fillRect(0, 0, width, height);

                // Update and draw stars
                starsRef.current.forEach((star) => {
                    star.update(width, height, maxSpeed);
                    ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
                    ctx.fillRect(star.x + width / 2, star.y + height / 2, 2, 2);
                });
            }

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animationFrameRef.current = requestAnimationFrame(animate);

        // Handle resize
        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        window.addEventListener('resize', handleResize);

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full"
            style={{ background: '#121212', zIndex: -1 }}
        />
    );
};

export default Starfield;
