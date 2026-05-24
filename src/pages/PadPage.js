import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import PasswordModal from '../components/PasswordModal';
import { checkKey, accessPad, saveContent, setLock, removeLock, deletePad } from '../api/padApi';

function PadPage() {
  const { key } = useParams();

  const [content, setContent] = useState('');
  const [isLocked, setIsLocked] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');

  const [modal, setModal] = useState(null);
  const [modalError, setModalError] = useState('');

  const init = useCallback(async () => {
    try {
      const res = await checkKey(key);
      const data = res.data;
      setIsLocked(data.isLocked);
        // {{console.log(data);}}
      if (!data.isLocked) {
        const access = await accessPad(key, null);
        setContent(access.data.content || '');
        setUnlocked(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [key]);

  useEffect(() => {
    init();
  }, [init]);

  const handleUnlock = async (password) => {
    try {
      const res = await accessPad(key, password);
      if (res.data.success) {
        setContent(res.data.content || '');
        setUnlocked(true);
//        setIsLocked(false);
        setModal(null);
        setModalError('');
      } else {
        setModalError(res.data.message || 'Wrong password');
      }
    } catch {
      setModalError('Something went wrong');
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveContent(key, content);
      setSaveMsg('✓ Saved');
      setTimeout(() => setSaveMsg(''), 2000);
    } catch {
      setSaveMsg('✗ Error saving');
    } finally {
      setSaving(false);
    }
  };

  const handleSetLock = async (password) => {
    try {
      const res = await setLock(key, password);
      if (res.data.success) {
        setIsLocked(true);
        setModal(null);
        setModalError('');
        alert('Lock set successfully!');
      }
    } catch {
      setModalError('Failed to set lock');
    }
  };

  const handleRemoveLock = async (password) => {
    try {
      const res = await removeLock(key, password);
      if (res.data.success) {
        setIsLocked(false);
        setModal(null);
        setModalError('');
        alert('Lock removed!');
      } else {
        setModalError(res.data.message || 'Wrong password');
      }
    } catch {
      setModalError('Failed to remove lock');
    }
  };

  const handleDelete = async (password) => {
    try {
      const res = await deletePad(key, password);
      if (res.data.success) {
        alert(key+' deleted!');
        window.location.href = '/';
      } else {
        setModalError(res.data.message || 'Wrong password');
      }
    } catch {
      setModalError('Failed to delete');
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#888' }}>Loading pad...</p>
      </div>
    );
  }

  if (isLocked && !unlocked) {
    return (
      <>
        <Navbar padKey={key} />
        <PasswordModal
          title={`Unlock pad: ${key}`}
          onSubmit={handleUnlock}
          onCancel={() => window.location.href = '/'}
          error={modalError}
        />
        <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ color: '#555' }}>This pad is locked. Enter password to continue.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar padKey={key} />

      {modal === 'setLock' && (
        <PasswordModal
          title="Set a password lock"
          onSubmit={handleSetLock}
          onCancel={() => { setModal(null); setModalError(''); }}
          error={modalError}
        />
      )}
      {modal === 'removeLock' && (
        <PasswordModal
          title="Enter current password to remove lock"
          onSubmit={handleRemoveLock}
          onCancel={() => { setModal(null); setModalError(''); }}
          error={modalError}
        />
      )}
      {modal === 'delete' && (
        <PasswordModal
          title="Enter password to delete this pad"
          onSubmit={handleDelete}
          onCancel={() => { setModal(null); setModalError(''); }}
          error={modalError}
        />
      )}

      <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 57px)' }}>

        {/* Toolbar */}
        <div style={{
          background: '#161616',
          borderBottom: '1px solid #2a2a2a',
          padding: '10px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={handleSave}
            disabled={saving}
            style={{ background: '#7c6af7', color: '#fff' }}
          >
            {saving ? 'Saving...' : ' Save'}
          </button>

          {saveMsg && (
            <span style={{ color: '#4ade80', fontSize: '13px' }}>{saveMsg}</span>
          )}

          <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
            {!isLocked ? (
              <button
                onClick={() => { setModal('setLock'); setModalError(''); }}
                style={{ background: '#2a2a2a', color: '#facc15' }}
              >
                🔒 Lock Pad
              </button>
            ) : (
              <button
                onClick={() => { setModal('removeLock'); setModalError(''); }}
                style={{ background: '#2a2a2a', color: '#4ade80' }}
              >
                🔓 Remove Lock
              </button>
            )}

            <button
              onClick={() => {
                if (isLocked) {
                  setModal('delete');
                  setModalError('');
                } else {
                  if (window.confirm(`Delete pad "${key}"? This cannot be undone.`)) {
                    handleDelete(null);
                  }
                }
              }}
              style={{ background: '#2a2a2a', color: '#f87171' }}
            >
               Delete
            </button>
          </div>
        </div>

        {/* Editor */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={(e) => {
            if (e.ctrlKey && e.key === 's') {
              e.preventDefault();
              handleSave();
            }
          }}
          placeholder="Start typing your notes, code, or anything..."
          style={{
            flex: 1,
            background: '#0f0f0f',
            color: '#e0e0e0',
            border: 'none',
            padding: '24px',
            fontSize: '15px',
            lineHeight: '1.7',
            resize: 'none',
            fontFamily: "'Fira Code', 'Courier New', monospace",
            width: '100%'
          }}
          spellCheck={false}
        />

        {/* Footer */}
        <div style={{
          background: '#161616',
          borderTop: '1px solid #2a2a2a',
          padding: '6px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '12px',
          color: '#555'
        }}>
          <span>{content.length} characters</span>
          <span>Make sure to save your content before returning to Home</span>
          <span>Ctrl+S to save</span>
        </div>
      </div>
    </>
  );
}

export default PadPage;