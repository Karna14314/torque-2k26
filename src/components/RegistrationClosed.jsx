import { useState, useEffect } from 'react'
import { festInfo } from '../data/data.js'

const RegistrationClosed = ({ onClose }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const calc = () => {
      const diff = new Date(festInfo.registrationOpenDate) - new Date()
      if (diff <= 0) return
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff / 3600000) % 24),
        minutes: Math.floor((diff / 60000) % 60),
        seconds: Math.floor((diff / 1000) % 60)
      })
    }
    calc()
    const t = setInterval(calc, 1000)
    return () => clearInterval(t)
  }, [])

  const pad = n => String(n).padStart(2, '0')

  const openDate = new Date(festInfo.registrationOpenDate)
    .toLocaleDateString('en-IN', {
      weekday: 'long', year: 'numeric',
      month: 'long', day: 'numeric'
    })

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.box} onClick={e => e.stopPropagation()}>

        <button style={styles.closeBtn} onClick={onClose} aria-label="Close">✕</button>

        <div style={styles.lock}>🔒</div>

        <h2 style={styles.heading}>Registration Not Open Yet</h2>

        <p style={styles.openLabel}>Registration opens on</p>
        <p style={styles.openDate}>{openDate}</p>

        <div style={styles.countdown}>
          {[['Days', timeLeft.days], ['Hrs', timeLeft.hours],
            ['Mins', timeLeft.minutes], ['Secs', timeLeft.seconds]].map(([label, val]) => (
            <div key={label} style={styles.timeUnit}>
              <span style={styles.timeVal}>{pad(val)}</span>
              <span style={styles.timeLabel}>{label}</span>
            </div>
          ))}
        </div>

        <p style={styles.followNote}>Follow us on Instagram for updates</p>

        <a
          href={festInfo.socialLinks.instagram}
          target="_blank"
          rel="noopener noreferrer"
          style={styles.instaBtn}
        >
          Instagram →
        </a>

        <button style={styles.doneBtn} onClick={onClose}>Got it</button>
      </div>
    </div>
  )
}

const styles = {
  overlay: {
    position: 'fixed', inset: 0,
    background: 'rgba(0,0,0,0.85)',
    backdropFilter: 'blur(10px)',
    zIndex: 9999,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: '16px'
  },
  box: {
    background: '#1a1a1a',
    borderRadius: '20px',
    boxShadow: '8px 8px 20px #080808, -8px -8px 20px #2a2a2a',
    border: '1px solid rgba(212,175,55,0.15)',
    maxWidth: '400px', width: '100%',
    padding: '36px 28px',
    textAlign: 'center',
    position: 'relative'
  },
  closeBtn: {
    position: 'absolute', top: '16px', right: '16px',
    background: 'none', border: 'none',
    color: '#d4af37', fontSize: '1.2rem', cursor: 'pointer'
  },
  lock: { fontSize: '3rem', marginBottom: '12px' },
  heading: {
    color: '#d4af37', fontSize: '1.4rem',
    fontWeight: 700, marginBottom: '16px'
  },
  openLabel: {
    color: 'rgba(240,237,230,0.5)',
    fontSize: '0.8rem', marginBottom: '4px'
  },
  openDate: {
    color: '#d4af37', fontWeight: 700,
    fontSize: '1rem', marginBottom: '20px'
  },
  countdown: {
    display: 'flex', gap: '10px',
    justifyContent: 'center', marginBottom: '20px'
  },
  timeUnit: {
    background: '#111',
    border: '1px solid rgba(212,175,55,0.2)',
    borderRadius: '10px', padding: '10px 12px',
    minWidth: '60px', textAlign: 'center'
  },
  timeVal: {
    display: 'block', color: '#d4af37',
    fontWeight: 700, fontSize: '1.4rem', fontFamily: 'monospace'
  },
  timeLabel: {
    display: 'block',
    color: 'rgba(240,237,230,0.5)', fontSize: '0.7rem'
  },
  followNote: {
    color: 'rgba(240,237,230,0.4)',
    fontSize: '0.78rem', marginBottom: '12px'
  },
  instaBtn: {
    display: 'block',
    background: 'rgba(212,175,55,0.08)',
    border: '1px solid rgba(212,175,55,0.3)',
    borderRadius: '10px', padding: '10px',
    color: '#d4af37', textDecoration: 'none',
    fontSize: '0.88rem', marginBottom: '10px',
    transition: 'all 0.2s ease'
  },
  doneBtn: {
    width: '100%',
    background: '#1a1a1a',
    border: '1px solid rgba(212,175,55,0.3)',
    borderRadius: '10px', padding: '12px',
    color: '#d4af37', fontWeight: 600,
    fontSize: '0.95rem', cursor: 'pointer',
    fontFamily: 'Poppins',
    boxShadow: '4px 4px 8px #080808, -4px -4px 8px #2a2a2a',
    transition: 'all 0.2s ease'
  }
}

export default RegistrationClosed
