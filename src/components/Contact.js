import React, { useState } from 'react';

// AES-GCM payload: base64-encoded salt, iv, and ciphertext+tag
// Note: Email is NOT stored in the source; it’s only recovered client-side with the correct passphrase.
const ENC = {
  salt: 'jdCk5F5A5xgQPm1W2J+BJA==',
  iv: 'KNI96LlaW7OEnmb6',
  ct: '980R3Ys2dUqFER8PM9lyfRz1TTjI1rWITv\nIxtV9ZQg7OGic=',
  iters: 150000,
};

function b64ToBytes(b64) {
  // Remove whitespace/newlines just in case
  const clean = b64.replace(/\s+/g, '');
  const bin = atob(clean);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

async function deriveKey(passphrase, salt) {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    enc.encode(passphrase),
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  );
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: ENC.iters, hash: 'SHA-256' },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['decrypt']
  );
}

async function decryptEmail(passphrase) {
  const salt = b64ToBytes(ENC.salt);
  const iv = b64ToBytes(ENC.iv);
  const ct = b64ToBytes(ENC.ct);
  const key = await deriveKey(passphrase, salt);
  // Last 16 bytes are GCM tag (128-bit) appended; Web Crypto expects it in the ciphertext
  const ptBuf = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, ct);
  return new TextDecoder().decode(ptBuf);
}

const Contact = () => {
  const [pass, setPass] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const onUnlock = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    setEmail('');
    try {
      const result = await decryptEmail(pass);
      // Basic sanity check to avoid rendering unexpected plaintext
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(result)) throw new Error('Invalid');
      setEmail(result);
    } catch (err) {
      setError('Incorrect passphrase.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="section">
      <div className="container">
        <header className="section-header">
          <h1 className="section-title">Get in touch</h1>
          <p className="section-subtitle">Unlock my email with a secret passphrase. Hint: ask me on LinkedIn.</p>
        </header>
        <div className="card" style={{ maxWidth: 720, margin: '0 auto' }}>
          <div className="card-body">
            {!email ? (
              <form onSubmit={onUnlock} style={{ display: 'grid', gap: '.5rem' }}>
                <label htmlFor="pass">Secret passphrase</label>
                <input
                  id="pass"
                  type="password"
                  autoComplete="off"
                  className="pill"
                  style={{ padding: '.6rem .8rem', background: 'transparent', color: 'var(--text)' }}
                  placeholder="Enter passphrase to reveal email"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                />
                <div style={{ display: 'flex', gap: '.5rem', marginTop: '.25rem', flexWrap: 'wrap' }}>
                  <button className="btn btn-primary" type="submit" disabled={!pass || busy}>{busy ? 'Unlocking…' : 'Unlock'}</button>
                  <a className="btn" href="https://github.com/whalephisher" target="_blank" rel="noreferrer">GitHub</a>
                  <a className="btn" href="https://www.linkedin.com/in/" target="_blank" rel="noreferrer">LinkedIn</a>
                </div>
                {error && <p className="muted" role="alert" style={{ color: '#ff7b7b' }}>{error}</p>}
              </form>
            ) : (
              <div>
                <p>Email unlocked:</p>
                <div style={{ display: 'flex', gap: '.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                  <code className="pill" style={{ padding: '.5rem .7rem' }}>{email}</code>
                  <a className="btn btn-primary" href={`mailto:${email}`}>Email me</a>
                  <button className="btn" onClick={() => navigator.clipboard.writeText(email)}>Copy</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
