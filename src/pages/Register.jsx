import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { packages, events, workshops, festInfo } from '../data/data.js';

const Register = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [regId, setRegId] = useState('');

    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        college: '',
        packageId: '',
        selectedEvents: [],
        selectedWorkshop: '',
        transactionId: ''
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [step]);

    const selectedPackage = packages.find(p => p.id === form.packageId);

    const validateStep = (s) => {
        const e = {};
        if (s === 1) {
            if (!form.name.trim()) e.name = 'Name is required';
            if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email is required';
            if (!form.phone.trim() || !/^\d{10}$/.test(form.phone)) e.phone = '10-digit phone is required';
            if (!form.college.trim()) e.college = 'College is required';
        } else if (s === 2) {
            if (!form.packageId) e.packageId = 'Please select a package';
        } else if (s === 3) {
            if (selectedPackage && selectedPackage.price.online > 50) {
                if (form.selectedEvents.length === 0) e.events = 'Select at least one event';
                if (form.selectedEvents.length > 2) e.events = 'Maximum 2 events allowed';
                if (!form.selectedWorkshop) e.workshop = 'Please select a workshop';
            }
        } else if (s === 4) {
            if (!form.transactionId.trim() || !/^\d{12}$/.test(form.transactionId)) e.transactionId = 'Enter 12-digit Transaction ID';
        }
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const nextStep = () => {
        if (validateStep(step)) {
            if (step === 2 && selectedPackage.price.online === 50) {
                setStep(4); // Skip events/workshops for 50 INR pass
            } else {
                setStep(step + 1);
            }
        }
    };

    const prevStep = () => {
        if (step === 4 && selectedPackage.price.online === 50) {
            setStep(2);
        } else {
            setStep(step - 1);
        }
    };

    const toggleEvent = (id) => {
        setForm(prev => {
            const current = [...prev.selectedEvents];
            if (current.includes(id)) {
                return { ...prev, selectedEvents: current.filter(i => i !== id) };
            } else if (current.length < 2) {
                return { ...prev, selectedEvents: [...current, id] };
            }
            return prev;
        });
    };

    const handleSubmit = async () => {
        if (!validateStep(4)) return;
        setLoading(true);

        const newRegId = 'TRQ26-' + Math.random().toString(36).substr(2, 6).toUpperCase();
        
        const payload = {
            registrationId: newRegId,
            registrationType: 'ONLINE-PORTAL',
            packageName: selectedPackage.name,
            amountPaid: selectedPackage.price.online,
            name: form.name,
            email: form.email,
            phone: form.phone,
            college: form.college,
            selectedEvents: form.selectedEvents.map(id => events.find(e => e.id === id)?.name).join(', '),
            selectedWorkshop: workshops.find(w => w.id === form.selectedWorkshop)?.name || 'None',
            transactionId: form.transactionId,
            paymentStatus: 'PENDING-VERIFICATION',
            timestamp: new Date().toISOString()
        };

        try {
            if (festInfo.appsScriptUrl) {
                await fetch(festInfo.appsScriptUrl, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: { 'Content-Type': 'text/plain' },
                    body: JSON.stringify(payload)
                });
            }
            setRegId(newRegId);
            setSubmitted(true);
        } catch (err) {
            console.error('Submission failed:', err);
            alert('Submission failed. Please try again or contact support.');
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="min-h-screen pt-20 pb-20 px-4 flex items-center justify-center">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-2xl w-full glass-card p-12 text-center"
                >
                    <div className="text-6xl mb-6">🎉</div>
                    <h2 className="text-4xl font-bold text-gold mb-4">Registration Submitted!</h2>
                    <p className="text-text/70 mb-8 text-lg">
                        Thank you, {form.name.split(' ')[0]}! Your registration is being processed.
                    </p>
                    <div className="neu-card p-6 mb-8 inline-block">
                        <p className="text-sm text-text/50 uppercase tracking-widest mb-2">Registration ID</p>
                        <p className="text-3xl font-bold text-gold tracking-wider">{regId}</p>
                    </div>
                    <p className="text-text/60 mb-8">
                        Keep this ID for future reference. A confirmation will be sent to {form.email} once payment is verified.
                    </p>
                    <button onClick={() => navigate('/')} className="register-btn">
                        Back to Home
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-8 pb-20 px-4">
            <div className="max-w-4xl mx-auto glass-card p-8 md:p-12 relative overflow-hidden">
                {/* Progress bar */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-white/5">
                    <motion.div 
                        className="h-full bg-gold shadow-[0_0_15px_rgba(212,175,55,0.5)]"
                        initial={{ width: '0%' }}
                        animate={{ width: `${(step / 4) * 100}%` }}
                    />
                </div>

                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-gold mb-2">Fest Registration</h2>
                    <p className="text-text/50">Step {step} of 4</p>
                </div>

                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div 
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            <h3 className="text-xl font-bold text-white mb-6">Personal Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm text-text/60 ml-1">Full Name</label>
                                    <input 
                                        type="text"
                                        placeholder="John Doe"
                                        className={`reg-input ${errors.name ? 'border-red-500/50' : ''}`}
                                        value={form.name}
                                        onChange={(e) => setForm({...form, name: e.target.value})}
                                    />
                                    {errors.name && <p className="text-red-400 text-xs ml-1">{errors.name}</p>}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-text/60 ml-1">Email Address</label>
                                    <input 
                                        type="email"
                                        placeholder="john@example.com"
                                        className={`reg-input ${errors.email ? 'border-red-500/50' : ''}`}
                                        value={form.email}
                                        onChange={(e) => setForm({...form, email: e.target.value})}
                                    />
                                    {errors.email && <p className="text-red-400 text-xs ml-1">{errors.email}</p>}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-text/60 ml-1">Phone Number</label>
                                    <input 
                                        type="tel"
                                        placeholder="10-digit mobile"
                                        className={`reg-input ${errors.phone ? 'border-red-500/50' : ''}`}
                                        value={form.phone}
                                        maxLength={10}
                                        onChange={(e) => setForm({...form, phone: e.target.value})}
                                    />
                                    {errors.phone && <p className="text-red-400 text-xs ml-1">{errors.phone}</p>}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-text/60 ml-1">College / University</label>
                                    <input 
                                        type="text"
                                        placeholder="UCEK, JNTUK"
                                        className={`reg-input ${errors.college ? 'border-red-500/50' : ''}`}
                                        value={form.college}
                                        onChange={(e) => setForm({...form, college: e.target.value})}
                                    />
                                    {errors.college && <p className="text-red-400 text-xs ml-1">{errors.college}</p>}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div 
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <h3 className="text-xl font-bold text-white mb-8">Select Your Pass</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {packages.map((pkg) => (
                                    <button
                                        key={pkg.id}
                                        onClick={() => setForm({...form, packageId: pkg.id})}
                                        className={`text-left p-6 rounded-2xl transition-all duration-300 border ${
                                            form.packageId === pkg.id 
                                            ? 'bg-gold/10 border-gold shadow-[0_0_20px_rgba(212,175,55,0.15)]' 
                                            : 'bg-white/5 border-white/10 hover:border-white/30'
                                        }`}
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <h4 className={`font-bold ${form.packageId === pkg.id ? 'text-gold' : 'text-white'}`}>{pkg.name}</h4>
                                            <span className="text-2xl font-bold">₹{pkg.price.online}</span>
                                        </div>
                                        <ul className="space-y-2">
                                            {pkg.includes.map((inc, i) => (
                                                <li key={i} className="text-sm text-text/60 flex items-center gap-2">
                                                    <span className="text-gold">✓</span> {inc}
                                                </li>
                                            ))}
                                        </ul>
                                    </button>
                                ))}
                            </div>
                            {errors.packageId && <p className="text-red-400 text-sm mt-4">{errors.packageId}</p>}
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div 
                            key="step3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-8"
                        >
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">Select 2 Events</h3>
                                <p className="text-text/50 text-sm mb-6">Choose any 2 events you wish to participate in.</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {events.map((ev) => (
                                        <button
                                            key={ev.id}
                                            onClick={() => toggleEvent(ev.id)}
                                            className={`p-4 rounded-xl text-left border transition-all ${
                                                form.selectedEvents.includes(ev.id)
                                                ? 'bg-gold/10 border-gold text-gold'
                                                : 'bg-white/5 border-white/10 text-white/70 hover:border-white/20'
                                            }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`w-5 h-5 rounded border ${
                                                    form.selectedEvents.includes(ev.id) ? 'bg-gold border-gold' : 'border-white/30'
                                                } flex items-center justify-center`}>
                                                    {form.selectedEvents.includes(ev.id) && <span className="text-black text-[10px] font-bold">L</span>}
                                                </div>
                                                <span className="font-medium">{ev.name}</span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                                {errors.events && <p className="text-red-400 text-sm mt-4">{errors.events}</p>}
                            </div>

                            <div className="pt-8 border-t border-white/5">
                                <h3 className="text-xl font-bold text-white mb-2">Select 1 Workshop</h3>
                                <p className="text-text/50 text-sm mb-6">Choose exactly 1 workshop from the options below.</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {workshops.map((ws) => (
                                        <button
                                            key={ws.id}
                                            onClick={() => setForm({...form, selectedWorkshop: ws.id})}
                                            className={`p-4 rounded-xl text-left border transition-all ${
                                                form.selectedWorkshop === ws.id
                                                ? 'bg-gold/10 border-gold text-gold'
                                                : 'bg-white/5 border-white/10 text-white/70 hover:border-white/20'
                                            }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="font-medium">{ws.name}</span>
                                                <div className={`w-5 h-5 rounded-full border ${
                                                    form.selectedWorkshop === ws.id ? 'bg-gold border-gold' : 'border-white/30'
                                                } flex items-center justify-center`}>
                                                    {form.selectedWorkshop === ws.id && <div className="w-2 h-2 rounded-full bg-black" />}
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                                {errors.workshop && <p className="text-red-400 text-sm mt-4">{errors.workshop}</p>}
                            </div>
                        </motion.div>
                    )}

                    {step === 4 && (
                        <motion.div 
                            key="step4"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="text-center"
                        >
                            <h3 className="text-2xl font-bold text-white mb-8">Secure Payment</h3>
                            
                            <div className="max-w-xs mx-auto mb-10">
                                <div className="neu-card p-6 bg-white flex flex-col items-center">
                                    <p className="text-black/40 text-[10px] uppercase font-bold tracking-tighter mb-4">Scan using any UPI App</p>
                                    <img 
                                        src={festInfo.upiQr} 
                                        alt="UPI QR Code" 
                                        className="w-full h-auto rounded-lg shadow-lg mb-4"
                                    />
                                    <p className="text-black font-bold text-lg">{festInfo.upiId}</p>
                                    <p className="text-black/60 text-xs">Merchant: {festInfo.upiName}</p>
                                </div>
                            </div>

                            <div className="space-y-6 max-w-md mx-auto">
                                <div className="p-6 bg-gold/5 border border-gold/20 rounded-2xl mb-8">
                                    <p className="text-text/70 text-sm mb-1 uppercase tracking-widest">Amount to Pay</p>
                                    <p className="text-4xl font-bold text-gold">₹{selectedPackage.price.online}</p>
                                </div>

                                <div className="space-y-3 text-left">
                                    <label className="text-sm text-text/60 ml-1">12-Digit Transaction ID (UTR)</label>
                                    <input 
                                        type="text"
                                        placeholder="e.g. 123456789012"
                                        className={`reg-input !bg-surface text-center tracking-[0.2em] text-xl font-bold ${errors.transactionId ? 'border-red-500/50' : ''}`}
                                        value={form.transactionId}
                                        maxLength={12}
                                        onChange={(e) => setForm({...form, transactionId: e.target.value.replace(/\D/g, '')})}
                                    />
                                    <p className="text-[10px] text-text/40 text-center">Reference can be found in your UPI app payment summary</p>
                                    {errors.transactionId && <p className="text-red-400 text-sm py-2 text-center">{errors.transactionId}</p>}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="flex justify-between items-center mt-16 pt-8 border-t border-white/5">
                    <button 
                        onClick={prevStep}
                        className={`text-text/60 hover:text-white transition-colors flex items-center gap-2 ${step === 1 ? 'invisible' : ''}`}
                    >
                        <span>←</span> Previous
                    </button>
                    
                    {step < 4 ? (
                        <button onClick={nextStep} className="register-btn">
                            Next Stage →
                        </button>
                    ) : (
                        <button 
                            onClick={handleSubmit} 
                            disabled={loading}
                            className={`register-btn ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {loading ? 'Processing...' : 'Complete Registration ✓'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Register;
