import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axios';

const STATUS_OPTIONS = [
  'APPLIED',
  'SCREENING', 
  'INTERVIEW',
  'OFFER',
  'REJECTED',
  'WITHDRAWN'
];

function ApplicationForm() {
  const { id } = useParams();
  const isEditing = !!id;
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(isEditing);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    companyName: '',
    roleName: '',
    jobDescriptionUrl: '',
    jobDescriptionText: '',
    status: 'APPLIED',
    appliedDate: '',
    notes: '',
  });

  // If editing, fetch existing application data
  useEffect(() => {
    if (isEditing) {
      fetchApplication();
    }
  }, [id]);

  const fetchApplication = async () => {
    try {
      const response = await api.get(`/api/applications/${id}`);
      const app = response.data;
      setForm({
        companyName: app.companyName || '',
        roleName: app.roleName || '',
        jobDescriptionUrl: app.jobDescriptionUrl || '',
        jobDescriptionText: app.jobDescriptionText || '',
        status: app.status || 'APPLIED',
        appliedDate: app.appliedDate || '',
        notes: app.notes || '',
      });
    } catch (err) {
      setError('Failed to load application.');
    } finally {
      setFetchingData(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isEditing) {
        await api.put(`/api/applications/${id}`, form);
      } else {
        await api.post('/api/applications/', form);
      }
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  if (fetchingData) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <p className="text-slate-400">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">

      {/* Navbar */}
      <nav className="border-b border-slate-800 bg-slate-900">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-slate-400 hover:text-white transition text-sm"
          >
            ← Back
          </button>
          <h1 className="text-xl font-bold text-white tracking-tight">
            Job<span className="text-indigo-400">Pilot</span>
          </h1>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold text-white mb-8">
          {isEditing ? 'Edit application' : 'Add application'}
        </h2>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 
                        text-sm rounded-lg p-3 mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Company + Role */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Company name
              </label>
              <input
                type="text"
                name="companyName"
                value={form.companyName}
                onChange={handleChange}
                placeholder="Google"
                required
                className="w-full bg-slate-800 border border-slate-700 text-white 
                         placeholder-slate-500 rounded-lg px-4 py-2.5 text-sm
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 
                         focus:border-transparent transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Role
              </label>
              <input
                type="text"
                name="roleName"
                value={form.roleName}
                onChange={handleChange}
                placeholder="Software Engineer"
                required
                className="w-full bg-slate-800 border border-slate-700 text-white 
                         placeholder-slate-500 rounded-lg px-4 py-2.5 text-sm
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 
                         focus:border-transparent transition"
              />
            </div>
          </div>

          {/* Status + Applied Date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Status
              </label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 text-white 
                         rounded-lg px-4 py-2.5 text-sm
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 
                         focus:border-transparent transition"
              >
                {STATUS_OPTIONS.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Applied date
              </label>
              <input
                type="date"
                name="appliedDate"
                value={form.appliedDate}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 text-white 
                         rounded-lg px-4 py-2.5 text-sm
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 
                         focus:border-transparent transition"
              />
            </div>
          </div>

          {/* JD URL */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">
              Job description URL
            </label>
            <input
              type="url"
              name="jobDescriptionUrl"
              value={form.jobDescriptionUrl}
              onChange={handleChange}
              placeholder="https://careers.google.com/jobs/123"
              className="w-full bg-slate-800 border border-slate-700 text-white 
                       placeholder-slate-500 rounded-lg px-4 py-2.5 text-sm
                       focus:outline-none focus:ring-2 focus:ring-indigo-500 
                       focus:border-transparent transition"
            />
          </div>

          {/* JD Text */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">
              Job description
              <span className="text-slate-500 font-normal ml-2">
                — paste the full JD here for AI analysis later
              </span>
            </label>
            <textarea
              name="jobDescriptionText"
              value={form.jobDescriptionText}
              onChange={handleChange}
              placeholder="Paste the full job description here..."
              rows={6}
              className="w-full bg-slate-800 border border-slate-700 text-white 
                       placeholder-slate-500 rounded-lg px-4 py-2.5 text-sm
                       focus:outline-none focus:ring-2 focus:ring-indigo-500 
                       focus:border-transparent transition resize-none"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">
              Notes
            </label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Referral from John, follow up next week..."
              rows={3}
              className="w-full bg-slate-800 border border-slate-700 text-white 
                       placeholder-slate-500 rounded-lg px-4 py-2.5 text-sm
                       focus:outline-none focus:ring-2 focus:ring-indigo-500 
                       focus:border-transparent transition resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800
                       disabled:cursor-not-allowed text-white font-medium rounded-lg 
                       px-6 py-2.5 text-sm transition"
            >
              {loading
                ? 'Saving...'
                : isEditing ? 'Save changes' : 'Add application'
              }
            </button>
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="text-slate-400 hover:text-white text-sm px-4 py-2.5 
                       rounded-lg hover:bg-slate-800 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ApplicationForm;