// client/src/pages/HomePage.jsx

import React, { useState } from 'react';
import { createShortUrl } from '../services/apiService';
import Spinner from '../components/Spinner';

const HomePage = () => {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState(null);
  const [error, setError] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsCopied(false);
    setError('');

    if (!longUrl) {
      setError('Please enter a URL.');
      return;
    }

    setIsLoading(true);
    try {
      const data = await createShortUrl(longUrl);
      if (data && data.success && data.data) {
        setShortUrl(data.data.shortUrl);
      } else {
        setError('Unexpected response from server.');
      }
    } catch (err) {
      setError(err.error || err.message || 'An error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!shortUrl) return;
    try {
      await navigator.clipboard.writeText(shortUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 sm:py-24 flex flex-col items-center">
      {/* Hero Section */}
      <div className="text-center font-mono mb-8">
        <span className="inline-block text-[10px] text-purple-600 font-bold uppercase tracking-widest mb-3">
          /01 REDIRECT_GATEWAY
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tighter text-zinc-900 uppercase font-sans">
          URL SHORTENER
        </h1>
        <p className="text-xs text-zinc-500 mt-3 max-w-md mx-auto leading-relaxed uppercase">
          functional. digital. unapologetic. shorten and index dynamic url targets.
        </p>
      </div>

      {/* Input Card */}
      <div className="w-full max-w-2xl relative bg-white border border-zinc-300 p-6 sm:p-8 rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)]">
        {/* Plus Markers */}
        <div className="absolute top-[-7px] left-[-5px] text-[11px] font-mono text-zinc-400 font-semibold">+</div >
        <div className="absolute top-[-7px] right-[-5px] text-[11px] font-mono text-zinc-400 font-semibold">+</div >
        <div className="absolute bottom-[-9px] left-[-5px] text-[11px] font-mono text-zinc-400 font-semibold">+</div >
        <div className="absolute bottom-[-9px] right-[-5px] text-[11px] font-mono text-zinc-400 font-semibold">+</div >

        <span className="text-[9px] text-zinc-400 font-mono absolute top-2 right-3 font-semibold tracking-wider">
          // SCN_01
        </span>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="flex-grow">
            <input
              type="text"
              placeholder="PASTE_LONG_URL..."
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              disabled={isLoading}
              className="w-full h-11 px-3 bg-zinc-50/50 border border-zinc-300 focus:border-purple-600 rounded-none text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none transition-all font-mono"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="h-11 px-6 bg-zinc-950 hover:bg-zinc-800 disabled:bg-zinc-100 disabled:text-zinc-400 disabled:cursor-not-allowed text-white font-bold rounded-none text-xs uppercase tracking-wider transition-all flex items-center justify-center cursor-pointer shadow-[3px_3px_0px_0px_#7c3aed] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_0px_#7c3aed] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none min-w-[120px]"
          >
            {isLoading ? <Spinner size="small" /> : 'SHORTEN ↗'}
          </button>
        </form>

        {/* Feedback Messages */}
        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 text-xs text-red-600 font-mono text-center">
            ⚠️ ERROR: {error.toUpperCase()}
          </div>
        )}

        {shortUrl && (
          <div className="mt-6 p-4 border border-zinc-300 bg-zinc-50/50 rounded-none font-mono relative">
            <span className="text-[8px] text-purple-600 font-bold absolute top-1 right-2 uppercase">
              RENDER.OK
            </span>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <p className="text-[9px] text-zinc-400 uppercase tracking-wider">// SHORT_LINK</p>
                <a
                  href={shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-bold text-purple-600 hover:text-purple-700 transition-colors break-all"
                >
                  {shortUrl}
                </a>
              </div>
              <button
                onClick={handleCopy}
                className={`h-9 px-4 rounded-none text-[10px] font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                  isCopied
                    ? 'bg-emerald-50 text-emerald-600 border border-emerald-250 shadow-none'
                    : 'bg-zinc-950 hover:bg-zinc-800 text-white shadow-[2px_2px_0px_0px_#7c3aed]'
                }`}
              >
                {isCopied ? 'copied' : 'copy link 📋'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* System Status Visualizer */}
      <div className="w-full max-w-2xl mt-12 bg-white border border-zinc-300 p-6 font-mono rounded-none relative shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)]">
        {/* Plus Markers */}
        <div className="absolute top-[-7px] left-[-5px] text-[11px] font-mono text-zinc-400 font-semibold">+</div >
        <div className="absolute top-[-7px] right-[-5px] text-[11px] font-mono text-zinc-400 font-semibold">+</div >
        <div className="absolute bottom-[-9px] left-[-5px] text-[11px] font-mono text-zinc-400 font-semibold">+</div >
        <div className="absolute bottom-[-9px] right-[-5px] text-[11px] font-mono text-zinc-400 font-semibold">+</div >

        <div className="text-[10px] text-purple-600 font-bold block mb-4 uppercase">
          /02 SYSTEM STATUS
        </div>
        <div className="space-y-3 text-[11px]">
          <div className="flex justify-between border-b border-zinc-100 pb-1.5">
            <span className="text-zinc-500">API_LATENCY</span>
            <span className="font-bold text-zinc-800">12ms (OPTIMAL)</span>
          </div>
          <div className="flex justify-between border-b border-zinc-100 pb-1.5">
            <span className="text-zinc-500">ROUTING_SPEED</span>
            <span className="font-bold text-zinc-800">1.2 GB/S</span>
          </div>
          <div className="flex justify-between pb-0.5">
            <span className="text-zinc-500">FIREBASE_CONN</span>
            <span className="font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-1.5 rounded-sm">ACTIVE</span>
          </div>
        </div>
        <div className="mt-4 p-2 bg-[#e2f952] text-zinc-950 font-bold text-[10px] tracking-wider text-center uppercase border border-zinc-300">
          ALL SYSTEMS OPERATIONAL
        </div>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl text-left mt-16 font-mono">
        <div className="bg-white border border-zinc-300 p-5 rounded-none relative">
          <div className="text-purple-600 text-xs font-bold mb-2">/03 FUNCTION</div>
          <h4 className="text-xs font-bold text-zinc-800 uppercase mb-1">Functional Design</h4>
          <p className="text-[10px] text-zinc-500 leading-relaxed uppercase">
            Design built to serve targets efficiently. Nothing more.
          </p>
        </div>
        <div className="bg-white border border-zinc-300 p-5 rounded-none relative">
          <div className="text-purple-600 text-xs font-bold mb-2">/04 SYSTEMS</div>
          <h4 className="text-xs font-bold text-zinc-800 uppercase mb-1">Systems Thinking</h4>
          <p className="text-[10px] text-zinc-500 leading-relaxed uppercase">
            Structured grids, module routing, connected indexes.
          </p>
        </div>
        <div className="bg-white border border-zinc-300 p-5 rounded-none relative">
          <div className="text-purple-600 text-xs font-bold mb-2">/05 SECURITY</div>
          <h4 className="text-xs font-bold text-zinc-800 uppercase mb-1">Raw Auth</h4>
          <p className="text-[10px] text-zinc-500 leading-relaxed uppercase">
            JSON Web Tokens protect endpoints with zero fluff.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;