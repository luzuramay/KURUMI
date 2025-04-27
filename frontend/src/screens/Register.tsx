import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

interface Address {
  street: string;
  neighborhood: string;
  city: string;
  state: string;
}

const Register: React.FC = () => {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState<Address>({ street: '', neighborhood: '', city: '', state: '' });
  const [message, setMessage] = useState('');
  const history = useHistory();

  useEffect(() => {
    const fetchAddress = async () => {
      if (cep.length === 8) {
        try {
          const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
          const data = await res.json();
          setAddress({
            street: data.logradouro || '',
            neighborhood: data.bairro || '',
            city: data.localidade || '',
            state: data.estado || '',
          });
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchAddress();
  }, [cep]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('As senhas não coincidem');
      return;
    }
    const res = await fetch('/cadastro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nickname,
        email,
        password,
        cep,
        street: address.street,
        neighborhood: address.neighborhood,
        city: address.city,
        state: address.state,
      }),
    });
    if (res.ok) {
      history.push('/login');
    } else {
      const data = await res.json();
      setMessage(data.error || 'Falha no cadastro');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center
                    bg-gradient-to-b from-gray-900 via-black to-gray-900 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 rounded-lg shadow-md backdrop-blur-sm text-white"
        style={{ backgroundColor: 'rgba(54, 54, 54, 0.1)' }} // 10% de opacidade
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Cadastro</h2>
        {message && <p className="text-red-400 mb-4 text-sm">{message}</p>}
        <input
          className="w-full p-2 mb-4 rounded bg-gray-800 border border-gray-600 placeholder-gray-400 text-white"
          type="text"
          placeholder="Usuário"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          autoComplete="username"
          required
        />
        <input
          className="w-full p-2 mb-4 rounded bg-gray-800 border border-gray-600 placeholder-gray-400 text-white"
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />
        <div className="relative">
          <input
            className="w-full p-2 mb-4 rounded bg-gray-800 border border-gray-600 placeholder-gray-400 text-white"
            type={showPassword ? "text" : "password"}
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            required
          />
          <button
            type="button"
            className="absolute right-3 top-2.5"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeSlashIcon className="h-5 w-5 text-gray-400" />
            ) : (
              <EyeIcon className="h-5 w-5 text-gray-400" />
            )}
          </button>
        </div>
        <div className="relative">
          <input
            className="w-full p-2 mb-4 rounded bg-gray-800 border border-gray-600 placeholder-gray-400 text-white"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirmar Senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="absolute right-3 top-2.5"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <EyeSlashIcon className="h-5 w-5 text-gray-400" />
            ) : (
              <EyeIcon className="h-5 w-5 text-gray-400" />
            )}
          </button>
        </div>
        
        <input
          className="w-full p-2 mb-4 rounded bg-gray-800 border border-gray-600 placeholder-gray-400 text-white"
          type="text"
          placeholder="CEP"
          value={cep}
          onChange={(e) => setCep(e.target.value.replace(/\D/g, ''))}
          maxLength={8}
          required
        />
        <input
          className="w-full p-2 mb-4 rounded bg-gray-800 border border-gray-600 placeholder-gray-400 text-white"
          type="text"
          placeholder="Rua"
          value={address.street}
          readOnly
        />
        <input
          className="w-full p-2 mb-4 rounded bg-gray-800 border border-gray-600 placeholder-gray-400 text-white"
          type="text"
          placeholder="Bairro"
          value={address.neighborhood}
          readOnly
        />
        <input
          className="w-full p-2 mb-4 rounded bg-gray-800 border border-gray-600 placeholder-gray-400 text-white"
          type="text"
          placeholder="Cidade"
          value={address.city}
          readOnly
        />
        <input
          className="w-full p-2 mb-4 rounded bg-gray-800 border border-gray-600 placeholder-gray-400 text-white"
          type="text"
          placeholder="Estado"
          value={address.state}
          readOnly
        />
        <button
          type="submit"
          className="w-full bg-red-800 hover:bg-red-700 text-white py-2 rounded"
        >
          Cadastrar
        </button>
        <p className="text-sm text-center mt-4">
          Já tem uma conta?{' '}
          <Link to="/login" className="text-red-400 hover:underline">
            Faça login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
