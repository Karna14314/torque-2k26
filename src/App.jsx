import { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Home from './pages/Home.jsx';
import EventDetail from './pages/EventDetail.jsx';
import WorkshopDetail from './pages/WorkshopDetail.jsx';
import OnsiteAdmin from './pages/OnsiteAdmin.jsx';

import Starfield from './components/Starfield.jsx';
import RegistrationModal from './components/RegistrationModal.jsx';
import { festInfo } from './data/data.js';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Workshops', href: '#workshops' },
  { label: 'Events', href: '#events' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
  { label: 'Location', href: '#location' }
];

function Navigation() {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Navbar visibility
      if (currentScrollY < 100) {
        setIsNavVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsNavVisible(false);
      } else {
        setIsNavVisible(true);
      }

      setLastScrollY(currentScrollY);

      // Scroll progress
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (currentScrollY / windowHeight) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gold origin-left z-[60]"
        style={{ scaleX: scrollProgress / 100 }}
        initial={{ scaleX: 0 }}
      />

      {/* Fixed Navbar */}
      <motion.nav
        initial={{ y: 0 }}
        animate={{ y: isNavVisible ? 0 : -100 }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
      >
        <div className="max-w-7xl mx-auto neu-card backdrop-blur-xl bg-surface/80 px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Left side: Logo & Poster */}
            <div className="flex items-center gap-6">
              {/* Logo */}
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center cursor-pointer"
              >
                <img
                  src="/torque.webp"
                  alt="Torque 2K26 Logo"
                  className="h-10 md:h-12"
                  style={{ background: 'transparent' }}
                />
              </a>

              {/* Poster Button */}
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={festInfo.brochureLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{ whiteSpace: 'nowrap' }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gold/30 bg-gold/5 text-gold hover:bg-gold hover:text-surface transition-all duration-300 text-xs font-bold"
              >
                View Poster
              </motion.a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-text hover:text-gold transition-colors duration-300 font-medium"
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden focus:outline-none p-2 rounded-lg hover:bg-gold/10 transition-all duration-300"
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-5">
                <span 
                  className={`absolute h-0.5 w-6 bg-gold transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'rotate-45' : 'rotate-0'}`}
                  style={{ top: '0' }}
                />
                <span 
                  className={`absolute h-0.5 w-5 bg-gold transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}
                  style={{ top: '50%', left: '50%', transform: 'translateX(-50%) translateY(-50%)' }}
                />
                <span 
                  className={`absolute h-0.5 w-6 bg-gold transition-all duration-300 ease-in-out ${isMobileMenuOpen ? '-rotate-45' : 'rotate-0'}`}
                  style={{ bottom: '0' }}
                />
              </div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 w-64 bg-surface z-50 md:hidden shadow-2xl"
            >
              <div className="flex flex-col h-full p-6">
                {/* Logo in Sidebar */}
                <div className="flex items-center justify-between mb-8">
                  <img
                    src="/torque.webp"
                    alt="Torque 2K26 Logo"
                    className="h-10"
                    style={{ background: 'transparent' }}
                  />
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-10 h-10 rounded-full bg-gold/10 hover:bg-gold/20 transition-all duration-300 flex items-center justify-center text-gold hover:text-yellow-400"
                    aria-label="Close menu"
                  >
                    <svg
                      className="w-5 h-5"
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
                </div>

                {/* Mobile Nav Items */}
                <nav className="flex flex-col gap-6">
                  {navItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className="text-text hover:text-gold transition-colors duration-300 font-medium text-lg"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function App() {
  const [isRegModalOpen, setIsRegModalOpen] = useState(false);

  const openRegModal = () => {
    if (festInfo.registrationOpen) {
      setIsRegModalOpen(true);
    } else {
      alert('Registration has been closed for Torque 2K26.');
    }
  };

  return (
    <div className="min-h-screen font-poppins relative">
      <Starfield />
      <Navigation />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="pt-[120px]"
      >
        <Routes>
          <Route path="/" element={<Home onRegister={openRegModal} />} />
          <Route path="/event/:id" element={<EventDetail onRegister={openRegModal} />} />
          <Route path="/workshop/:id" element={<WorkshopDetail onRegister={openRegModal} />} />
          <Route path="/onsite2k26" element={<OnsiteAdmin />} />
        </Routes>
      </motion.main>

      {/* Registration Modal */}
      <RegistrationModal 
        isOpen={isRegModalOpen} 
        onClose={() => setIsRegModalOpen(false)} 
      />
    </div>
  );
}

export default App;
