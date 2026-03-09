import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { workshops } from '../data/data.js';

const Workshops = ({ onRegister }) => {
  const navigate = useNavigate();

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

  const WorkshopCard = ({ workshop }) => (
    <motion.div
      variants={cardVariants}
      className="industrial-card overflow-hidden cursor-pointer group flex flex-col h-full"
      onClick={() => navigate(`/workshop/${workshop.id}`)}
    >
      {/* Workshop Image */}
      <div className="relative h-56 flex-shrink-0 overflow-hidden">
        <img
          src={workshop.image}
          alt={workshop.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

        {/* Emoji Badge */}
        <div className="absolute top-4 left-4 text-5xl">{workshop.emoji}</div>
      </div>

      {/* Workshop Content */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold text-gold mb-2 group-hover:text-yellow-400 transition-colors">
          {workshop.name}
        </h3>
        <p className="text-text/70 text-sm mb-4 italic">
          {workshop.tagline}
        </p>
        <p className="text-text/60 text-sm mb-4 line-clamp-3 flex-grow">
          {workshop.description}
        </p>

        {/* Workshop Meta */}
        <div className="flex flex-wrap gap-2 mb-4 text-xs">
          {workshop.duration && (
            <span className="px-3 py-1 rounded-full bg-gold/10 text-gold border border-gold/20">
              {workshop.duration}
            </span>
          )}
          {workshop.level && (
            <span className="px-3 py-1 rounded-full bg-gold/10 text-gold border border-gold/20">
              {workshop.level}
            </span>
          )}
        </div>

        {/* Learn More Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/workshop/${workshop.id}`);
          }}
          className="neu-button w-full text-center mt-auto"
        >
          Learn More
        </button>

        {/* Register Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRegister && onRegister(workshop);
          }}
          className="neu-button w-full text-center mt-2 bg-gold/10 text-gold border border-gold/30 hover:bg-gold/20"
        >
          Register
        </button>
      </div>
    </motion.div>
  );

  return (
    <section id="workshops" className="min-h-screen py-20 px-4">
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
            Hands-on learning experiences with industry experts and cutting-edge technologies
          </p>
        </motion.div>

        {/* Workshops Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {workshops.map((workshop) => (
            <WorkshopCard key={workshop.id} workshop={workshop} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Workshops;
