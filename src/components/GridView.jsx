import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

/**
 * Grid view for events/workshops - displays items in a responsive bento-style grid
 * with organized layout and better visual hierarchy
 */
const GridView = ({ items, type }) => {
  const navigate = useNavigate();

  const handleCardClick = (item) => {
    navigate(type === 'workshop' ? `/workshop/${item.id}` : `/event/${item.id}`);
  };

  // Get category color based on event category
  const getCategoryColor = (category) => {
    const categories = {
      'Technical': 'rgba(59, 130, 246, 0.15)',
      'Design': 'rgba(168, 85, 247, 0.15)',
      'Gaming': 'rgba(239, 68, 68, 0.15)',
      'Workshop': 'rgba(212, 175, 55, 0.15)',
      'EVENT': 'rgba(212, 175, 55, 0.1)',
    };
    return categories[category] || 'rgba(212, 175, 55, 0.1)';
  };

  return (
    <div className="grid-view-container">
      <div className="bento-grid">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`bento-card ${item.featured ? 'featured' : ''}`}
            onClick={() => handleCardClick(item)}
          >
            <div className="bento-card-image">
              <img src={item.image} alt={item.name} loading="lazy" />
              <div className="bento-card-overlay">
                <span className="bento-card-badge">
                  {type === 'workshop' && item.emoji ? `${item.emoji} ` : ''}
                  {type === 'workshop' ? 'WORKSHOP' : 'EVENT'}
                </span>
              </div>
            </div>
            
            <div className="bento-card-content">
              <h3 className="bento-card-title">{item.name}</h3>
              <p className="bento-card-tagline">{item.tagline}</p>
              
              {/* Category and meta info */}
              <div className="bento-card-meta">
                {type === 'workshop' && (item.duration || item.level) && (
                  <>
                    {item.duration && <span className="meta-tag">⏱ {item.duration}</span>}
                    {item.level && <span className="meta-tag">📊 {item.level}</span>}
                  </>
                )}
                {type === 'event' && item.category && (
                  <span 
                    className="meta-tag"
                    style={{ background: getCategoryColor(item.category) }}
                  >
                    {item.category}
                  </span>
                )}
              </div>
              
              <button 
                className="bento-card-btn"
                onClick={(e) => { e.stopPropagation(); handleCardClick(item); }}
              >
                View Details →
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default GridView;
