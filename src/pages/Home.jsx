import { motion } from 'framer-motion';
import Hero from '../components/Hero.jsx';
import About from '../components/About.jsx';
import Events from '../components/Events.jsx';
import Workshops from '../components/Workshops.jsx';
import Gallery from '../components/Gallery.jsx';
import Contact from '../components/Contact.jsx';

const Home = () => {
  return (
    <>
      <Hero />
      <div className="section-divider" />
      <About />
      <div className="section-divider" />
      <Workshops />
      <div className="section-divider" />
      <Events />
      <div className="section-divider" />
      <Gallery />
      <div className="section-divider" />
      <Contact />
    </>
  );
};

export default Home;
