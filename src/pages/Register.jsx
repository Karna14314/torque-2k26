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

    return (
        <div className="min-h-screen pt-20 pb-20 px-4 flex items-center justify-center">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-2xl w-full glass-card p-12 text-center"
            >
                <div className="text-6xl mb-6">🔒</div>
                <h2 className="text-4xl font-bold text-gold mb-4">Registration Closed</h2>
                <p className="text-text/70 mb-8 text-lg">
                    Registration for Torque 2K26 has been officially closed.
                </p>
                <div className="neu-card p-6 mb-8 inline-block" style={{ borderColor: '#ff4d4d', background: 'rgba(255, 77, 77, 0.05)' }}>
                    <p className="text-xl font-bold text-[#ff4d4d] tracking-wider uppercase">Entries Terminated</p>
                </div>
                <p className="text-text/60 mb-8">
                    We look forward to seeing you at the fest! For any queries, please contact the department coordinators.
                </p>
                <button onClick={() => navigate('/')} className="register-btn">
                    Back to Home
                </button>
            </motion.div>
        </div>
    );
};

export default Register;
