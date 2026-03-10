import { motion } from 'framer-motion';
import { festInfo, developers } from '../data/data.js';

const Footer = () => {
    const { location } = festInfo;

    return (
        <footer id="location" className="border-t border-gold/20 flex flex-col mt-auto pb-4">
            {/* Location Section — Strictly 50/50 split */}
            <div className="w-full max-w-7xl mx-auto px-4 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="neu-card overflow-hidden grid grid-cols-1 md:grid-cols-2 shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
                    style={{ borderRadius: '16px', border: '1px solid rgba(212,175,55,0.1)' }}
                >
                    {/* Left Half — Map */}
                    <div
                        className="relative w-full md:h-full border-b md:border-b-0 md:border-r border-gold/10"
                        style={{ minHeight: '300px' }}
                    >
                        <iframe
                            src={location.mapEmbedUrl}
                            className="absolute inset-0 w-full h-full border-none filter grayscale hover:grayscale-0 transition-all duration-700"
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Mechanical Department Location"
                        ></iframe>
                    </div>

                    {/* Right Half — Details */}
                    <div
                        className="flex flex-col justify-center p-6 md:p-8 relative"
                        style={{
                            background: 'linear-gradient(135deg, rgba(30,30,30,0.6) 0%, rgba(10,10,10,0.9) 100%)',
                            backdropFilter: 'blur(10px)'
                        }}
                    >
                        {/* Dept Title */}
                        <div className="mb-6">
                            <h3 className="text-gold text-2xl md:text-3xl font-bold leading-tight drop-shadow-md">
                                Department of Mechanical Engineering Location
                            </h3>
                            <div className="w-16 h-1 bg-gold mt-4 rounded-full opacity-60"></div>
                        </div>

                        {/* Address Details */}
                        <div className="space-y-2 text-text/90">
                            <p className="font-bold text-lg text-white drop-shadow-sm">Department of Mechanical Engineering</p>
                            <p className="opacity-80">University College of Engineering Kakinada</p>
                            <p className="opacity-80">Pithapuram Road</p>
                            <p className="opacity-80">Kakinada, Andhra Pradesh, 533003</p>
                            <p className="opacity-80">India</p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Global Bottom Credits Bar */}
            <div className="w-full text-center py-6 mt-4 border-t border-gold/10 bg-surface/30">
                <p className="text-text/70 text-sm font-medium tracking-wide mb-2 flex items-center justify-center gap-2">
                    Made with <span className="text-red-500 text-lg">❤️</span> for TORQUE 2K26
                </p>
                <p className="text-text/40 text-[11px] uppercase tracking-[0.2em] font-light">
                    {festInfo.department} • {festInfo.college}
                </p>
                <p className="hidden">
                    Developed by {developers.map(d => d.name).join(', ')}
                </p>
            </div>
        </footer>
    );
};

export default Footer;
