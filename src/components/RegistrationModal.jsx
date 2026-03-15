import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { packages, events, workshops, festInfo } from '../data/data.js';

const RegistrationModal = ({ isOpen, onClose }) => {
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
                setStep(4);
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

    const handleClose = () => {
        setStep(1);
        setSubmitted(false);
        setForm({
            name: '',
            email: '',
            phone: '',
            college: '',
            packageId: '',
            selectedEvents: [],
            selectedWorkshop: '',
            transactionId: ''
        });
        setErrors({});
        onClose();
    };

    const handleBackToHome = () => {
        handleClose();
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="reg-modal-overlay"
                onClick={(e) => e.target === e.currentTarget && handleClose()}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="reg-modal-box"
                >
                    {/* Close Button */}
                    <button className="reg-close-btn" onClick={handleClose}>
                        ✕
                    </button>

                    {submitted ? (
                        <div className="text-center py-6">
                            <div className="reg-success-check">✓</div>
                            <h2 className="text-2xl font-bold text-gold mb-3">Registration Submitted!</h2>
                            <p className="text-text/70 mb-6">
                                Thank you, {form.name.split(' ')[0]}! Your registration is being processed.
                            </p>
                            <div className="reg-id-box">
                                <p className="text-xs text-text/50 uppercase tracking-widest mb-1">Registration ID</p>
                                <p className="text-xl font-bold text-gold tracking-wider">{regId}</p>
                            </div>
                            <p className="text-text/50 text-sm mb-6">
                                A confirmation will be sent to {form.email} once payment is verified.
                            </p>
                            <button onClick={handleBackToHome} className="reg-next-btn w-full">
                                Done
                            </button>
                        </div>
                    ) : (
                        <>
                            {/* Progress Bar */}
                            <div className="reg-progress-bar">
                                <div 
                                    className="reg-progress-fill" 
                                    style={{ width: `${(step / 4) * 100}%` }}
                                />
                            </div>
                            <p className="reg-step-label">Step {step} of 4</p>

                            <AnimatePresence mode="wait">
                                {step === 1 && (
                                    <motion.div
                                        key="step1"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                    >
                                        <h3 className="reg-heading">Personal Information</h3>
                                        <p className="reg-subtext">Enter your details to get started</p>
                                        
                                        <div className="reg-field">
                                            <label className="reg-label">Full Name</label>
                                            <input
                                                type="text"
                                                placeholder="John Doe"
                                                className={`reg-input ${errors.name ? 'error' : ''}`}
                                                value={form.name}
                                                onChange={(e) => setForm({...form, name: e.target.value})}
                                            />
                                            {errors.name && <p className="reg-error">{errors.name}</p>}
                                        </div>

                                        <div className="reg-field">
                                            <label className="reg-label">Email Address</label>
                                            <input
                                                type="email"
                                                placeholder="john@example.com"
                                                className={`reg-input ${errors.email ? 'error' : ''}`}
                                                value={form.email}
                                                onChange={(e) => setForm({...form, email: e.target.value})}
                                            />
                                            {errors.email && <p className="reg-error">{errors.email}</p>}
                                        </div>

                                        <div className="reg-field">
                                            <label className="reg-label">Phone Number</label>
                                            <input
                                                type="tel"
                                                placeholder="10-digit mobile"
                                                className={`reg-input ${errors.phone ? 'error' : ''}`}
                                                value={form.phone}
                                                maxLength={10}
                                                onChange={(e) => setForm({...form, phone: e.target.value})}
                                            />
                                            {errors.phone && <p className="reg-error">{errors.phone}</p>}
                                        </div>

                                        <div className="reg-field">
                                            <label className="reg-label">College / University</label>
                                            <input
                                                type="text"
                                                placeholder="UCEK, JNTUK"
                                                className={`reg-input ${errors.college ? 'error' : ''}`}
                                                value={form.college}
                                                onChange={(e) => setForm({...form, college: e.target.value})}
                                            />
                                            {errors.college && <p className="reg-error">{errors.college}</p>}
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
                                        <h3 className="reg-heading">Select Your Pass</h3>
                                        <p className="reg-subtext">Choose the pass that suits you best</p>
                                        
                                        <div className="reg-packages-grid">
                                            {packages.map((pkg) => (
                                                <div
                                                    key={pkg.id}
                                                    onClick={() => setForm({...form, packageId: pkg.id})}
                                                    className={`reg-package-card ${form.packageId === pkg.id ? 'selected' : ''}`}
                                                >
                                                    <p className="reg-package-name">{pkg.name}</p>
                                                    <p className="reg-package-price">₹{pkg.price.online}</p>
                                                    <ul className="reg-package-includes">
                                                        {pkg.includes.map((inc, i) => (
                                                            <li key={i}>{inc}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                        {errors.packageId && <p className="reg-error">{errors.packageId}</p>}
                                    </motion.div>
                                )}

                                {step === 3 && (
                                    <motion.div
                                        key="step3"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                    >
                                        <h3 className="reg-heading">Select Events & Workshop</h3>
                                        <p className="reg-subtext">
                                            Choose up to 2 events and 1 workshop
                                        </p>

                                        <div className="reg-events-section-label">Events (Select 2)</div>
                                        <div className="reg-events-list">
                                            {events.map((ev) => {
                                                const isSelected = form.selectedEvents.includes(ev.id);
                                                const isDisabled = !isSelected && form.selectedEvents.length >= 2;
                                                
                                                return (
                                                    <div
                                                        key={ev.id}
                                                        onClick={() => !isDisabled && toggleEvent(ev.id)}
                                                        className={`reg-event-checkbox ${isSelected ? 'checked' : ''} ${isDisabled ? 'disabled' : ''}`}
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            checked={isSelected}
                                                            onChange={() => {}}
                                                            disabled={isDisabled}
                                                        />
                                                        <span className="reg-event-label">{ev.name}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        {errors.events && <p className="reg-error">{errors.events}</p>}

                                        <div className="reg-events-section-label">Workshop (Select 1)</div>
                                        <div className="reg-events-list">
                                            {workshops.map((ws) => {
                                                const isSelected = form.selectedWorkshop === ws.id;
                                                const isDisabled = !isSelected && form.selectedWorkshop !== '';
                                                
                                                return (
                                                    <div
                                                        key={ws.id}
                                                        onClick={() => !isDisabled && setForm({...form, selectedWorkshop: ws.id})}
                                                        className={`reg-event-checkbox ${isSelected ? 'checked' : ''} ${isDisabled ? 'disabled' : ''}`}
                                                    >
                                                        <input
                                                            type="radio"
                                                            name="workshop"
                                                            checked={isSelected}
                                                            onChange={() => {}}
                                                            disabled={isDisabled}
                                                        />
                                                        <span className="reg-event-label">{ws.name}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        {errors.workshop && <p className="reg-error">{errors.workshop}</p>}
                                    </motion.div>
                                )}

                                {step === 4 && (
                                    <motion.div
                                        key="step4"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                    >
                                        <h3 className="reg-heading">Complete Payment</h3>
                                        <p className="reg-subtext">Scan QR and enter transaction ID</p>

                                        <div className="reg-pay-box">
                                            <p className="text-xs text-text/50 uppercase tracking-widest mb-2">Amount to Pay</p>
                                            <p className="reg-amount">₹{selectedPackage?.price.online}</p>
                                            
                                            <div className="reg-upi-row">
                                                <span className="text-gold font-mono text-sm">{festInfo.upiId}</span>
                                                <button 
                                                    className="reg-copy-btn"
                                                    onClick={() => navigator.clipboard.writeText(festInfo.upiId)}
                                                >
                                                    Copy
                                                </button>
                                            </div>

                                            <div className="reg-qr-container">
                                                <img 
                                                    src={festInfo.upiQr} 
                                                    alt="UPI QR Code" 
                                                    className="reg-qr-img"
                                                />
                                            </div>
                                            <p className="text-[10px] text-text/40 mt-1">Scan using any UPI App (GPay, PhonePe, etc.)</p>
                                        </div>

                                        <div className="reg-field">
                                            <label className="reg-label">12-Digit Transaction ID (UTR)</label>
                                            <input
                                                type="text"
                                                placeholder="e.g. 123456789012"
                                                className={`reg-input text-center font-mono tracking-widest ${errors.transactionId ? 'error' : ''}`}
                                                value={form.transactionId}
                                                maxLength={12}
                                                onChange={(e) => setForm({...form, transactionId: e.target.value.replace(/\D/g, '')})}
                                            />
                                            {errors.transactionId && <p className="reg-error">{errors.transactionId}</p>}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Navigation Buttons */}
                            <div className="reg-nav-row">
                                {step > 1 && (
                                    <button onClick={prevStep} className="reg-back-btn">
                                        ← Back
                                    </button>
                                )}
                                {step < 4 ? (
                                    <button onClick={nextStep} className="reg-next-btn">
                                        Next →
                                    </button>
                                ) : (
                                    <button 
                                        onClick={handleSubmit} 
                                        disabled={loading}
                                        className="reg-next-btn"
                                    >
                                        {loading ? 'Processing...' : 'Complete Registration'}
                                    </button>
                                )}
                            </div>
                        </>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default RegistrationModal;
