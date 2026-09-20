import { useNavigate } from 'react-router-dom';

const features = [
  {
    icon: '📋',
    title: 'Track Every Application',
    description:
      'Keep all your job applications in one place. Track status from Applied to Offer with a clean pipeline view.',
  },
  {
    icon: '🤖',
    title: 'AI-Powered Analysis',
    description:
      'Paste any job description and instantly extract required skills, generate a tailored cover letter, and get interview prep questions.',
  },
  {
    icon: '📊',
    title: 'Stay Organised',
    description:
      'See your application stats at a glance. Know exactly where you stand in your job search at any point.',
  },
  {
    icon: '👤',
    title: 'Build Your Profile',
    description:
      'Store your work history, skills, and links in one place. Coming soon — AI will use your profile to tailor every application.',
  },
];

const steps = [
  { step: '01', title: 'Create your account', description: 'Sign up in seconds — no credit card needed.' },
  { step: '02', title: 'Add your applications', description: 'Log jobs you have applied to with company, role, and status.' },
  { step: '03', title: 'Use AI to get ahead', description: 'Extract skills, generate cover letters, and prep for interviews.' },
];

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Navbar */}
      <nav className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-tight">
            Job<span className="text-indigo-400">Pilot</span>
          </h1>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/login')}
              className="text-slate-400 hover:text-white text-sm font-medium transition px-4 py-2"
            >
              Sign in
            </button>
            <button
              onClick={() => navigate('/register')}
              className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm 
                       font-medium px-4 py-2 rounded-lg transition"
            >
              Get started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 pt-24 pb-20 text-center">
        <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 
                      text-indigo-400 text-xs font-medium px-3 py-1.5 rounded-full mb-8">
          ✨ Powered by Google Gemini AI
        </div>

        <h2 className="text-5xl font-bold tracking-tight leading-tight mb-6">
          Your job search,
          <br />
          <span className="text-indigo-400">finally under control</span>
        </h2>

        <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          JobPilot helps you track every application, analyse job descriptions with AI,
          generate cover letters, and prep for interviews — all in one place.
        </p>

        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => navigate('/register')}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium 
                     px-8 py-3 rounded-lg transition text-sm"
          >
            Start for free
          </button>
          <button
            onClick={() => navigate('/login')}
            className="text-slate-400 hover:text-white font-medium 
                     px-8 py-3 rounded-lg border border-slate-700 
                     hover:border-slate-600 transition text-sm"
          >
            Sign in
          </button>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-center gap-12 mt-16 pt-16 
                      border-t border-slate-800">
          {[
            { value: '100%', label: 'Free to use' },
            { value: 'AI', label: 'Powered by Gemini' },
            { value: '3', label: 'AI features built-in' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-slate-500 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-slate-900/50 border-y border-slate-800 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <h3 className="text-3xl font-bold mb-4">Everything you need</h3>
            <p className="text-slate-400 max-w-xl mx-auto">
              Built for serious job seekers who want to stay organised and get an edge with AI.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6
                         hover:border-indigo-500/30 transition"
              >
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h4 className="text-white font-semibold mb-2">{feature.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-14">
          <h3 className="text-3xl font-bold mb-4">How it works</h3>
          <p className="text-slate-400 max-w-xl mx-auto">
            Get started in minutes. No complicated setup.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {steps.map((item) => (
            <div key={item.step} className="text-center">
              <div className="text-5xl font-bold text-indigo-500/20 mb-4">
                {item.step}
              </div>
              <h4 className="text-white font-semibold mb-2">{item.title}</h4>
              <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-slate-800 py-20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">
            Ready to take control of your job search?
          </h3>
          <p className="text-slate-400 mb-8">
            Join job seekers using JobPilot to stay organised and land more interviews.
          </p>
          <button
            onClick={() => navigate('/register')}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium 
                     px-10 py-3 rounded-lg transition"
          >
            Get started for free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <h1 className="text-lg font-bold tracking-tight">
            Job<span className="text-indigo-400">Pilot</span>
          </h1>
          <p className="text-slate-600 text-sm">
            Built with Spring Boot + React + Gemini AI
          </p>
        </div>
      </footer>

    </div>
  );
}

export default Landing;