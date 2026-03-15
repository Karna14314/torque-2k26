import { useState, useEffect } from 'react';
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
  const [hasEnded, setHasEnded] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate) - new Date();

      if (difference > 0) {
        setHasEnded(false);
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setHasEnded(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
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
          className="font-bold text-gold mb-1"
          style={{
            fontSize: '2.5rem',
            fontFamily: "'Poppins', monospace",
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

  if (hasEnded) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <div
          className="text-3xl md:text-5xl font-bold text-gold mb-2"
          style={{ textShadow: '0 0 30px rgba(212,175,55,0.5)' }}
        >
          🎉 Welcome to TORQUE 2K26! 🎉
        </div>
        <p className="text-text/70 text-lg">The fest is live — let the innovation begin!</p>
      </motion.div>
    );
  }

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
const Hero = ({ onRegister }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
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
              src="/torque.webp"
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

          {/* Date Display - Flip Card Style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mb-12 flex flex-col items-center gap-6"
          >
            <div className="flex gap-2 md:gap-5 items-center justify-center">
              {/* 26 March */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="text-center bg-[#f0f0f0] p-2 md:p-[15px] rounded-[10px] min-w-[80px] md:min-w-[120px]"
              >
                <div className="w-[60px] h-[60px] md:w-[100px] md:h-[100px] bg-black text-white flex justify-center items-center text-3xl md:text-[60px] font-bold rounded-[5px] mx-auto mb-1 md:mb-2">
                  26
                </div>
                <label className="text-xs md:text-base font-semibold text-[#333]">March</label>
              </motion.div>

              {/* & Symbol */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.5 }}
                className="text-center bg-[#f0f0f0] p-2 md:p-[15px] rounded-[10px] min-w-[80px] md:min-w-[120px]"
              >
                <div className="w-[60px] h-[60px] md:w-[100px] md:h-[100px] bg-black text-white flex justify-center items-center text-3xl md:text-[60px] font-bold rounded-[5px] mx-auto mb-1 md:mb-2">
                  &
                </div>
                <label className="text-xs md:text-base font-semibold text-transparent">.</label>
              </motion.div>

              {/* 27 March */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.6, duration: 0.5 }}
                className="text-center bg-[#f0f0f0] p-2 md:p-[15px] rounded-[10px] min-w-[80px] md:min-w-[120px]"
              >
                <div className="w-[60px] h-[60px] md:w-[100px] md:h-[100px] bg-black text-white flex justify-center items-center text-3xl md:text-[60px] font-bold rounded-[5px] mx-auto mb-1 md:mb-2">
                  27
                </div>
                <label className="text-xs md:text-base font-semibold text-[#333]">March</label>
              </motion.div>
            </div>
          </motion.div>

          {/* Countdown Timer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.6 }}
          >
            <CountdownTimer targetDate="2026-03-26T00:00:00+05:30" />
          </motion.div>

          {/* Register Now Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.0, duration: 0.6 }}
            className="mt-10"
          >
            <button className="register-btn" onClick={onRegister}>
              Register Now
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
