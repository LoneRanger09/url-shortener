// client/src/pages/LoginPage.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService';
import Spinner from '../components/Spinner';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Both email and password are required.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await loginUser(formData);
      
      if (response.token) {
        login(response.token);
        console.log('User authenticated successfully in Context!');
        navigate('/dashboard');
      } else {
        setError('Login successful, but no token was provided.');
      }
    } catch (err) {
      const errorMessage = err.error || 'Login failed. Please check your credentials.';
      setError(errorMessage);
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm border border-zinc-300 bg-white p-8 rounded-none relative shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)]">
        {/* Brutalist Corner Plus Markers */}
        <div className="absolute top-[-7px] left-[-5px] text-[11px] font-mono text-zinc-400 font-semibold">+</div >
        <div className="absolute top-[-7px] right-[-5px] text-[11px] font-mono text-zinc-400 font-semibold">+</div >
        <div className="absolute bottom-[-9px] left-[-5px] text-[11px] font-mono text-zinc-400 font-semibold">+</div >
        <div className="absolute bottom-[-9px] right-[-5px] text-[11px] font-mono text-zinc-400 font-semibold">+</div >

        <div className="mb-6 font-mono">
          <span className="text-[10px] text-purple-600 font-bold uppercase tracking-widest block mb-1">
            /01 AUTH_GATE
          </span>
          <h2 className="text-xl font-bold tracking-tight text-zinc-900 uppercase">
            SIGN_IN
          </h2>
          <p className="text-xs text-zinc-400 mt-1 uppercase">
            session.status: pending_auth
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-1.5 font-mono">
              email address
            </label>
            <input
              id="email"
              type="email"
              placeholder="name@example.com"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
              className="w-full h-10 px-3 bg-zinc-50/50 border border-zinc-300 focus:border-purple-600 rounded-none text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none transition-all font-mono"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-1.5 font-mono">
              password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              name="password"
              value={formData.password}
              onChange={handleChange}
              disabled={isLoading}
              className="w-full h-10 px-3 bg-zinc-50/50 border border-zinc-300 focus:border-purple-600 rounded-none text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none transition-all font-mono"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-10 bg-zinc-950 hover:bg-zinc-900 disabled:bg-zinc-100 disabled:text-zinc-400 disabled:cursor-not-allowed text-white font-bold rounded-none text-xs uppercase tracking-wider transition-all flex items-center justify-center cursor-pointer shadow-[3px_3px_0px_0px_#7c3aed] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_0px_#7c3aed] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
          >
            {isLoading ? <Spinner size="small" /> : 'SIGN_IN ↗'}
          </button>
        </form>

        {error && (
          <div className="p-2.5 rounded-none bg-red-50 border border-red-200 text-xs text-red-600 font-mono mt-4 text-center">
            {error}
          </div>
        )}

        <p className="text-center text-xs text-zinc-400 mt-6 font-mono uppercase">
          no account?{' '}
          <Link to="/register" className="text-purple-600 hover:text-purple-700 font-bold underline underline-offset-4 transition-colors">
            register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;