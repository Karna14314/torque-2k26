import { useState } from 'react';
import { motion } from 'framer-motion';
import { workshops } from '../data/data.js';

const Workshops = () => {
  const [isPaused, setIsPaused] = useState(false);

  const WorkshopCard = ({ workshop }) => (
    <div className="workshop-card flex-shrink-0 w-[350px] mx-4">
      <div
        className="workshop-card-inner overflow-hidden relative group cursor-pointer rounded-2xl transition-all duration-300 hover:transform hover:-translate-y-3 hover:shadow-2xl"
        style={{
          minHeight: '380px',
          backgroundImage: `url(${workshop.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
        }}
      >
        {/* Dark Overlay */}
        <div 
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)'
          }}
        ></div>

        {/* Content */}
        <div className="relative h-full flex flex-col justify-end p-6 z-10">
          <div className="flex items-end justify-between gap-4">
            {/* Text Content - Bottom Left */}
            <div className="flex-1">
              <p className="text-white/70 mb-2" style={{ fontSize: '0.9rem' }}>
                {workshop.tagline}
              </p>
              <h3 className="text-white font-bold" style={{ fontSize: '1.5rem' }}>
                {workshop.name}
              </h3>
            </div>

            {/* Know More Button - Bottom Right */}
            <button className="workshop-outline-button flex-shrink-0">
              Know More
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section id="workshops" className="min-h-screen py-20 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gold mb-4">
            Workshops
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto mb-6"></div>
          <p className="text-text/80 text-lg max-w-2xl mx-auto">
            Hands-on learning experiences with cutting-edge technologies and industry experts
          </p>
        </motion.div>

        {/* Carousel Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="overflow-hidden py-8">
            <div
              className="flex workshop-carousel"
              style={{
                width: 'fit-content'
              }}
            >
              {/* Original Cards */}
              {workshops.map((workshop) => (
                <WorkshopCard key={workshop.id} workshop={workshop} />
              ))}

              {/* Cloned Cards for Seamless Loop */}
              {workshops.map((workshop) => (
                <WorkshopCard key={`clone-${workshop.id}`} workshop={workshop} />
              ))}

              {/* Additional Clone Set for Smoother Infinite Scroll */}
              {workshops.map((workshop) => (
                <WorkshopCard key={`clone2-${workshop.id}`} workshop={workshop} />
              ))}
            </div>
          </div>

          {/* Gradient Overlays for Edge Fade Effect */}
          <div className="absolute left-0 top-0 bottom-0 w-32 pointer-events-none z-10" style={{ background: 'linear-gradient(to right, var(--bg), transparent)' }}></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 pointer-events-none z-10" style={{ background: 'linear-gradient(to left, var(--bg), transparent)' }}></div>
        </motion.div>

        {/* Hover Instruction */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center text-text/60 text-sm mt-8"
        >
          Hover over a card to pause and explore
        </motion.p>
      </div>

      <style>{`
        @keyframes carousel {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        .workshop-carousel {
          animation: carousel 30s linear infinite;
        }

        .workshop-carousel:hover {
          animation-play-state: paused;
        }

        @media (max-width: 768px) {
          .workshop-card {
            width: 300px;
          }
        }
      `}</style>
    </section>
  );
};

export default Workshops;
