import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios.js';

function Profile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    bio: '',
    skills: '',
    linkedinUrl: '',
    githubUrl: '',
  });

  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const [showExpForm, setShowExpForm] = useState(false);
  const [expForm, setExpForm] = useState({
    companyName: '',
    roleName: '',
    startDate: '',
    endDate: '',
    description: '',
    isCurrent: false,
  });
  const [editingExpId, setEditingExpId] = useState(null);

  useEffect(() => {
    fetchProfile();
    fetchExperiences();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get('/api/profile');
      if (response.data) {
        setProfile({
          bio: response.data.bio || '',
          skills: response.data.skills || '',
          linkedinUrl: response.data.linkedinUrl || '',
          githubUrl: response.data.githubUrl || '',
        });
      }
    } catch (err) {
      console.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const fetchExperiences = async () => {
    try {
      const response = await api.get('/api/profile/experience');
      setExperiences(response.data);
    } catch (err) {
      console.error('Failed to load experiences');
    }
  };

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put('/api/profile', profile);
      setMessage('Profile saved successfully.');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Failed to save profile.');
    } finally {
      setSaving(false);
    }
  };

  const handleExpChange = (e) => {
    const value = e.target.type === 'checkbox'
      ? e.target.checked
      : e.target.value;
    setExpForm({ ...expForm, [e.target.name]: value });
  };

  const handleSaveExperience = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...expForm,
        endDate: expForm.isCurrent ? null : expForm.endDate,
        isCurrent: expForm.isCurrent,
      };

      if (editingExpId) {
        await api.put(`/api/profile/experience/${editingExpId}`, payload);
      } else {
        await api.post('/api/profile/experience', payload);
      }

      fetchExperiences();
      resetExpForm();
    } catch (err) {
      alert('Failed to save experience.');
    }
  };

  const handleEditExp = (exp) => {
    setExpForm({
      companyName: exp.companyName || '',
      roleName: exp.roleName || '',
      startDate: exp.startDate || '',
      endDate: exp.endDate || '',
      description: exp.description || '',
      isCurrent: exp.isCurrent || false,
    });
    setEditingExpId(exp.id);
    setShowExpForm(true);
  };

  const handleDeleteExp = async (id) => {
    if (!window.confirm('Delete this experience?')) return;
    try {
      await api.delete(`/api/profile/experience/${id}`);
      setExperiences(experiences.filter(e => e.id !== id));
    } catch (err) {
      alert('Failed to delete experience.');
    }
  };

  const resetExpForm = () => {
    setExpForm({
      companyName: '',
      roleName: '',
      startDate: '',
      endDate: '',
      description: '',
      isCurrent: false,
    });
    setEditingExpId(null);
    setShowExpForm(false);
  };

  const inputClass = `w-full bg-slate-800 border border-slate-700 text-white 
    placeholder-slate-500 rounded-lg px-4 py-2.5 text-sm
    focus:outline-none focus:ring-2 focus:ring-indigo-500 
    focus:border-transparent transition`;

  if (loading) {
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

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">

        {/* Profile Section */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-6">Your Profile</h2>

          {message && (
            <div className={`text-sm rounded-lg p-3 mb-4 ${
              message.includes('success')
                ? 'bg-green-500/10 border border-green-500/20 text-green-400'
                : 'bg-red-500/10 border border-red-500/20 text-red-400'
            }`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Bio
              </label>
              <textarea
                name="bio"
                value={profile.bio}
                onChange={handleProfileChange}
                placeholder="A short description about yourself..."
                rows={3}
                className={`${inputClass} resize-none`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Skills
                <span className="text-slate-500 font-normal ml-2">
                  — comma separated
                </span>
              </label>
              <input
                type="text"
                name="skills"
                value={profile.skills}
                onChange={handleProfileChange}
                placeholder="Java, Spring Boot, React, PostgreSQL, AWS"
                className={inputClass}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">
                  LinkedIn URL
                </label>
                <input
                  type="url"
                  name="linkedinUrl"
                  value={profile.linkedinUrl}
                  onChange={handleProfileChange}
                  placeholder="https://linkedin.com/in/your-profile"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">
                  GitHub URL
                </label>
                <input
                  type="url"
                  name="githubUrl"
                  value={profile.githubUrl}
                  onChange={handleProfileChange}
                  placeholder="https://github.com/your-username"
                  className={inputClass}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800
                       text-white font-medium rounded-lg px-6 py-2.5 text-sm transition"
            >
              {saving ? 'Saving...' : 'Save profile'}
            </button>
          </form>
        </div>

        {/* Work Experience Section */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">Work Experience</h2>
            {!showExpForm && (
              <button
                onClick={() => setShowExpForm(true)}
                className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm
                         font-medium px-4 py-2 rounded-lg transition"
              >
                + Add experience
              </button>
            )}
          </div>

          {/* Experience Form */}
          {showExpForm && (
            <form onSubmit={handleSaveExperience}
              className="bg-slate-800/50 border border-slate-700 rounded-xl p-5 mb-6 space-y-4">
              <h3 className="text-white font-medium text-sm">
                {editingExpId ? 'Edit experience' : 'Add experience'}
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">
                    Company
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={expForm.companyName}
                    onChange={handleExpChange}
                    placeholder="Infosys"
                    required
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">
                    Role
                  </label>
                  <input
                    type="text"
                    name="roleName"
                    value={expForm.roleName}
                    onChange={handleExpChange}
                    placeholder="Specialist Programmer"
                    required
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">
                    Start date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={expForm.startDate}
                    onChange={handleExpChange}
                    required
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">
                    End date
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={expForm.endDate}
                    onChange={handleExpChange}
                    disabled={expForm.isCurrent}
                    className={`${inputClass} disabled:opacity-50`}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="isCurrent"
                  id="isCurrent"
                  checked={expForm.isCurrent}
                  onChange={handleExpChange}
                  className="w-4 h-4 accent-indigo-500"
                />
                <label htmlFor="isCurrent"
                  className="text-slate-300 text-sm cursor-pointer">
                  I currently work here
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">
                  Description
                </label>
                <textarea
                  name="description"
                  value={expForm.description}
                  onChange={handleExpChange}
                  placeholder="What did you work on?"
                  rows={3}
                  className={`${inputClass} resize-none`}
                />
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-500 text-white
                           font-medium rounded-lg px-5 py-2 text-sm transition"
                >
                  {editingExpId ? 'Save changes' : 'Add experience'}
                </button>
                <button
                  type="button"
                  onClick={resetExpForm}
                  className="text-slate-400 hover:text-white text-sm
                           px-4 py-2 rounded-lg hover:bg-slate-800 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {/* Experience List */}
          {experiences.length === 0 && !showExpForm && (
            <p className="text-slate-500 text-sm text-center py-8">
              No work experience added yet.
            </p>
          )}

          <div className="space-y-3">
            {experiences.map((exp) => (
              <div key={exp.id}
                className="border border-slate-700 rounded-xl p-4
                         hover:border-slate-600 transition">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-white font-medium text-sm">
                        {exp.companyName}
                      </h3>
                      {exp.isCurrent && (
                        <span className="text-xs px-2 py-0.5 rounded-full
                                       bg-green-500/10 text-green-400 border border-green-500/20">
                          Current
                        </span>
                      )}
                    </div>
                    <p className="text-slate-400 text-sm">{exp.roleName}</p>
                    <p className="text-slate-600 text-xs mt-1">
                      {exp.startDate} — {exp.isCurrent ? 'Present' : exp.endDate}
                    </p>
                    {exp.description && (
                      <p className="text-slate-500 text-xs mt-2 leading-relaxed">
                        {exp.description}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleEditExp(exp)}
                      className="text-slate-400 hover:text-white text-xs
                               px-3 py-1.5 rounded-lg hover:bg-slate-800 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteExp(exp.id)}
                      className="text-slate-400 hover:text-red-400 text-xs
                               px-3 py-1.5 rounded-lg hover:bg-slate-800 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;