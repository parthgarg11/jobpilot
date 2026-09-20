import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import api from '../api/axios.js';

const STATUS_COLORS = {
  APPLIED: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  SCREENING: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  INTERVIEW: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  OFFER: 'bg-green-500/10 text-green-400 border-green-500/20',
  REJECTED: 'bg-red-500/10 text-red-400 border-red-500/20',
  WITHDRAWN: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
};

const ALL_STATUSES = ['ALL', 'APPLIED', 'SCREENING', 'INTERVIEW', 'OFFER', 'REJECTED', 'WITHDRAWN'];

function Dashboard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('ALL');

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await api.get('/api/applications/');
      setApplications(response.data);
    } catch (err) {
      setError('Failed to load applications.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this application?')) return;
    try {
      await api.delete(`/api/applications/${id}`);
      setApplications(applications.filter(app => app.id !== id));
    } catch (err) {
      alert('Failed to delete application.');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/landing');
  };

  // Stats
  const stats = {
    total: applications.length,
    interviews: applications.filter(a => a.status === 'INTERVIEW').length,
    offers: applications.filter(a => a.status === 'OFFER').length,
    rejected: applications.filter(a => a.status === 'REJECTED').length,
  };

  // Filtered list
  const filtered = filter === 'ALL'
    ? applications
    : applications.filter(a => a.status === filter);

  return (
    <div className="min-h-screen bg-slate-950">

      {/* Navbar */}
      <nav className="border-b border-slate-800 bg-slate-900">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-white tracking-tight">
            Job<span className="text-indigo-400">Pilot</span>
          </h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/profile')}
              className="text-slate-400 hover:text-white text-sm transition"
            >
              Profile
            </button>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400 text-sm">{user?.name}</span>
            <button
              onClick={handleLogout}
              className="text-slate-400 hover:text-white text-sm transition"
            >
              Sign out
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* Stats cards */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total', value: stats.total, color: 'text-white' },
            { label: 'Interviews', value: stats.interviews, color: 'text-purple-400' },
            { label: 'Offers', value: stats.offers, color: 'text-green-400' },
            { label: 'Rejected', value: stats.rejected, color: 'text-red-400' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-slate-900 border border-slate-800 rounded-xl p-5"
            >
              <p className="text-slate-500 text-xs font-medium uppercase tracking-wider mb-2">
                {stat.label}
              </p>
              <p className={`text-3xl font-bold ${stat.color}`}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Header row */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">Applications</h2>
          <button
            onClick={() => navigate('/applications/new')}
            className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm 
                     font-medium px-4 py-2 rounded-lg transition"
          >
            + Add application
          </button>
        </div>

        {/* Filter tabs */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1">
          {ALL_STATUSES.map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition
                ${filter === status
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700'
                }`}
            >
              {status}
              {status !== 'ALL' && (
                <span className="ml-1.5 text-slate-500">
                  {applications.filter(a => a.status === status).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* States */}
        {loading && (
          <div className="text-center text-slate-400 py-20">Loading...</div>
        )}

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 
                        rounded-lg p-4 text-sm">
            {error}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-400 text-lg">
              {filter === 'ALL' ? 'No applications yet.' : `No ${filter} applications.`}
            </p>
            {filter === 'ALL' && (
              <button
                onClick={() => navigate('/applications/new')}
                className="mt-6 bg-indigo-600 hover:bg-indigo-500 text-white 
                         text-sm font-medium px-6 py-2.5 rounded-lg transition"
              >
                Add your first application
              </button>
            )}
          </div>
        )}

        {/* Applications list */}
        {!loading && filtered.length > 0 && (
          <div className="space-y-3">
            {filtered.map((app) => (
              <div
                key={app.id}
                className="bg-slate-900 border border-slate-800 rounded-xl p-5
                         hover:border-slate-700 transition"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-white font-medium truncate">
                        {app.companyName}
                      </h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full border 
                                      ${STATUS_COLORS[app.status]}`}>
                        {app.status}
                      </span>
                    </div>
                    <p className="text-slate-400 text-sm truncate">{app.roleName}</p>
                    {app.appliedDate && (
                      <p className="text-slate-600 text-xs mt-2">
                        Applied {app.appliedDate}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => navigate(`/applications/${app.id}/edit`)}
                      className="text-slate-400 hover:text-white text-sm 
                               px-3 py-1.5 rounded-lg hover:bg-slate-800 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(app.id)}
                      className="text-slate-400 hover:text-red-400 text-sm 
                               px-3 py-1.5 rounded-lg hover:bg-slate-800 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;