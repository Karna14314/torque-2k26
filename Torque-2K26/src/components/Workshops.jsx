import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { workshops } from '../data/data.js';

const Workshops = () => {
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);

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
            <button 
              className="workshop-outline-button flex-shrink-0"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedWorkshop(workshop);
              }}
            >
              Know More
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const WorkshopModal = ({ workshop, onClose }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto"
      style={{ padding: '2rem' }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="neu-card max-w-4xl w-full my-8 relative"
        style={{
          background: 'linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%)',
          border: '2px solid rgba(212, 175, 55, 0.3)',
          boxShadow: '0 0 40px rgba(212, 175, 55, 0.2), inset 0 2px 4px rgba(0, 0, 0, 0.5)',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
      >
        {/* Close Button - More Prominent */}
        <button
          onClick={onClose}
          className="sticky top-4 right-4 float-right text-gold hover:text-yellow-400 transition-colors z-20 neu-button p-3"
          aria-label="Close modal"
          style={{
            background: 'rgba(212, 175, 55, 0.1)',
            border: '2px solid rgba(212, 175, 55, 0.5)',
            borderRadius: '50%'
          }}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Workshop Image Header */}
        <div 
          className="h-64 bg-cover bg-center rounded-t-2xl relative"
          style={{
            backgroundImage: `url(${workshop.image})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent rounded-t-2xl"></div>
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-5xl">{workshop.emoji}</span>
              <div>
                <h2 className="text-4xl font-bold text-gold">{workshop.name}</h2>
                <p className="text-white/80 text-lg">{workshop.tagline}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Workshop Details */}
        <div className="p-8">
          {/* Info Pills */}
          <div className="flex flex-wrap gap-3 mb-6">
            <div className="px-4 py-2 rounded-full bg-gold/10 border border-gold/30 text-gold text-sm">
              ⏱ {workshop.duration}
            </div>
            <div className="px-4 py-2 rounded-full bg-gold/10 border border-gold/30 text-gold text-sm">
              📊 {workshop.level}
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-gold mb-3">About This Workshop</h3>
            <p className="text-text/80 leading-relaxed">{workshop.description}</p>
          </div>

          {/* Highlights */}
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-gold mb-3">What You'll Learn</h3>
            <ul className="space-y-2">
              {workshop.highlights.map((highlight, index) => (
                <li key={index} className="flex items-start gap-3 text-text/80">
                  <span className="text-gold mt-1">⚙</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Prerequisites */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gold mb-3">Prerequisites</h3>
            <p className="text-text/80">{workshop.prerequisites}</p>
          </div>

          {/* Register Button */}
          <div className="flex justify-center gap-4">
            {workshop.registrationLink ? (
              <a
                href={workshop.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="neu-button inline-block"
              >
                Register Now
              </a>
            ) : (
              <div className="text-center">
                <div className="neu-button inline-block opacity-50 cursor-not-allowed">
                  Registration Opening Soon
                </div>
                <p className="text-text/60 text-sm mt-2">Stay tuned for registration details</p>
              </div>
            )}
            <button
              onClick={onClose}
              className="neu-button inline-block"
              style={{
                background: 'rgba(212, 175, 55, 0.1)',
                border: '2px solid rgba(212, 175, 55, 0.3)'
              }}
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
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
              className="flex justify-center gap-8 flex-wrap"
              style={{
                width: '100%'
              }}
            >
              {/* Original Cards */}
              {workshops.map((workshop) => (
                <WorkshopCard key={workshop.id} workshop={workshop} />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Click Instruction */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center text-text/60 text-sm mt-8"
        >
          Click "Know More" for workshop details
        </motion.p>
      </div>

      {/* Workshop Modal */}
      <AnimatePresence>
        {selectedWorkshop && (
          <WorkshopModal
            workshop={selectedWorkshop}
            onClose={() => setSelectedWorkshop(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Workshops;
