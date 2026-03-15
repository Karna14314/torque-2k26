import { motion } from 'framer-motion';
import { sponsors } from '../data/data.js';

// Double the array so the CSS marquee loops seamlessly
const track = [...sponsors, ...sponsors];

const Sponsors = () => (
  <section id="sponsors" className="py-16 px-4 overflow-hidden">
    <div className="max-w-7xl mx-auto">

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-gold mb-3">Our Sponsors</h2>
        <div className="w-20 h-1 bg-gold mx-auto" />
      </motion.div>

      {/* Recessed tray */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="sponsors-tray"
      >
        {/* Fade edges */}
        <div className="sponsors-fade-left" />
        <div className="sponsors-fade-right" />

        <div className="sponsors-track">
          {track.map((s, i) => (
            <div key={i} className="sponsor-logo-wrap">
              <img
                src={s.logo}
                alt={s.name}
                className="sponsor-logo"
                loading="lazy"
                onError={e => { e.target.style.opacity = '0.3' }}
              />
              <span className="sponsor-name">{s.name}</span>
            </div>
          ))}
        </div>
      </motion.div>

    </div>
  </section>
);

export default Sponsors;
