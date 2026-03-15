import { motion } from 'framer-motion';
import { workshops } from '../data/data.js';
import GridView from './GridView.jsx';

const Workshops = () => {
  return (
    <section id="workshops" className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gold mb-4">
            Workshops
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto mb-6" />
          <p className="text-text/80 text-lg max-w-2xl mx-auto">
            Hands-on learning experiences with industry experts
          </p>
        </motion.div>

        {/* Simple Grid Layout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <GridView items={workshops} type="workshop" />
        </motion.div>

      </div>
    </section>
  );
};

export default Workshops;
