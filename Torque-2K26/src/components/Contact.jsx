import { motion } from 'framer-motion';
import { teamMembers, festInfo, developers } from '../data/data.js';

const Contact = () => {
  // Group team members by category
  const facultyCoordinators = teamMembers.filter(member => member.category === 'faculty');
  const studentCoordinators = teamMembers.filter(member => member.category === 'student');
  const technicalCoordinators = teamMembers.filter(member => member.category === 'technical');

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
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  };

  const PersonCard = ({ person }) => (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="person-card"
    >
      {/* Profile Photo - Circular with double border */}
      <div className="person-photo-wrapper">
        <img
          src={person.image}
          alt={person.name}
          className="person-photo"
        />
      </div>

      {/* Name */}
      <h3 className="person-name">
        {person.name}
      </h3>

      {/* Role */}
      <p className="person-role">
        {person.role}
      </p>

      {/* Year/Branch */}
      {person.year && (
        <p className="person-year">
          Year {person.year}
        </p>
      )}
      {person.branch && (
        <p className="person-year">
          {person.branch}
        </p>
      )}

      {/* Phone */}
      {person.phone && (
        <a
          href={`tel:${person.phone}`}
          className="person-phone"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          {person.phone}
        </a>
      )}
    </motion.div>
  );

  const TeamSection = ({ title, members }) => (
    <div className="mb-16">
      {/* Section Heading with Horizontal Rules */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="team-section-heading"
      >
        <div className="team-section-line"></div>
        <h3 className="team-section-title">{title}</h3>
        <div className="team-section-line"></div>
      </motion.div>

      {/* Cards Container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="team-cards-container"
      >
        {members.map((member, index) => (
          <PersonCard key={index} person={member} />
        ))}
      </motion.div>
    </div>
  );

  return (
    <section id="contact" className="min-h-screen py-20 px-4">
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
            Contact Us
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto mb-6"></div>
          <p className="text-text/80 text-lg max-w-2xl mx-auto">
            Get in touch with our team for any queries or collaborations
          </p>
        </motion.div>

        {/* Faculty Coordinators */}
        {facultyCoordinators.length > 0 && (
          <TeamSection title="Faculty Coordinators" members={facultyCoordinators} />
        )}

        {/* Student Coordinators */}
        {studentCoordinators.length > 0 && (
          <TeamSection title="Student Coordinators" members={studentCoordinators} />
        )}

        {/* Technical Coordinators */}
        {technicalCoordinators.length > 0 && (
          <TeamSection title="Technical Coordinators" members={technicalCoordinators} />
        )}

        {/* Social Media & Email */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center"
        >
          {/* Social Media Icons */}
          <div className="flex justify-center gap-6 mb-8">
            <a
              href={festInfo.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="neu-button p-4 hover:scale-110 transition-transform"
              aria-label="Instagram"
            >
              <svg
                className="w-6 h-6 text-gold"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>

            <a
              href={festInfo.socialLinks.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="neu-button p-4 hover:scale-110 transition-transform"
              aria-label="YouTube"
            >
              <svg
                className="w-6 h-6 text-gold"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>

          {/* Email */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-8"
          >
            <p className="text-text/80 mb-2">For any queries, reach us at:</p>
            <a
              href={`mailto:${festInfo.email}`}
              className="text-gold hover:text-yellow-400 transition-colors text-lg font-semibold"
            >
              {festInfo.email}
            </a>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 pt-8 border-t border-gold/20 text-center"
        >
          <p className="text-text/60 mb-2">
            Made with ❤️ for TORQUE 2K26
          </p>
          {/* Developer credits kept in code but hidden from UI */}
          <p className="text-text/40 text-sm" style={{ display: 'none' }}>
            Developed by {developers.map((dev, index) => (
              <span key={index}>
                {index > 0 && ', '}
                <span className="text-gold">{dev.name}</span>
              </span>
            ))}
          </p>
          <p className="text-text/40 text-xs mt-2">
            {festInfo.department}
          </p>
          <p className="text-text/40 text-xs">
            {festInfo.college}
          </p>
        </motion.footer>
      </div>
    </section>
  );
};

export default Contact;
