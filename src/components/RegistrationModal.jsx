import { useState } from 'react'
import { festInfo } from '../data/data.js'

const RegistrationModal = ({ item, onClose, showOnsite = false }) => {

  const [step, setStep] = useState(2)
  const [type, setType] = useState('external')
  const [form, setForm] = useState({
    name: '', phone: '', email: '',
    branch: '', rollNo: '',
    college: '', transactionId: '',
    paymentMethod: ''
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [submitError, setSubmitError] = useState('')
  const [copied, setCopied] = useState(false)

  // ─── Price logic ───────────────────────────────────────
  const getPrice = () => {
    return item.prices.external
  }

  const price = getPrice()
  const isFree = price === 0
  const activeUpiId = item.upiId || festInfo.upiId

  const update = (field, value) => {
    setForm(f => ({ ...f, [field]: value }))
    setErrors(e => ({ ...e, [field]: '' }))
  }



  // ─── Validation ────────────────────────────────────────
  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Required'
    if (!/^\d{10}$/.test(form.phone)) e.phone = 'Enter valid 10-digit number'
    if (!form.email.includes('@') || !form.email.includes('.')) e.email = 'Enter valid email'
    if (!form.college.trim()) e.college = 'Required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const validatePayment = () => {
    if (!form.transactionId.trim()) {
      setErrors({ proof: 'Transaction ID (UTR) is required' })
      return false
    }
    return true
  }

  // ─── Submit ────────────────────────────────────────────
  const generateId = (category) => {
    const prefix = category === 'WORKSHOP' ? 'WRK' : 'EVT'
    const ts = Date.now().toString().slice(-6)
    return 'TRQ26-' + prefix + '-' + ts
  }

  const handleSubmit = async () => {
    setLoading(true)
    setSubmitError('')

    const clientRegId = generateId(item.category || 'EVENT')
    const finalPrice = price ?? 0

    const payload = {
      registrationId: clientRegId,
      itemName: item.name,
      category: item.category || 'EVENT',
      registrationType: type.toUpperCase(),
      amountDue: finalPrice,
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      rollNo: form.rollNo || '-',
      branch: form.branch || '-',
      college: form.college || '-',
      transactionId: form.transactionId || '-',
      paymentMethod: 'UPI',
      paymentStatus: 'PENDING VERIFICATION'
    }

    if (!festInfo.appsScriptUrl) {
      await new Promise(r => setTimeout(r, 1200))
      setResult({ registrationId: clientRegId })
      setStep(4)
      setLoading(false)
      return
    }

    try {
      await fetch(festInfo.appsScriptUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(payload)
      })
      setResult({ registrationId: clientRegId })
      setStep(4)
    } catch {
      setSubmitError('Network error. Check your connection and retry.')
    } finally {
      setLoading(false)
    }
  }

  const copyUpi = () => {
    navigator.clipboard.writeText(activeUpiId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // ─── Shared input style ────────────────────────────────
  const inputStyle = (field) => ({
    width: '100%', background: '#111',
    border: `1px solid ${errors[field] ? '#ff6b6b' : 'rgba(212,175,55,0.2)'}`,
    borderRadius: '10px', padding: '11px 14px',
    color: '#f0ede6', fontFamily: 'Poppins',
    fontSize: '0.9rem', outline: 'none',
    boxSizing: 'border-box'
  })

  const fieldWrap = { marginBottom: '14px' }
  const labelStyle = {
    display: 'block', color: 'rgba(240,237,230,0.65)',
    fontSize: '0.78rem', fontWeight: 500, marginBottom: '5px'
  }
  const errorStyle = {
    color: '#ff6b6b', fontSize: '0.72rem', marginTop: '3px'
  }

  // ─── Render ────────────────────────────────────────────
  return (
    <div style={S.overlay} onClick={onClose}>
      <div style={S.box} onClick={e => e.stopPropagation()}>

        <button style={S.closeBtn} onClick={onClose}>✕</button>

        {/* Step dots */}
        {step < 4 && (
          <div style={S.dots}>
            {[1, 2, 3].map(n => (
              <div key={n} style={{
                ...S.dot,
                width: step === n ? '24px' : '8px',
                background: step === n
                  ? '#d4af37' : 'rgba(212,175,55,0.2)'
              }} />
            ))}
          </div>
        )}

        {/* Item badge */}
        {step < 4 && (
          <div style={S.badge}>
            {item.category || 'EVENT'} · {item.name}
          </div>
        )}

        {/* ── STEP 1 ── */}
        {step === 1 && (
          <div>
            <h2 style={S.heading}>Ready to Register?</h2>
            <p style={S.sub}>Proceed to fill out your details</p>

            <div
              style={S.typeCard}
              onClick={() => { setType('external'); setStep(2) }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(212,175,55,0.5)'
                e.currentTarget.style.transform = 'translateX(4px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(212,175,55,0.15)'
                e.currentTarget.style.transform = 'translateX(0)'
              }}
            >
              <span style={{ fontSize: '1.8rem' }}>🎟️</span>
              <div style={{ flexGrow: 1 }}>
                <div style={{ color: '#f0ede6', fontWeight: 600, fontSize: '0.95rem' }}>
                  Standard Registration
                </div>
                <div style={{ color: 'rgba(240,237,230,0.5)', fontSize: '0.78rem', marginTop: '2px' }}>
                  Online registration + UPI payment
                </div>
              </div>
              <span style={{
                background: 'rgba(212,175,55,0.1)',
                border: '1px solid rgba(212,175,55,0.3)',
                color: '#d4af37',
                borderRadius: '20px', padding: '3px 10px',
                fontSize: '0.78rem', fontWeight: 700,
                whiteSpace: 'nowrap'
              }}>
                ₹{item.prices.external}
              </span>
            </div>
          </div>
        )}

        {/* ── STEP 2 ── */}
        {step === 2 && (
          <div>
            <button
              style={S.backBtn}
              onClick={() => {
                // Since Step 1 is temporarily hidden, Back button now closes the modal
                onClose();
              }}
            >
              ← Back
            </button>
            <h2 style={S.heading}>Your Details</h2>

            {/* Name */}
            <div style={fieldWrap}>
              <label style={labelStyle}>Full Name *</label>
              <input
                style={inputStyle('name')}
                value={form.name}
                onChange={e => update('name', e.target.value)}
                placeholder="Your full name"
              />
              {errors.name && <p style={errorStyle}>{errors.name}</p>}
            </div>

            {/* Phone */}
            <div style={fieldWrap}>
              <label style={labelStyle}>Phone Number *</label>
              <input
                style={inputStyle('phone')}
                value={form.phone}
                onChange={e => update('phone', e.target.value)}
                placeholder="10-digit mobile number"
                type="tel" maxLength={10}
              />
              {errors.phone && <p style={errorStyle}>{errors.phone}</p>}
            </div>

            {/* Email */}
            <div style={fieldWrap}>
              <label style={labelStyle}>Email Address *</label>
              <input
                style={inputStyle('email')}
                value={form.email}
                onChange={e => update('email', e.target.value)}
                placeholder="Confirmation will be sent here"
                type="email"
              />
              {errors.email && <p style={errorStyle}>{errors.email}</p>}
              <p style={{ color: 'rgba(240,237,230,0.4)', fontSize: '0.72rem', marginTop: '3px' }}>
                📧 Confirmation email sent to this address
              </p>
            </div>

            {/* College Name */}
            <div style={fieldWrap}>
              <label style={labelStyle}>College Name *</label>
              <input
                style={inputStyle('college')}
                value={form.college}
                onChange={e => update('college', e.target.value)}
                placeholder="Your college name"
              />
              {errors.college && <p style={errorStyle}>{errors.college}</p>}
            </div>

            {submitError && <p style={{ color: '#ff6b6b', fontSize: '0.82rem', marginBottom: '10px' }}>{submitError}</p>}

            <button
              style={{
                ...S.submitBtn,
                opacity: loading ? 0.7 : 1,
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
              onClick={() => {
                if (!validate()) return
                setStep(3)
              }}
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Next — Payment →'}
            </button>
          </div>
        )}

        {/* ── STEP 3 — Payment (external only) ── */}
        {step === 3 && (
          <div>
            <button style={S.backBtn} onClick={() => { setStep(2); setErrors({}) }}>
              ← Back
            </button>
            <h2 style={S.heading}>Complete Payment</h2>

            {/* UPI payment box */}
            <div style={S.payBox}>
              <p style={{ color: 'rgba(240,237,230,0.5)', fontSize: '0.78rem', marginBottom: '4px' }}>
                Amount to Pay
              </p>
              <p style={{ color: '#d4af37', fontSize: '2.8rem', fontWeight: 800, lineHeight: 1, marginBottom: '16px' }}>
                ₹{item.prices.external}
              </p>

              <div style={S.upiRow}>
                <div>
                  <p style={{ color: 'rgba(240,237,230,0.5)', fontSize: '0.72rem' }}>UPI ID</p>
                  <p style={{ color: '#d4af37', fontFamily: 'monospace', fontWeight: 600, fontSize: '0.95rem' }}>
                    {activeUpiId}
                  </p>
                </div>
                <button style={S.copyBtn} onClick={copyUpi}>
                  {copied ? '✓ Copied' : 'Copy'}
                </button>
              </div>

              {/* QR Code Section */}
              <div style={{ marginTop: '20px', padding: '10px', background: '#fff', borderRadius: '12px', display: 'inline-block' }}>
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=${activeUpiId}&pn=${encodeURIComponent(festInfo.upiName)}&am=${price}&cu=INR`}
                  alt="Payment QR Code"
                  style={{ width: '150px', height: '150px', display: 'block' }}
                />
              </div>

              <p style={{ color: 'rgba(240,237,230,0.45)', fontSize: '0.78rem', marginTop: '12px', lineHeight: 1.5 }}>
                Scan QR or pay via UPI ID using any payment app, then provide proof below
              </p>
            </div>

            {/* Proof — either OR */}
            <div style={fieldWrap}>
              <label style={labelStyle}>Transaction ID (UTR)</label>
              <input
                style={inputStyle('transactionId')}
                value={form.transactionId}
                onChange={e => update('transactionId', e.target.value)}
                placeholder="12-digit UTR number"
              />
            </div>



            {errors.proof && <p style={errorStyle}>{errors.proof}</p>}
            {submitError && <p style={{ color: '#ff6b6b', fontSize: '0.82rem', marginBottom: '10px' }}>{submitError}</p>}

            <button
              style={{
                ...S.submitBtn,
                opacity: loading ? 0.7 : 1,
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
              onClick={() => { if (validatePayment()) handleSubmit() }}
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Confirm Registration'}
            </button>
          </div>
        )}

        {/* ── STEP 4 — Success ── */}
        {step === 4 && result && (
          <div style={{ textAlign: 'center' }}>
            <div style={S.checkCircle}>✓</div>

            <h2 style={{ color: '#d4af37', fontSize: '1.5rem', fontWeight: 700, marginBottom: '8px' }}>
              You&apos;re Registered!
            </h2>

            <p style={{ color: 'rgba(240,237,230,0.6)', fontSize: '0.85rem', marginBottom: '16px' }}>
              {item.name}
            </p>

            <div style={S.idBox}>
              <p style={{ color: 'rgba(240,237,230,0.5)', fontSize: '0.75rem', marginBottom: '4px' }}>
                Registration ID
              </p>
              <p style={{ color: '#d4af37', fontFamily: 'monospace', fontSize: '1.1rem', fontWeight: 700 }}>
                {result.registrationId}
              </p>
            </div>

            <div style={{
              background: '#111', borderRadius: '10px',
              padding: '14px', marginTop: '14px',
              border: '1px solid rgba(212,175,55,0.1)',
              textAlign: 'left'
            }}>
              <p style={{ color: '#f0ede6', fontSize: '0.85rem', lineHeight: 1.6 }}>
                ⏳ Payment pending verification. Keep your Transaction ID handy.
              </p>
            </div>

            <p style={{ color: 'rgba(240,237,230,0.4)', fontSize: '0.75rem', marginTop: '14px' }}>
              📧 Confirmation sent to {form.email}
            </p>

            <button style={{ ...S.submitBtn, marginTop: '16px' }} onClick={onClose}>
              Done
            </button>
          </div>
        )}

      </div>
    </div >
  )
}

// ─── Styles ───────────────────────────────────────────────
const S = {
  overlay: {
    position: 'fixed', inset: 0,
    background: 'rgba(0,0,0,0.88)',
    backdropFilter: 'blur(12px)',
    zIndex: 100,
    display: 'flex', alignItems: 'center',
    justifyContent: 'center', padding: '16px'
  },
  box: {
    background: '#1a1a1a',
    borderRadius: '20px',
    boxShadow: '8px 8px 20px #080808, -8px -8px 20px #2a2a2a',
    border: '1px solid rgba(212,175,55,0.15)',
    maxWidth: '460px', width: '100%',
    maxHeight: '88vh', overflowY: 'auto',
    padding: '32px 28px', position: 'relative'
  },
  closeBtn: {
    position: 'absolute', top: '14px', right: '16px',
    background: 'none', border: 'none',
    color: '#d4af37', fontSize: '1.1rem',
    cursor: 'pointer', zIndex: 1
  },
  dots: {
    display: 'flex', gap: '8px',
    justifyContent: 'center', marginBottom: '20px'
  },
  dot: {
    height: '8px', borderRadius: '4px',
    transition: 'all 0.3s ease'
  },
  badge: {
    display: 'inline-block',
    background: 'rgba(212,175,55,0.08)',
    border: '1px solid rgba(212,175,55,0.25)',
    borderRadius: '20px', padding: '3px 12px',
    color: '#d4af37', fontSize: '0.78rem',
    marginBottom: '18px'
  },
  heading: {
    color: '#f0ede6', fontSize: '1.25rem',
    fontWeight: 700, marginBottom: '6px'
  },
  sub: {
    color: 'rgba(240,237,230,0.5)',
    fontSize: '0.82rem', marginBottom: '18px'
  },
  typeCard: {
    display: 'flex', alignItems: 'center', gap: '14px',
    background: '#111',
    border: '1px solid rgba(212,175,55,0.15)',
    borderRadius: '12px', padding: '14px 16px',
    cursor: 'pointer', marginBottom: '10px',
    transition: 'all 0.2s ease'
  },
  backBtn: {
    background: 'none', border: 'none',
    color: 'rgba(240,237,230,0.5)',
    fontSize: '0.82rem', cursor: 'pointer',
    padding: 0, marginBottom: '12px',
    fontFamily: 'Poppins'
  },
  submitBtn: {
    width: '100%',
    background: '#d4af37', color: '#0d0d0d',
    border: 'none', borderRadius: '10px',
    padding: '13px', fontWeight: 700,
    fontSize: '0.95rem', cursor: 'pointer',
    fontFamily: 'Poppins',
    transition: 'all 0.2s ease', marginTop: '4px'
  },
  payBox: {
    border: '1px solid rgba(212,175,55,0.35)',
    borderRadius: '14px', padding: '20px',
    background: 'rgba(212,175,55,0.03)',
    marginBottom: '18px', textAlign: 'center'
  },
  upiRow: {
    display: 'flex', alignItems: 'center',
    justifyContent: 'space-between',
    background: '#111', borderRadius: '8px',
    padding: '10px 12px'
  },
  copyBtn: {
    background: 'rgba(212,175,55,0.1)',
    border: '1px solid rgba(212,175,55,0.3)',
    borderRadius: '6px', padding: '5px 12px',
    color: '#d4af37', fontSize: '0.78rem',
    cursor: 'pointer', fontFamily: 'Poppins'
  },
  uploadLabel: {
    display: 'block',
    background: '#111',
    border: '1px dashed rgba(212,175,55,0.3)',
    borderRadius: '10px', padding: '13px',
    color: 'rgba(240,237,230,0.55)',
    fontSize: '0.85rem', textAlign: 'center',
    cursor: 'pointer'
  },
  checkCircle: {
    width: '70px', height: '70px',
    border: '3px solid #d4af37',
    borderRadius: '50%',
    display: 'flex', alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 20px',
    color: '#d4af37', fontSize: '2rem',
    fontWeight: 700
  },
  idBox: {
    background: '#111',
    border: '1px solid rgba(212,175,55,0.25)',
    borderRadius: '10px', padding: '12px 16px'
  }
}

export default RegistrationModal