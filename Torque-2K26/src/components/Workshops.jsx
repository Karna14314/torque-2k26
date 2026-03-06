import { useState } from 'react';
import { motion } from 'framer-motion';
import { workshops } from '../data/data.js';

const Workshops = () => {
  const [isPaused, setIsPaused] = useState(false);

  const WorkshopCard = ({ workshop }) => (
    <div className="workshop-card flex-shrink-0 w-[350px] mx-4">
      <div
        className="neu-card overflow-hidden h-[400px] relative group cursor-pointer"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src={workshop.image}
            alt={workshop.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30"></div>
        </div>

        {/* Content */}
        <div className="relative h-full flex flex-col justify-end p-6 z-10">
          <div className="transform transition-transform duration-300 group-hover:-translate-y-2">
            <h3 className="text-3xl font-bold text-gold mb-2 flex items-center gap-2">
              {workshop.name}
              {workshop.emoji && <span className="text-2xl">{workshop.emoji}</span>}
            </h3>
            <p className="text-text/90 text-lg mb-4 italic">
              {workshop.tagline}
            </p>

            {/* Know More Button */}
            <button className="neu-button opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Know More
            </button>
          </div>
        </div>

        {/* Shine Effect on Hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
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
              className={`flex ${isPaused ? '' : 'animate-carousel'}`}
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
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-bg to-transparent pointer-events-none z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-bg to-transparent pointer-events-none z-10"></div>
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

      <style jsx>{`
        @keyframes carousel {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        .animate-carousel {
          animation: carousel 30s linear infinite;
        }

        .animate-carousel:hover {
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
