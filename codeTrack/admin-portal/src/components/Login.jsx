import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data.success && data.user.role === 'Admin') {
        navigate('/dashboard');
      } else {
        setError(data.message || 'Unauthorized: Only Admins can access this portal');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  return (
    <div className="glass-panel" style={{ maxWidth: '400px', margin: '4rem auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Admin Portal Login</h2>
      {error && <div className="error-box">{error}</div>}
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email ID</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="form-control" />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="form-control" />
        </div>
        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Secure Login</button>
      </form>
    </div>
  );
}

export default Login;
