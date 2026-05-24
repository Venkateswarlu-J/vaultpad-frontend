import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const [key, setKey] = useState('');
  const navigate = useNavigate();

  const handleGo = () => {
    const trimmed = key.trim();
    if (!trimmed) return;
    if(key.length>30){
      alert("Key should be is not more than 30 chars!!");
      return;
    }
    navigate(`/pad/${trimmed}`);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '24px',
      padding: '24px'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '48px', fontWeight: '800', color: '#7c6af7' }}>VaultPad</h1>
        <p style={{ color: '#888', marginTop: '8px', fontSize: '15px' }}>
          Enter a key to open or create a pad
        </p>
      </div>

      <div style={{
        background: '#1a1a1a',
        border: '1px solid #2a2a2a',
        borderRadius: '16px',
        padding: '32px',
        width: '100%',
        maxWidth: '460px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
        <label style={{ color: '#aaa', fontSize: '13px' }}>Your pad key</label>
        <input
          type="text"
          placeholder="e.g. hello, mycode, secret123"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleGo()}
          style={{
            background: '#111',
            border: '1px solid #333',
            borderRadius: '10px',
            padding: '12px 16px',
            color: '#e0e0e0',
            fontSize: '16px',
            width: '100%'
          }}
          autoFocus
        />
        <button
          onClick={handleGo}
          style={{
            background: '#7c6af7',
            color: '#fff',
            padding: '12px',
            fontSize: '15px',
            borderRadius: '10px',
            fontWeight: '600'
          }}
        >
          Open Pad →
        </button>
      </div>

      <p style={{ color: '#555', fontSize: '12px', textAlign: 'center' }}>
        Create a key. Open your world. Access important data safely online.
      </p>
    </div>
  );
}

export default HomePage;