import { useState, useEffect } from 'react'
import { festInfo, packages, events, workshops } from '../data/data.js'

const OnsiteAdmin = () => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    college: '',
    packageId: '',
    selectedEvents: [],
    selectedWorkshop: '',
    amountDue: '',
    paymentMethod: 'CASH',
    receivedBy: ''
  })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(null)
  const [stats, setStats] = useState(null)

  const selectedPkg = packages.find(p => p.id === form.packageId)

  const update = (field, val) => {
    setForm(f => {
      const next = { ...f, [field]: val }
      if (field === 'packageId') {
        const pkg = packages.find(p => p.id === val)
        next.amountDue = pkg ? String(pkg.price.onsite) : ''
        // Reset selections if package changes
        next.selectedEvents = []
        next.selectedWorkshop = ''
      }
      return next
    })
    setErrors(e => ({ ...e, [field]: '' }))
  }

  const toggleEvent = (id) => {
    setForm(prev => {
      const current = [...prev.selectedEvents]
      if (current.includes(id)) {
        return { ...prev, selectedEvents: current.filter(i => i !== id) }
      } else if (current.length < 2) {
        return { ...prev, selectedEvents: [...current, id] }
      }
      return prev
    })
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Required'
    if (!/^\d{10}$/.test(form.phone)) e.phone = 'Enter valid 10-digit number'
    if (!form.packageId) e.packageId = 'Required'
    
    if (selectedPkg && selectedPkg.price.onsite > 50) {
      if (form.selectedEvents.length === 0) e.events = 'Select at least one event'
      if (!form.selectedWorkshop) e.workshop = 'Select a workshop'
    }
    
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async () => {
    if (!validate()) return
    setSubmitting(true)

    const regId = 'TRQ26-' + Date.now().toString().slice(-7)

    const payload = {
      registrationId: regId,
      registrationType: 'ONSITE-COUNTER',
      packageName: selectedPkg?.name || '-',
      amountDue: form.amountDue,
      selectedEvents: form.selectedEvents.map(id => events.find(e => e.id === id)?.name).join(', ') || 'None',
      selectedWorkshop: workshops.find(w => w.id === form.selectedWorkshop)?.name || 'None',
      name: form.name,
      phone: form.phone,
      email: '-',
      college: form.college || '-',
      transactionId: '-',
      paymentMethod: form.paymentMethod,
      paymentStatus: form.paymentMethod === 'CASH' ? 'PAID-CASH' : 'PAID-UPI',
      receivedBy: form.receivedBy || '-'
    }

    if (festInfo.appsScriptUrl) {
      try {
        await fetch(festInfo.appsScriptUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain' },
          body: JSON.stringify(payload)
        })
      } catch (_) {}
    }

    setSubmitted({ regId, name: form.name, amount: form.amountDue, method: form.paymentMethod })
    setForm({ 
      name: '', phone: '', college: '', packageId: '', 
      selectedEvents: [], selectedWorkshop: '', 
      amountDue: '', paymentMethod: 'CASH', receivedBy: '' 
    })
    setSubmitting(false)
    fetchStats()
  }

  const fetchStats = async () => {
    if (!festInfo.appsScriptUrl) return
    try {
      const res = await fetch(festInfo.appsScriptUrl)
      const data = await res.json()
      setStats(data)
    } catch (_) {}
  }

  useEffect(() => { fetchStats() }, [])

  return (
    <div style={{ minHeight: '100vh', paddingTop: '20px', paddingBottom: '60px', paddingLeft: '16px', paddingRight: '16px' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ color: '#d4af37', fontSize: '2rem', fontWeight: 800, marginBottom: '6px' }}>
            On-Site Counter
          </h1>
          <p style={{ color: 'rgba(240,237,230,0.4)', fontSize: '0.82rem' }}>
            Coordinator Use Only — Unauthorized Access Restricted
          </p>
        </div>

        {/* Success flash */}
        {submitted && (
          <div style={{
            background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.3)',
            borderRadius: '14px', padding: '16px', marginBottom: '20px', textAlign: 'center'
          }}>
            <div style={{ color: '#d4af37', fontSize: '1.5rem', marginBottom: '4px' }}>✓</div>
            <div style={{ color: '#f0ede6', fontWeight: 700 }}>Registered: {submitted.name}</div>
            <div style={{ color: 'rgba(240,237,230,0.5)', fontSize: '0.82rem', fontFamily: 'monospace' }}>{submitted.regId}</div>
            <div style={{ color: '#d4af37', fontSize: '0.88rem', marginTop: '4px' }}>
              ₹{submitted.amount} · {submitted.method}
            </div>
          </div>
        )}

        {/* Form */}
        <div style={{
          background: '#1a1a1a', borderRadius: '20px',
          border: '1px solid rgba(212,175,55,0.12)',
          boxShadow: '8px 8px 16px #080808, -8px -8px 16px #2a2a2a',
          padding: '28px'
        }}>

          {/* Package Selection First */}
          <div className="reg-field">
            <label className="reg-label">Select Package *</label>
            <select
              className={`reg-input${errors.packageId ? ' error' : ''}`}
              value={form.packageId}
              onChange={e => update('packageId', e.target.value)}
              style={{ cursor: 'pointer' }}
            >
              <option value="">Select package</option>
              {packages.map(pkg => (
                <option key={pkg.id} value={pkg.id}>
                  {pkg.name} — ₹{pkg.price.onsite}
                </option>
              ))}
            </select>
            {errors.packageId && <p className="reg-error">{errors.packageId}</p>}
          </div>

          {/* Conditional Event/Workshop Selection */}
          {selectedPkg && selectedPkg.price.onsite > 50 && (
            <div style={{ marginBottom: '24px', padding: '20px', background: 'rgba(0,0,0,0.2)', borderRadius: '14px', border: '1px solid rgba(212,175,55,0.1)' }}>
              <div style={{ marginBottom: '20px' }}>
                <label className="reg-label">Select up to 2 Events</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  {events.map(ev => (
                    <button
                      key={ev.id}
                      onClick={() => toggleEvent(ev.id)}
                      style={{
                        padding: '8px', fontSize: '0.75rem', borderRadius: '8px', border: '1px solid',
                        background: form.selectedEvents.includes(ev.id) ? 'rgba(212,175,55,0.2)' : '#111',
                        borderColor: form.selectedEvents.includes(ev.id) ? '#d4af37' : 'rgba(212,175,55,0.1)',
                        color: form.selectedEvents.includes(ev.id) ? '#d4af37' : '#f0ede6',
                        cursor: 'pointer', textAlign: 'left'
                      }}
                    >
                      {ev.name}
                    </button>
                  ))}
                </div>
                {errors.events && <p className="reg-error" style={{ marginTop: '5px' }}>{errors.events}</p>}
              </div>

              <div>
                <label className="reg-label">Select 1 Workshop</label>
                <select
                  className={`reg-input${errors.workshop ? ' error' : ''}`}
                  value={form.selectedWorkshop}
                  onChange={e => update('selectedWorkshop', e.target.value)}
                  style={{ fontSize: '0.85rem' }}
                >
                  <option value="">Choose workshop...</option>
                  {workshops.map(ws => <option key={ws.id} value={ws.id}>{ws.name}</option>)}
                </select>
                {errors.workshop && <p className="reg-error">{errors.workshop}</p>}
              </div>
            </div>
          )}

          {/* Name */}
          <div className="reg-field">
            <label className="reg-label">Participant Name *</label>
            <input
              className={`reg-input${errors.name ? ' error' : ''}`}
              type="text"
              value={form.name}
              onChange={e => update('name', e.target.value)}
              placeholder="Full name"
            />
            {errors.name && <p className="reg-error">{errors.name}</p>}
          </div>

          {/* Phone */}
          <div className="reg-field">
            <label className="reg-label">Phone *</label>
            <input
              className={`reg-input${errors.phone ? ' error' : ''}`}
              type="tel"
              value={form.phone}
              onChange={e => update('phone', e.target.value)}
              placeholder="10-digit mobile"
              maxLength={10}
            />
            {errors.phone && <p className="reg-error">{errors.phone}</p>}
          </div>

          {/* College */}
          <div className="reg-field">
            <label className="reg-label">College (optional)</label>
            <input
              className="reg-input"
              type="text"
              value={form.college}
              onChange={e => update('college', e.target.value)}
              placeholder="College name"
            />
          </div>

          {/* Amount Due (read-only) */}
          <div className="reg-field">
            <label className="reg-label">Amount Due</label>
            <input
              className="reg-input"
              type="text"
              value={form.amountDue ? `₹${form.amountDue}` : ''}
              readOnly
              placeholder="Auto-filled from package"
              style={{ color: '#d4af37', fontWeight: 700 }}
            />
          </div>

          {/* Payment Method */}
          <div className="reg-field">
            <label className="reg-label">Payment Method</label>
            <div style={{ display: 'flex', gap: '10px' }}>
              {['CASH', 'UPI'].map(method => (
                <button
                  key={method}
                  type="button"
                  onClick={() => update('paymentMethod', method)}
                  style={{
                    flex: 1, padding: '11px',
                    borderRadius: '10px', fontWeight: 700,
                    fontSize: '0.9rem', cursor: 'pointer',
                    fontFamily: 'Poppins',
                    transition: 'all 0.2s ease',
                    background: form.paymentMethod === method ? '#d4af37' : '#111',
                    color: form.paymentMethod === method ? '#0d0d0d' : 'rgba(240,237,230,0.6)',
                    border: form.paymentMethod === method
                      ? '1px solid #d4af37'
                      : '1px solid rgba(212,175,55,0.2)'
                  }}
                >
                  {method}
                </button>
              ))}
            </div>
          </div>

          {/* Received By */}
          <div className="reg-field">
            <label className="reg-label">Received By (optional)</label>
            <input
              className="reg-input"
              type="text"
              value={form.receivedBy}
              onChange={e => update('receivedBy', e.target.value)}
              placeholder="Coordinator name"
            />
          </div>

          <button
            className="reg-next-btn"
            onClick={handleSubmit}
            disabled={submitting}
            style={{ marginTop: '8px' }}
          >
            {submitting ? 'Registering...' : 'Register & Collect Payment'}
          </button>
        </div>

        {/* Stats Card */}
        <div style={{
          background: '#1a1a1a', borderRadius: '20px',
          border: '1px solid rgba(212,175,55,0.12)',
          boxShadow: '8px 8px 16px #080808, -8px -8px 16px #2a2a2a',
          padding: '24px', marginTop: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h3 style={{ color: '#d4af37', fontWeight: 700, fontSize: '1rem' }}>Today&apos;s Stats</h3>
            <button
              onClick={fetchStats}
              style={{
                background: 'none', border: '1px solid rgba(212,175,55,0.2)',
                borderRadius: '8px', padding: '4px 10px',
                color: 'rgba(240,237,230,0.5)', fontSize: '0.75rem',
                cursor: 'pointer', fontFamily: 'Poppins'
              }}
            >
              Refresh
            </button>
          </div>
          {stats ? (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
              {[
                { label: 'Total', value: stats.count ?? 0 },
                { label: 'Cash', value: `₹${stats.cashTotal ?? 0}` },
                { label: 'UPI', value: `₹${stats.upiTotal ?? 0}` }
              ].map(({ label, value }) => (
                <div key={label} style={{
                  background: '#111', borderRadius: '10px',
                  border: '1px solid rgba(212,175,55,0.1)',
                  padding: '12px', textAlign: 'center'
                }}>
                  <div style={{ color: '#d4af37', fontWeight: 800, fontSize: '1.3rem' }}>{value}</div>
                  <div style={{ color: 'rgba(240,237,230,0.4)', fontSize: '0.72rem', marginTop: '2px' }}>{label}</div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: 'rgba(240,237,230,0.3)', fontSize: '0.82rem', textAlign: 'center' }}>
              {festInfo.appsScriptUrl ? 'Loading stats...' : 'Stats unavailable — appsScriptUrl not configured'}
            </p>
          )}
        </div>

      </div>
    </div>
  )
}

export default OnsiteAdmin
