// client/src/pages/DashboardPage.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getUserLinks } from '../services/linkService';
import Spinner from '../components/Spinner';

const DashboardPage = () => {
  const { token, logout } = useAuth();
  const [links, setLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [copiedIndex, setCopiedIndex] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLinks = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }
      try {
        setIsLoading(true);
        setError('');
        const resData = await getUserLinks(token);
        
        if (resData && resData.success && Array.isArray(resData.data)) {
          setLinks(resData.data);
        } else if (resData && Array.isArray(resData)) {
          setLinks(resData);
        } else {
          setLinks([]);
        }
      } catch (err) {
        console.error('Error fetching links:', err);
        setError(err.message || 'Failed to fetch links.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLinks();
  }, [token]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleCopy = async (url, index) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  // Calculate statistics
  const totalLinks = links.length;
  const totalClicks = links.reduce((sum, link) => sum + (link.clicks || 0), 0);
  const mostClicked = links.length > 0 
    ? [...links].sort((a, b) => (b.clicks || 0) - (a.clicks || 0))[0]
    : null;

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 font-mono">
        <div>
          <span className="text-[10px] text-purple-600 font-bold uppercase tracking-widest block mb-1">
            /03 DATABASE_SHELL
          </span>
          <h2 className="text-xl font-bold tracking-tight text-zinc-900 uppercase">
            LINK_INDEX
          </h2>
          <p className="text-xs text-zinc-400 mt-1 uppercase">
            monitoring active redirection parameters
          </p>
        </div>
        <div>
          <button
            onClick={() => navigate('/')}
            className="w-full sm:w-auto px-4 py-2 bg-zinc-950 text-white font-bold text-xs uppercase rounded-none hover:bg-zinc-800 transition-all cursor-pointer shadow-[3px_3px_0px_0px_#7c3aed] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_0px_#7c3aed] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
          >
            + NEW_LINK ↗
          </button>
        </div>
      </div>

      {/* Stats Row */}
      {!isLoading && !error && links.length > 0 && (
        <div className="w-full bg-white border border-zinc-300 p-5 rounded-none relative mb-10 font-mono shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)]">
          {/* Plus Markers */}
          <div className="absolute top-[-7px] left-[-5px] text-[11px] font-mono text-zinc-400 font-semibold">+</div >
          <div className="absolute top-[-7px] right-[-5px] text-[11px] font-mono text-zinc-400 font-semibold">+</div >
          <div className="absolute bottom-[-9px] left-[-5px] text-[11px] font-mono text-zinc-400 font-semibold">+</div >
          <div className="absolute bottom-[-9px] right-[-5px] text-[11px] font-mono text-zinc-400 font-semibold">+</div >

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-zinc-200">
            <div className="flex flex-col">
              <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider">[STAT.01] TOTAL_NODES</span>
              <span className="text-2xl font-bold text-zinc-900 mt-2">{totalLinks}</span>
            </div>
            <div className="flex flex-col sm:pl-6">
              <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider">[STAT.02] NET_CLICKS</span>
              <span className="text-2xl font-bold text-purple-600 mt-2">{totalClicks}</span>
            </div>
            <div className="flex flex-col sm:pl-6 max-w-full">
              <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider">[STAT.03] PEAK_TRAFFIC</span>
              <span className="text-xs font-bold text-zinc-800 mt-2 truncate break-all block">
                {mostClicked ? mostClicked.shortUrl : 'NULL'}
              </span>
              <span className="text-[9px] text-zinc-400 mt-0.5 uppercase">
                latency: {mostClicked ? mostClicked.clicks || 0 : 0} reqs
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Links List */}
      <div className="border border-zinc-300 bg-white rounded-none overflow-hidden relative shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)]">
        {/* Plus Markers */}
        <div className="absolute top-[-7px] left-[-5px] text-[11px] font-mono text-zinc-400 font-semibold">+</div >
        <div className="absolute top-[-7px] right-[-5px] text-[11px] font-mono text-zinc-400 font-semibold">+</div >
        <div className="absolute bottom-[-9px] left-[-5px] text-[11px] font-mono text-zinc-400 font-semibold">+</div >
        <div className="absolute bottom-[-9px] right-[-5px] text-[11px] font-mono text-zinc-400 font-semibold">+</div >

        {isLoading ? (
          <div className="py-20 font-mono">
            <Spinner />
            <p className="text-xs text-zinc-400 text-center mt-3 uppercase">fetching node database...</p>
          </div>
        ) : error ? (
          <div className="p-8 text-center font-mono">
            <p className="text-red-600 text-xs font-bold">⚠️ FATAL: {error.toUpperCase()}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-3 py-1.5 border border-zinc-300 hover:border-zinc-400 text-zinc-700 bg-white font-bold text-xs transition-colors cursor-pointer rounded-none"
            >
              REBOOT_REQUEST
            </button>
          </div>
        ) : links.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse font-mono text-xs">
              <thead>
                <tr className="border-b border-zinc-300 bg-zinc-50">
                  <th className="p-4 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">short index</th>
                  <th className="p-4 text-[10px] font-bold text-zinc-500 uppercase tracking-wider hidden md:table-cell">target route</th>
                  <th className="p-4 text-[10px] font-bold text-zinc-500 uppercase tracking-wider text-center">views</th>
                  <th className="p-4 text-[10px] font-bold text-zinc-500 uppercase tracking-wider text-right">actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                {links.map((link, index) => (
                  <tr key={link.id || link._id || index} className="hover:bg-zinc-50/50 transition-colors">
                    <td className="p-4">
                      <a
                        href={link.shortUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold text-purple-600 hover:text-purple-700 transition-colors break-all"
                      >
                        {link.shortUrl}
                      </a>
                    </td>
                    <td className="p-4 hidden md:table-cell max-w-xs truncate text-[10px] text-zinc-400">
                      {link.longUrl}
                    </td>
                    <td className="p-4 text-center">
                      <span className="text-xs font-bold text-zinc-800">
                        {link.clicks || 0}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleCopy(link.shortUrl, index)}
                        className={`inline-flex items-center justify-center px-2.5 py-1.5 rounded-none text-[9px] font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                          copiedIndex === index
                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-250'
                            : 'bg-zinc-950 hover:bg-zinc-800 text-white border border-zinc-950 shadow-[2px_2px_0px_0px_#7c3aed] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none'
                        }`}
                      >
                        {copiedIndex === index ? 'copied' : 'copy'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-16 px-4 text-center font-mono">
            <h3 className="text-xs font-bold text-zinc-400 uppercase">no items registered</h3>
            <p className="text-[10px] text-zinc-500 mt-2 max-w-xs mx-auto uppercase">
              database is currently void of items.
            </p>
            <button
              onClick={() => navigate('/')}
              className="mt-5 px-4 py-2 bg-zinc-950 hover:bg-zinc-800 text-white font-bold rounded-none text-xs uppercase shadow-[2px_2px_0px_0px_#7c3aed] transition-all cursor-pointer"
            >
              seed database ↗
            </button>
          </div>
        )}
      </div>

      {/* Logout button */}
      <div className="flex justify-end mt-8 font-mono">
        <button
          onClick={handleLogout}
          className="text-xs text-zinc-400 hover:text-purple-600 font-bold transition-colors cursor-pointer uppercase"
        >
          // access_terminate
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;