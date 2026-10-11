import { useState } from 'react';

function Signup({ onBack }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log({ name, email, password });

    // Fake network delay. Phase 13 replaces this with a real fetch.
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="w-full max-w-sm bg-white p-6 rounded shadow flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-center">Sign Up</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded px-3 py-2"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded px-3 py-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded px-3 py-2"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>

      <button onClick={onBack} className="text-sm text-gray-500 underline">
        Back to Home
      </button>
    </div>
  );
}

export default Signup;