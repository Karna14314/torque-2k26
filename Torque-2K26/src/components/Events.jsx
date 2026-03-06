import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { events } from '../data/data.js';

const Events = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };

  const EventCard = ({ event }) => (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      onClick={() => setSelectedEvent(event)}
      className={`industrial-card overflow-hidden cursor-pointer group flex flex-col h-full ${event.bentoColSpan || 'col-span-1'} ${event.bentoRowSpan || 'row-span-1'}`}
    >
      {/* Event Image */}
      <div className="relative h-48 md:h-56 overflow-hidden flex-shrink-0">
        <img
          src={event.image}
          alt={event.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/50 to-transparent"></div>
      </div>

      {/* Event Content */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold text-gold mb-3 group-hover:text-yellow-400 transition-colors">
          {event.name}
        </h3>
        <p className="text-text/80 text-sm mb-4 line-clamp-2 flex-grow">
          {event.tagline}
        </p>

        {/* Register Button */}
        <button className="neu-button w-full text-center mt-auto">
          View Details
        </button>
      </div>
    </motion.div>
  );

  const EventModal = ({ event, onClose }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="industrial-card max-w-3xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gold hover:text-yellow-400 transition-colors z-10"
          aria-label="Close modal"
        >
          <svg
            className="w-8 h-8"
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

        {/* Event Image */}
        <div className="relative h-64 md:h-80 overflow-hidden rounded-t-2xl">
          <img
            src={event.image}
            alt={event.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent"></div>
        </div>

        {/* Event Details */}
        <div className="p-8">
          <h2 className="text-4xl font-bold text-gold mb-4">
            {event.name}
          </h2>
          <p className="text-text text-xl mb-6 italic">
            {event.tagline}
          </p>

          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-3">
              <span className="text-gold text-2xl">🎯</span>
              <div>
                <h4 className="text-gold font-semibold mb-1">Event Type</h4>
                <p className="text-text/80">Technical Competition</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-gold text-2xl">📅</span>
              <div>
                <h4 className="text-gold font-semibold mb-1">Date</h4>
                <p className="text-text/80">To be announced</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-gold text-2xl">👥</span>
              <div>
                <h4 className="text-gold font-semibold mb-1">Team Size</h4>
                <p className="text-text/80">Individual or Team</p>
              </div>
            </div>
          </div>

          {/* Register Button */}
          {event.registrationLink ? (
            <a
              href={event.registrationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="neu-button w-full text-center block"
            >
              Register Now
            </a>
          ) : (
            <button
              className="neu-button w-full text-center opacity-60 cursor-not-allowed"
              disabled
            >
              Registration Opens Soon
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <section id="events" className="min-h-screen py-20 px-4">
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
            Events
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto mb-6"></div>
          <p className="text-text/80 text-lg max-w-2xl mx-auto">
            Compete, innovate, and showcase your engineering prowess across our diverse range of technical events
          </p>
        </motion.div>

        {/* Events Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[minmax(300px,auto)] gap-6 md:gap-8"
        >
          {events.map((event, index) => {
            // Apply bento grid spanning dynamically based on index to make it interesting
            const isLarge = index === 0 || index === 7;
            const bentoEvent = {
              ...event,
              bentoColSpan: isLarge ? 'sm:col-span-2 lg:col-span-2' : 'col-span-1',
              bentoRowSpan: isLarge ? 'row-span-2' : 'row-span-1'
            };
            return <EventCard key={event.id} event={bentoEvent} />;
          })}
        </motion.div>
      </div>

      {/* Event Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <EventModal
            event={selectedEvent}
            onClose={() => setSelectedEvent(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Events;
