import { useState } from 'react';
import Login from './Login';
import Signup from './Signup';

function App() {
  const [page, setPage] = useState('landing');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 gap-4">
      {page === 'landing' && (
        <>
          <h1 className="text-3xl font-bold">Welcome to Auth App</h1>
          <div className="flex gap-4">
            <button
              onClick={() => setPage('login')}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Login
            </button>
            <button
              onClick={() => setPage('signup')}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Signup
            </button>
          </div>
        </>
      )}

      {page === 'login' && <Login onBack={() => setPage('landing')} />}
      {page === 'signup' && <Signup onBack={() => setPage('landing')} />}
    </div>
  );
}

export default App;