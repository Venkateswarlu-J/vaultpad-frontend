import React, { useState } from 'react';

function PasswordModal({ title, onSubmit, onCancel, error }) {
  const [password, setPassword] = useState('');

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'rgba(0,0,0,0.7)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 999
    }}>
      <div style={{
        background: '#1a1a1a',
        border: '1px solid #2a2a2a',
        borderRadius: '16px',
        padding: '32px',
        width: '360px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
        <h3 style={{ color: '#e0e0e0', fontSize: '18px' }}>🔒 {title}</h3>

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSubmit(password)}
          style={{
            background: '#111',
            border: '1px solid #333',
            borderRadius: '8px',
            padding: '10px 14px',
            color: '#e0e0e0',
            fontSize: '14px',
            width: '100%'
          }}
          autoFocus
        />

        {error && (
          <p style={{ color: '#f87171', fontSize: '13px' }}>{error}</p>
        )}

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => onSubmit(password)}
            style={{ flex: 1, background: '#7c6af7', color: '#fff' }}
          >
            Submit
          </button>
          <button
            onClick={onCancel}
            style={{ flex: 1, background: '#2a2a2a', color: '#aaa' }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default PasswordModal;