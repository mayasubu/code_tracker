import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [problems, setProblems] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', difficulty: 'Easy', sampleInput: '', sampleOutput: '', tags: '' });
  const navigate = useNavigate();

  useEffect(() => {
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    try {
      const res = await fetch('/api/problems');
      const data = await res.json();
      if (data.success) {
        setProblems(data.problems);
      } else if (res.status === 401 || res.status === 403) {
        navigate('/login');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const createProblem = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/problems', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (data.success) {
        alert('Problem Created');
        setForm({ title: '', description: '', difficulty: 'Easy', sampleInput: '', sampleOutput: '', tags: '' });
        fetchProblems();
      } else {
        alert('Error: ' + data.message);
      }
    } catch (err) {}
  };

  const deleteProblem = async (id) => {
    if (!window.confirm('Delete problem?')) return;
    try {
      const res = await fetch('/api/problems/' + id, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) fetchProblems();
    } catch (err) {}
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    navigate('/login');
  };

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <h2>Dashboard Management</h2>
        <button onClick={handleLogout} className="btn btn-danger">Logout</button>
      </div>

      <div style={{ display: 'flex', gap: '2rem' }}>
        <div className="glass-panel" style={{ flex: 1 }}>
          <h3 style={{ marginBottom: '1rem' }}>Create Problem</h3>
          <form onSubmit={createProblem}>
            <div className="form-group">
              <label>Title</label>
              <input className="form-control" required value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Difficulty</label>
              <select className="form-control" value={form.difficulty} onChange={e => setForm({...form, difficulty: e.target.value})}>
                <option>Easy</option><option>Medium</option><option>Hard</option>
              </select>
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea className="form-control" required rows="3" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Sample Input</label>
              <input className="form-control" required value={form.sampleInput} onChange={e => setForm({...form, sampleInput: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Sample Output</label>
              <input className="form-control" required value={form.sampleOutput} onChange={e => setForm({...form, sampleOutput: e.target.value})} />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Add Problem</button>
          </form>
        </div>

        <div className="glass-panel" style={{ flex: 1, maxHeight: '600px', overflowY: 'auto' }}>
          <h3 style={{ marginBottom: '1rem' }}>Problem List</h3>
          <table style={{ width: '100%' }}>
            <tbody>
              {problems.map(p => (
                <tr key={p._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <td style={{ padding: '1rem 0' }}>
                    <strong>{p.title}</strong> <br/>
                    <small style={{ color: '#94a3b8' }}>{p.difficulty}</small>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button onClick={() => deleteProblem(p._id)} className="btn btn-danger" style={{ padding: '0.4rem 1rem' }}>Delete</button>
                  </td>
                </tr>
              ))}
              {problems.length === 0 && <tr><td>No problems found.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
