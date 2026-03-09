import { motion } from 'framer-motion';
import { aboutText } from '../data/data.js';

const About = () => {
  return (
    <section id="about" className="min-h-screen py-20 px-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gold mb-4">
            About Us
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto"></div>
        </motion.div>

        {/* About Content Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="neu-card p-8 md:p-12 mb-16"
        >
          <div className="space-y-6">
            {aboutText.map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.2 }}
                className="text-text text-lg md:text-xl leading-relaxed text-justify"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </motion.div>

        {/* Marquee Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative overflow-hidden rounded-2xl"
          style={{
            background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(22, 33, 62, 0.8) 100%)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(212, 175, 55, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
          }}
        >
          <div className="marquee-container py-6">
            <div className="marquee-content">
              <span className="marquee-text text-2xl md:text-4xl font-bold text-gold tracking-wider">
                TORQUE 2K26 — MARCH 26 & 27! 🔥
              </span>
              <span className="marquee-text text-2xl md:text-4xl font-bold text-gold tracking-wider">
                TORQUE 2K26 — MARCH 26 & 27! 🔥
              </span>
              <span className="marquee-text text-2xl md:text-4xl font-bold text-gold tracking-wider">
                TORQUE 2K26 — MARCH 26 & 27! 🔥
              </span>
              <span className="marquee-text text-2xl md:text-4xl font-bold text-gold tracking-wider">
                TORQUE 2K26 — MARCH 26 & 27! 🔥
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        .marquee-container {
          width: 100%;
          overflow: hidden;
          position: relative;
        }

        .marquee-content {
          display: flex;
          animation: marquee 20s linear infinite;
          width: fit-content;
        }

        .marquee-text {
          padding: 0 4rem;
          white-space: nowrap;
          text-shadow: 0 0 20px rgba(212, 175, 55, 0.5);
        }

        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .marquee-content:hover {
          animation-play-state: paused;
        }

        @media (max-width: 768px) {
          .marquee-text {
            padding: 0 2rem;
          }
        }
      `}</style>
    </section>
  );
};

export default About;
