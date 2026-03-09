import { useState } from 'react'
import { festInfo } from '../data/data.js'

const RegistrationModal = ({ item, onClose, showOnsite = false }) => {

  const [step, setStep] = useState(2)
  const [type, setType] = useState(showOnsite ? 'onsite' : 'external')
  const [form, setForm] = useState({
    name: '', phone: '', email: '',
    branch: '', rollNo: '',
    college: '', transactionId: '',
    paymentMethod: '', screenshot: null,
    screenshotBase64: ''
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [submitError, setSubmitError] = useState('')
  const [copied, setCopied] = useState(false)

  // ─── Price logic ───────────────────────────────────────
  const getPrice = () => {
    if (!type) return null
    if (type === 'internal') {
      return form.branch === 'ME'
        ? item.prices.internalME
        : form.branch
          ? item.prices.internalOthers
          : null
    }
    return type === 'external' ? item.prices.external : item.prices.onsite
  }

  const price = getPrice()
  const isFree = price === 0
  const activeUpiId = item.upiId || festInfo.upiId

  const update = (field, value) => {
    setForm(f => ({ ...f, [field]: value }))
    setErrors(e => ({ ...e, [field]: '' }))
  }

  const compressImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (event) => {
        const img = new Image()
        img.src = event.target.result
        img.onload = () => {
          const canvas = document.createElement('canvas')
          let width = img.width
          let height = img.height

          // Max dimension 1200px
          const MAX_SIZE = 1200
          if (width > height) {
            if (width > MAX_SIZE) {
              height *= MAX_SIZE / width
              width = MAX_SIZE
            }
          } else {
            if (height > MAX_SIZE) {
              width *= MAX_SIZE / height
              height = MAX_SIZE
            }
          }

          canvas.width = width
          canvas.height = height
          const ctx = canvas.getContext('2d')
          ctx.drawImage(img, 0, 0, width, height)

          // Export as JPEG with 0.6 quality for small payload
          resolve(canvas.toDataURL('image/jpeg', 0.6))
        }
      }
    })
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setLoading(true) // Show loading while compressing
    try {
      const compressedBase64 = await compressImage(file)
      setForm(f => ({
        ...f,
        screenshot: file,
        screenshotBase64: compressedBase64
      }))
    } catch (err) {
      setErrors({ proof: 'Failed to process image' })
    } finally {
      setLoading(false)
    }
  }

  // ─── Validation ────────────────────────────────────────
  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Required'
    if (!/^\d{10}$/.test(form.phone)) e.phone = 'Enter valid 10-digit number'
    if (!form.email.includes('@') || !form.email.includes('.')) e.email = 'Enter valid email'
    if (type === 'internal') {
      if (!form.rollNo.trim()) e.rollNo = 'Required'
      if (!form.branch) e.branch = 'Select your branch'
    }
    if (type === 'external') {
      if (!form.college.trim()) e.college = 'Required'
    }
    if (type === 'onsite') {
      if (!form.paymentMethod) e.paymentMethod = 'Select payment method'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const validatePayment = () => {
    if (!form.transactionId.trim() && !form.screenshot) {
      setErrors({ proof: 'Provide Transaction ID or upload screenshot' })
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
      college: form.college || (type === 'internal' ? 'UCEK' : '-'),
      transactionId: form.transactionId || '-',
      paymentMethod: type === 'internal' && finalPrice === 0 ? 'WAIVED'
        : type === 'internal' ? 'UPI'
          : type === 'external' ? 'UPI'
            : form.paymentMethod,
      screenshotData: form.screenshotBase64,
      screenshotName: form.screenshot ? form.screenshot.name : '',
      paymentStatus: type === 'internal' && finalPrice === 0 ? 'WAIVED'
        : type === 'internal' ? 'PENDING VERIFICATION'
          : type === 'external' ? 'PENDING VERIFICATION'
            : 'PENDING — COLLECT AT VENUE'
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
            <h2 style={S.heading}>Who are you?</h2>
            <p style={S.sub}>Select your registration type</p>

            {[
              {
                key: 'internal',
                icon: '🎓',
                title: 'UCEK Student',
                sub: 'Mechanical — Free · Other branches — ₹' + item.prices.internalOthers,
                badge: 'ME FREE',
                badgeColor: '#4caf50'
              },
              {
                key: 'external',
                icon: '🌐',
                title: 'Outside College',
                sub: 'Online registration + UPI payment',
                badge: '₹' + item.prices.external,
                badgeColor: '#d4af37'
              },
              {
                key: 'onsite',
                icon: '🚶',
                title: 'On-Site Walk-in',
                sub: 'Pay at venue on event day',
                badge: '₹' + item.prices.onsite,
                badgeColor: '#d4af37'
              }
            ]
              .filter(opt => {
                if (opt.key === 'onsite') return showOnsite;
                return true;
              })
              .map(opt => (
                <div
                  key={opt.key}
                  style={S.typeCard}
                  onClick={() => { setType(opt.key); setStep(2) }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(212,175,55,0.5)'
                    e.currentTarget.style.transform = 'translateX(4px)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(212,175,55,0.15)'
                    e.currentTarget.style.transform = 'translateX(0)'
                  }}
                >
                  <span style={{ fontSize: '1.8rem' }}>{opt.icon}</span>
                  <div style={{ flexGrow: 1 }}>
                    <div style={{ color: '#f0ede6', fontWeight: 600, fontSize: '0.95rem' }}>
                      {opt.title}
                    </div>
                    <div style={{ color: 'rgba(240,237,230,0.5)', fontSize: '0.78rem', marginTop: '2px' }}>
                      {opt.sub}
                    </div>
                  </div>
                  <span style={{
                    background: opt.badgeColor === '#4caf50'
                      ? 'rgba(76,175,80,0.12)' : 'rgba(212,175,55,0.1)',
                    border: `1px solid ${opt.badgeColor === '#4caf50'
                      ? 'rgba(76,175,80,0.3)' : 'rgba(212,175,55,0.3)'}`,
                    color: opt.badgeColor,
                    borderRadius: '20px', padding: '3px 10px',
                    fontSize: '0.78rem', fontWeight: 700,
                    whiteSpace: 'nowrap'
                  }}>
                    {opt.badge}
                  </span>
                </div>
              ))}
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

            {/* Internal extras */}
            {type === 'internal' && (
              <>
                <div style={fieldWrap}>
                  <label style={labelStyle}>Roll Number *</label>
                  <input
                    style={inputStyle('rollNo')}
                    value={form.rollNo}
                    onChange={e => update('rollNo', e.target.value)}
                    placeholder="22N81A0XXX"
                  />
                  {errors.rollNo && <p style={errorStyle}>{errors.rollNo}</p>}
                </div>

                <div style={fieldWrap}>
                  <label style={labelStyle}>Branch *</label>
                  <select
                    style={{ ...inputStyle('branch'), appearance: 'none' }}
                    value={form.branch}
                    onChange={e => update('branch', e.target.value)}
                  >
                    <option value="">Select Branch</option>
                    {['ME', 'CE', 'EEE', 'ECE', 'CSE', 'IT', 'Other'].map(b => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                  {errors.branch && <p style={errorStyle}>{errors.branch}</p>}
                </div>

                {/* Price preview after branch selected */}
                {form.branch && (
                  <div style={{
                    background: isFree ? 'rgba(76,175,80,0.08)' : 'rgba(212,175,55,0.06)',
                    border: `1px solid ${isFree ? 'rgba(76,175,80,0.25)' : 'rgba(212,175,55,0.2)'}`,
                    borderRadius: '10px', padding: '10px 14px',
                    marginBottom: '14px',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                  }}>
                    <span style={{ color: 'rgba(240,237,230,0.6)', fontSize: '0.85rem' }}>
                      Registration Fee
                    </span>
                    <span style={{
                      color: isFree ? '#4caf50' : '#d4af37',
                      fontWeight: 700, fontSize: '1rem'
                    }}>
                      {isFree ? 'FREE' : '₹' + price}
                      <span style={{ color: 'rgba(240,237,230,0.4)', fontSize: '0.72rem', fontWeight: 400, marginLeft: '6px' }}>
                        ({form.branch === 'ME' ? 'Mechanical — no fee' : 'other branch fee'})
                      </span>
                    </span>
                  </div>
                )}
              </>
            )}

            {/* External extras */}
            {type === 'external' && (
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
            )}

            {/* Onsite extras */}
            {type === 'onsite' && (
              <>
                <div style={fieldWrap}>
                  <label style={labelStyle}>College (Optional)</label>
                  <input
                    style={inputStyle('college')}
                    value={form.college}
                    onChange={e => update('college', e.target.value)}
                    placeholder="Leave blank if UCEK"
                  />
                </div>

                <div style={fieldWrap}>
                  <label style={labelStyle}>Payment Method at Venue *</label>
                  <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
                    {['CASH', 'UPI'].map(method => (
                      <button
                        key={method}
                        type="button"
                        style={{
                          flex: 1, padding: '11px',
                          borderRadius: '10px', cursor: 'pointer',
                          fontFamily: 'Poppins', fontWeight: 600,
                          fontSize: '0.9rem', transition: 'all 0.2s',
                          background: form.paymentMethod === method
                            ? '#d4af37' : '#111',
                          color: form.paymentMethod === method
                            ? '#0d0d0d' : '#d4af37',
                          border: `1px solid ${form.paymentMethod === method
                            ? '#d4af37' : 'rgba(212,175,55,0.25)'}`
                        }}
                        onClick={() => update('paymentMethod', method)}
                      >
                        {method === 'CASH' ? '💵 Cash' : '📱 UPI'}
                      </button>
                    ))}
                  </div>
                  {errors.paymentMethod && <p style={errorStyle}>{errors.paymentMethod}</p>}
                </div>
              </>
            )}

            {submitError && <p style={{ color: '#ff6b6b', fontSize: '0.82rem', marginBottom: '10px' }}>{submitError}</p>}

            <button
              style={{
                ...S.submitBtn,
                opacity: loading ? 0.7 : 1,
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
              onClick={() => {
                if (!validate()) return
                if (type === 'external' || (type === 'internal' && price > 0)) { setStep(3); return }
                handleSubmit()
              }}
              disabled={loading}
            >
              {loading ? 'Submitting...' : (type === 'external' || (type === 'internal' && price > 0)) ? 'Next — Payment →' : 'Submit Registration'}
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

            <div style={{ textAlign: 'center', color: 'rgba(240,237,230,0.35)', fontSize: '0.8rem', margin: '4px 0 10px' }}>
              — or —
            </div>

            <div style={fieldWrap}>
              <input
                type="file"
                accept="image/*"
                id="screenshot"
                style={{ display: 'none' }}
                onChange={handleFileUpload}
              />
              <label htmlFor="screenshot" style={S.uploadLabel}>
                📎 Upload Payment Screenshot (required)
              </label>
              {form.screenshot && (
                <p style={{ color: '#d4af37', fontSize: '0.78rem', marginTop: '6px' }}>
                  ✓ {form.screenshot.name}
                </p>
              )}
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
                {type === 'internal' && price === 0 &&
                  '✅ You\'re all set! Carry your college ID on the event day.'}
                {type === 'internal' && price > 0 &&
                  '⏳ Your payment is pending verification. A coordinator will confirm via phone.'}
                {type === 'external' &&
                  '⏳ Payment pending verification. Keep your Transaction ID handy.'}
                {type === 'onsite' &&
                  `📍 Visit the registration desk and pay ₹${price} via ${form.paymentMethod} on the event day.`}
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