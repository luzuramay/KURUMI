import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const history = useHistory();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (res.ok) {
      history.push('/game');
    } else {
      const data = await res.json();
      setMessage(data.error || 'Falha no login');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center
                    bg-gradient-to-b from-gray-900 via-black to-gray-900 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 rounded-lg shadow-md backdrop-blur-sm text-white"
        style={{ backgroundColor: 'rgba(54, 54, 54, 0.1)' }}  // 10% de branco sobreposto
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {message && <p className="text-red-400 mb-4 text-sm">{message}</p>}
        <input
          className="w-full p-2 mb-4 rounded bg-gray-800 border border-gray-600 placeholder-gray-400 text-white"
          type="text"
          placeholder="Usuário ou E-mail"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
          required
        />
        <input
          className="w-full p-2 mb-6 rounded bg-gray-800 border border-gray-600 placeholder-gray-400 text-white"
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />
        <button
          type="submit"
          className="w-full bg-red-800 hover:bg-red-700 text-white py-2 rounded"
        >
          Login
        </button>
        <p className="text-sm text-center mt-4">
          Não tem uma conta?{' '}
          <Link to="/register" className="text-red-400 hover:underline">
            Cadastre-se
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
