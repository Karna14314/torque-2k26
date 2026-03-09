import { useState } from 'react';
import { motion } from 'framer-motion';
import { events, workshops } from '../data/data.js';

const OnsiteAdmin = ({ onRegister }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('ALL');

    const allItems = [
        ...events.map(e => ({ ...e, category: 'EVENT' })),
        ...workshops.map(w => ({ ...w, category: 'WORKSHOP' }))
    ];

    const filteredItems = allItems.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === 'ALL' || item.category === filter;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="min-h-screen pt-32 pb-20 px-4">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-gold mb-4">
                        On-Site Registration Portal
                    </h1>
                    <p className="text-text/60">For Coordinator Use Only — Unauthorized Access Restricted</p>
                </motion.div>

                {/* Admin Controls */}
                <div className="glass-card p-6 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full md:w-96">
                        <input
                            type="text"
                            placeholder="Search event or workshop..."
                            className="w-full bg-black/40 border border-gold/20 rounded-xl px-4 py-3 text-text focus:border-gold outline-none transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="flex gap-2">
                        {['ALL', 'EVENT', 'WORKSHOP'].map(cat => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-4 py-2 rounded-lg font-semibold transition-all ${filter === cat
                                        ? 'bg-gold text-black'
                                        : 'bg-gold/10 text-gold border border-gold/20 hover:bg-gold/20'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredItems.map(item => (
                        <motion.div
                            layout
                            key={item.id}
                            className="glass-card p-5 hover-lift cursor-pointer flex flex-col"
                            onClick={() => onRegister(item, true)}
                        >
                            <div className="flex justify-between items-start mb-3">
                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${item.category === 'EVENT'
                                        ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                                        : 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                                    }`}>
                                    {item.category}
                                </span>
                                <span className="text-2xl">{item.emoji || '🔥'}</span>
                            </div>

                            <h3 className="text-xl font-bold text-text mb-2">{item.name}</h3>
                            <p className="text-text/50 text-xs mb-4 flex-grow line-clamp-2">{item.tagline}</p>

                            <button
                                className="w-full py-2 bg-gold/10 text-gold border border-gold/30 rounded-lg hover:bg-gold/20 font-bold text-sm transition-all"
                            >
                                Start Registration
                            </button>
                        </motion.div>
                    ))}
                </div>

                {filteredItems.length === 0 && (
                    <div className="text-center py-20 bg-black/20 rounded-3xl border border-dashed border-white/10">
                        <p className="text-text/40 text-lg">No matching events found.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OnsiteAdmin;
