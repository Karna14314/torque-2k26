import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { festInfo } from '../data/data.js';


// Countdown Timer Component
const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate) - new Date();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const TimeCard = ({ value, label }) => (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center"
    >
      <div
        className="industrial-card px-6 py-4 min-w-[80px]"
      >
        <div className="text-3xl font-bold text-gold mb-1 font-mono">
          {String(value).padStart(2, '0')}
        </div>
      </div>
      <div className="text-text/70 text-xs uppercase tracking-widest mt-2">
        {label}
      </div>
    </motion.div>
  );

  return (
    <div className="flex gap-3 flex-wrap justify-center">
      <TimeCard value={timeLeft.days} label="Days" />
      <TimeCard value={timeLeft.hours} label="Hours" />
      <TimeCard value={timeLeft.minutes} label="Mins" />
      <TimeCard value={timeLeft.seconds} label="Secs" />
    </div>
  );
};

// Main Hero Component
const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Gears Background */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="gear-container">
          <div className="gear gear-1"></div>
          <div className="gear gear-2"></div>
          <div className="gear gear-3"></div>
        </div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 w-full px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto text-center"
        >
          {/* University Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-8"
          >
            <h2 className="text-text text-lg md:text-xl font-light mb-2">
              {festInfo.university}
            </h2>
            <h3 className="text-text/80 text-base md:text-lg font-light">
              {festInfo.college}
            </h3>
          </motion.div>

          {/* Department */}
          <motion.h4
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-gold text-sm md:text-base uppercase tracking-widest mb-8"
          >
            {festInfo.department}
          </motion.h4>

          {/* Torque Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mb-6"
          >
            <img
              src="/images/TORQUE.svg"
              alt="Torque Logo"
              className="w-full max-w-xs mx-auto"
              style={{ maxHeight: '120px', objectFit: 'contain' }}
            />
          </motion.div>

          {/* Year Title */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold text-gold mb-8"
          >
            {festInfo.title}
          </motion.h1>

          {/* Coming Soon & Countdown Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mb-12 flex flex-col items-center gap-6"
          >
            <div
              className="industrial-card px-12 py-6 inline-block"
            >
              <div className="text-3xl md:text-5xl font-bold text-gold tracking-widest mb-4 text-center">
                COMING SOON
              </div>
              <CountdownTimer targetDate={festInfo.festDate} />
            </div>
          </motion.div>

          {/* Download Poster Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <a
              href={festInfo.brochureLink}
              target="_blank"
              rel="noopener noreferrer"
              className="neu-button inline-block"
            >
              Download Poster
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Gear Animation Styles */}
      <style jsx>{`
        .gear-container {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .gear {
          position: absolute;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath fill='%23d4af37' d='M50 10 L55 25 L70 25 L58 35 L63 50 L50 40 L37 50 L42 35 L30 25 L45 25 Z M50 50 L55 65 L70 65 L58 75 L63 90 L50 80 L37 90 L42 75 L30 65 L45 65 Z M10 50 L25 55 L25 70 L35 58 L50 63 L40 50 L50 37 L35 42 L25 30 L25 45 Z M90 50 L75 55 L75 70 L65 58 L50 63 L60 50 L50 37 L65 42 L75 30 L75 45 Z'/%3E%3C/svg%3E");
          background-size: contain;
          background-repeat: no-repeat;
          opacity: 0.15;
        }

        .gear-1 {
          width: 300px;
          height: 300px;
          top: 10%;
          left: 10%;
          animation: rotate-clockwise 20s linear infinite;
        }

        .gear-2 {
          width: 200px;
          height: 200px;
          bottom: 15%;
          right: 15%;
          animation: rotate-counter-clockwise 15s linear infinite;
        }

        .gear-3 {
          width: 150px;
          height: 150px;
          top: 60%;
          left: 70%;
          animation: rotate-clockwise 25s linear infinite;
        }

        @keyframes rotate-clockwise {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes rotate-counter-clockwise {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        @media (max-width: 768px) {
          .gear-1 {
            width: 200px;
            height: 200px;
          }
          .gear-2 {
            width: 150px;
            height: 150px;
          }
          .gear-3 {
            width: 100px;
            height: 100px;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
