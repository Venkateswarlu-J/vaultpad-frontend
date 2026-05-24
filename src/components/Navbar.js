import React from 'react';

function Navbar({ padKey }) {
  return (
    <div style={{
      background: '#1a1a1a',
      borderBottom: '1px solid #2a2a2a',
      padding: '14px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ fontSize: '20px', fontWeight: '700', color: '#7c6af7' }}>VaultPad</span>
        {padKey && (
          <span style={{
            background: '#2a2a2a',
            color: '#aaa',
            fontSize: '13px',
            padding: '3px 10px',
            borderRadius: '20px',
            border: '1px solid #333'
          }}>
            📄 {padKey}
          </span>
        )}
      </div>
      <a href="/" style={{ color: '#aaa', fontSize: '13px', textDecoration: 'none' }}>
        ← Home
      </a>
    </div>
  );
}

export default Navbar;