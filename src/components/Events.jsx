import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { events } from '../data/data.js';
import { useRef } from 'react';

const Events = ({ onRegister }) => {
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320; // Card width + gap
      const currentScroll = scrollContainerRef.current.scrollLeft;
      scrollContainerRef.current.scrollTo({
        left: currentScroll + (direction === 'left' ? -scrollAmount : scrollAmount),
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="events" className="min-h-screen py-20 px-4 overflow-hidden">
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

        {/* Horizontal Scrolling Carousel */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={() => scroll('left')}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 neu-button w-12 h-12 items-center justify-center"
            aria-label="Scroll left"
          >
            <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => scroll('right')}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 neu-button w-12 h-12 items-center justify-center"
            aria-label="Scroll right"
          >
            <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div
            className="events-carousel-container"
            ref={scrollContainerRef}
          >
            <div className="events-carousel-track">
              {/* Display events without duplication */}
              {events.map((event, index) => (
                <motion.div
                  key={event.id}
                  className="event-card-carousel"
                  onClick={() => navigate(`/event/${event.id}`)}
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="event-card-image">
                    <img
                      src={event.image}
                      alt={event.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="event-card-overlay"></div>
                  </div>
                  <div className="event-card-content">
                    <h3 className="event-card-title">{event.name}</h3>
                    <p className="event-card-tagline">{event.tagline}</p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/event/${event.id}`);
                      }}
                      className="event-card-button"
                    >
                      View Details
                    </button>
                    <button
                      className="event-card-button"
                      style={{ marginTop: '8px', opacity: 0.6, cursor: 'not-allowed' }}
                      disabled
                    >
                      Registration Opens Soon
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;
