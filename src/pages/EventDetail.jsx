import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { events, festInfo } from '../data/data.js';

const EventDetail = ({ onRegister }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = events.find(e => e.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl text-gold mb-4">Event Not Found</h2>
          <button onClick={() => navigate('/')} className="neu-button">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-12 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Event Image - Full Width */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full mb-8"
        >
          <div className="glass-card overflow-hidden rounded-2xl" style={{ maxWidth: '700px', margin: '0 auto' }}>
            <img
              src={event.image}
              alt={event.name}
              className="w-full h-auto object-contain"
              style={{ maxHeight: '400px', width: '100%' }}
            />
          </div>
        </motion.div>

        {/* Event Title - Full Width */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="glass-card p-8 mb-6"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gold mb-3">
            {event.name}
          </h1>
          <p className="text-text/80 text-xl italic">
            {event.tagline}
          </p>
        </motion.div>

        {/* Grid Layout for Info Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Description */}
          {event.description && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="glass-card p-6 hover-lift"
            >
              <h3 className="text-gold font-bold text-2xl mb-4">About This Event</h3>
              <p className="text-text/90 text-lg leading-relaxed">
                {event.description}
              </p>
            </motion.div>
          )}

          {/* Event Sections in Grid */}
          {event.sections && event.sections.map((section, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + idx * 0.1, duration: 0.6 }}
              className={`glass-card p-6 hover-lift ${section.type === 'table' || section.content?.length > 5 ? 'md:col-span-2' : ''
                }`}
            >
              <h3 className="text-gold font-bold text-2xl mb-4">
                {section.title}
              </h3>

              {section.type === 'list' && (
                <ul className="space-y-3">
                  {Array.isArray(section.content) ? section.content.map((item, i) => (
                    <li key={i} className="text-text/80 text-lg leading-relaxed flex gap-3">
                      <span className="text-gold mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  )) : (
                    <li className="text-text/80 text-lg leading-relaxed">{section.content}</li>
                  )}
                </ul>
              )}

              {section.type === 'table' && Array.isArray(section.content) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {section.content.map((item, i) => (
                    <div key={i} className="p-4 rounded-lg bg-gold/5 border border-gold/20">
                      <p className="text-gold/70 text-sm mb-1">{item.label}</p>
                      <p className="text-text font-semibold text-lg">{item.value}</p>
                    </div>
                  ))}
                </div>
              )}

              {section.type === 'text' && (
                <p className="text-text/80 whitespace-pre-line leading-relaxed text-lg">
                  {section.content}
                </p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Coordinators - Full Width Centered */}
        {event.coordinators && event.coordinators.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="glass-card p-8 mb-6"
            style={{ maxWidth: '800px', margin: '0 auto 24px' }}
          >
            <h3 className="text-gold font-bold text-2xl mb-6 text-center">Event Coordinators</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {Array.isArray(event.coordinators) && event.coordinators.map((coord, i) => (
                <div
                  key={i}
                  className="text-center p-4 rounded-lg bg-gold/5 border border-gold/10 hover-lift"
                >
                  <div className="coordinator-image">
                    {coord.image ? (
                      <img
                        src={coord.image}
                        alt={coord.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentElement.innerHTML = '<span class="text-gold text-sm font-bold">' + coord.name.charAt(0) + '</span>';
                        }}
                      />
                    ) : (
                      <span className="text-gold text-sm font-bold">{coord.name.charAt(0)}</span>
                    )}
                  </div>
                  <p className="text-text font-bold text-base mb-1">{coord.name}</p>
                  {coord.phone && (
                    <a
                      href={`tel:${coord.phone}`}
                      className="text-gold/70 text-sm hover:text-gold transition-colors"
                    >
                      {coord.phone}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Register Button - Centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-center"
        >
          {festInfo.registrationOpen ? (
            <button className="register-btn" onClick={onRegister}>
              Register Now
            </button>
          ) : (
            <button className="neu-button inline-block text-lg px-8 py-4" style={{ opacity: 0.5, cursor: 'not-allowed' }} disabled>
              Registration Opens Soon
            </button>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default EventDetail;
