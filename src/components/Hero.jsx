import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { festInfo } from '../data/data.js';


// ============================================
// COUNTDOWN TIMER - TEMPORARILY HIDDEN
// ============================================
// Uncomment this section when you want to show the countdown timer

/*
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
        className="neu-card px-6 py-4"
        style={{ minWidth: '90px' }}
      >
        <div 
          className="font-bold text-gold mb-1 font-mono"
          style={{ 
            fontSize: '2.5rem',
            textShadow: '0 0 15px rgba(212,175,55,0.3)'
          }}
        >
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
*/

// ============================================
// END COUNTDOWN TIMER
// ============================================

// Main Hero Component
const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ paddingTop: '100px' }}>
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

          {/* Radial Gold Glow Behind Logo */}
          <div
            style={{
              position: 'absolute',
              width: '600px',
              height: '600px',
              background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          ></div>

          {/* Torque Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mb-6 relative"
            style={{ zIndex: 1 }}
          >
            <img
              src="/torque.png"
              alt="Torque 2K26 Logo"
              className="mx-auto"
              style={{
                width: '100%',
                maxWidth: '600px',
                height: 'auto',
                background: 'transparent',
                mixBlendMode: 'normal',
                filter: 'drop-shadow(0 0 40px rgba(212,175,55,0.4))'
              }}
            />
          </motion.div>

          {/* Year Title */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold text-gold mb-8"
            style={{
              textShadow: '0 0 30px rgba(212,175,55,0.5), 0 0 60px rgba(212,175,55,0.2)'
            }}
          >
            {festInfo.title}
          </motion.h1>

          {/* Coming Soon Banner - Mechanical Industrial Design */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mb-12 flex flex-col items-center gap-6"
          >
            {/* Date Display - Flip Card Style */}
            <div className="flex gap-5 items-center justify-center flex-wrap">
              {/* 15 March */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="text-center"
                style={{
                  backgroundColor: '#f0f0f0',
                  padding: '15px',
                  borderRadius: '10px',
                  minWidth: '120px'
                }}
              >
                <div
                  style={{
                    width: '100px',
                    height: '100px',
                    backgroundColor: '#000000',
                    color: 'white',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '60px',
                    fontWeight: 'bold',
                    borderRadius: '5px',
                    margin: '0 auto 10px'
                  }}
                >
                  26
                </div>
                <label style={{ fontSize: '16px', fontWeight: '600', color: '#333' }}>March</label>
              </motion.div>

              {/* & Symbol */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.5 }}
                className="text-center"
                style={{
                  backgroundColor: '#f0f0f0',
                  padding: '15px',
                  borderRadius: '10px',
                  minWidth: '120px'
                }}
              >
                <div
                  style={{
                    width: '100px',
                    height: '100px',
                    backgroundColor: '#000000',
                    color: 'white',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '60px',
                    fontWeight: 'bold',
                    borderRadius: '5px',
                    margin: '0 auto 10px'
                  }}
                >
                  &
                </div>
                <label style={{ fontSize: '16px', fontWeight: '600', color: 'transparent' }}>.</label>
              </motion.div>

              {/* 27 March */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.6, duration: 0.5 }}
                className="text-center"
                style={{
                  backgroundColor: '#f0f0f0',
                  padding: '15px',
                  borderRadius: '10px',
                  minWidth: '120px'
                }}
              >
                <div
                  style={{
                    width: '100px',
                    height: '100px',
                    backgroundColor: '#000000',
                    color: 'white',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '60px',
                    fontWeight: 'bold',
                    borderRadius: '5px',
                    margin: '0 auto 10px'
                  }}
                >
                  27
                </div>
                <label style={{ fontSize: '16px', fontWeight: '600', color: '#333' }}>March</label>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
