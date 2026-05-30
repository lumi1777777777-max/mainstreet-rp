'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

interface MusicEntry {
  id: string;
  musicLink: string;
  timestamp: string;
  platform: 'YouTube' | 'Spotify';
}

export default function MusicSuggestions() {
  const [entries, setEntries] = useState<MusicEntry[]>([]);
  const [musicLink, setMusicLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('musicSuggestions');
    if (stored) {
      try {
        setEntries(JSON.parse(stored));
      } catch (error) {
        console.error('Error loading suggestions:', error);
      }
    }
  }, []);

  const determinePlatform = (link: string): 'YouTube' | 'Spotify' => {
    if (link.includes('youtube.com') || link.includes('youtu.be')) {
      return 'YouTube';
    }
    return 'Spotify';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await axios.post('/api/music/submit', { musicLink });

      if (response.data.success) {
        const newEntry: MusicEntry = {
          id: Date.now().toString(),
          musicLink,
          timestamp: new Date().toLocaleString('en-US'),
          platform: determinePlatform(musicLink),
        };

        const updatedEntries = [newEntry, ...entries];
        setEntries(updatedEntries);
        localStorage.setItem('musicSuggestions', JSON.stringify(updatedEntries));

        setMessage(`✅ Music added to Discord!`);
        setMusicLink('');

        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error: any) {
      const errorMsg = error.response?.data?.error || error.message || 'Error!';
      setMessage(`❌ ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="music-suggestions py-24 px-4 bg-black">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-black glow-green mb-4 text-center">
          🎵 MUSIC SUGGESTIONS
        </h2>
        <p className="text-gray-400 text-center mb-12">
          Share YouTube or Spotify music links - they'll appear on Discord!
        </p>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Form */}
          <div className="md:col-span-2 border-2 border-green-500 rounded-lg p-6 backdrop-blur-sm" style={{
            boxShadow: '0 0 20px rgba(0, 255, 0, 0.2)',
          }}>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="url"
                placeholder="Paste YouTube or Spotify link..."
                value={musicLink}
                onChange={(e) => setMusicLink(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-800 border border-green-500 rounded text-white placeholder-gray-400 focus:outline-none focus:border-green-400"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-green-500 text-black font-bold rounded hover:bg-green-400 transition-all duration-300 disabled:opacity-50"
              >
                {loading ? 'Sending...' : '📤 Add'}
              </button>
            </form>
            {message && (
              <div className={`mt-4 p-3 rounded text-center font-semibold ${
                message.includes('✅') ? 'bg-green-500 bg-opacity-20 text-green-300' : 'bg-red-500 bg-opacity-20 text-red-300'
              }`}>
                {message}
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="border-2 border-green-500 rounded-lg p-6 backdrop-blur-sm" style={{
            boxShadow: '0 0 20px rgba(0, 255, 0, 0.2)',
          }}>
            <h3 className="text-xl font-bold text-green-400 mb-4">Stats</h3>
            <div className="space-y-3">
              <div>
                <div className="text-gray-400 text-sm">Total</div>
                <div className="text-3xl font-bold text-green-400">{entries.length}</div>
              </div>
              <div>
                <div className="text-gray-400 text-sm">🎥 YouTube</div>
                <div className="text-2xl font-bold text-red-400">
                  {entries.filter((e) => e.platform === 'YouTube').length}
                </div>
              </div>
              <div>
                <div className="text-gray-400 text-sm">🎵 Spotify</div>
                <div className="text-2xl font-bold text-green-500">
                  {entries.filter((e) => e.platform === 'Spotify').length}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="border-2 border-green-500 rounded-lg overflow-hidden backdrop-blur-sm" style={{
          boxShadow: '0 0 20px rgba(0, 255, 0, 0.2)',
        }}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-green-500 bg-opacity-10 border-b border-green-500">
                  <th className="px-6 py-4 text-left text-green-400 font-bold">Platform</th>
                  <th className="px-6 py-4 text-left text-green-400 font-bold">Link</th>
                  <th className="px-6 py-4 text-left text-green-400 font-bold">Added</th>
                </tr>
              </thead>
              <tbody>
                {entries.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-8 text-center text-gray-400">
                      No suggestions yet...
                    </td>
                  </tr>
                ) : (
                  entries.map((entry) => (
                    <tr key={entry.id} className="border-b border-gray-700 hover:bg-gray-800 bg-opacity-50 transition-colors">
                      <td className="px-6 py-4 text-2xl">
                        {entry.platform === 'YouTube' ? '🎥' : '🎵'}
                      </td>
                      <td className="px-6 py-4">
                        <a
                          href={entry.musicLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-400 hover:text-green-300 font-bold transition-colors truncate"
                        >
                          {entry.musicLink}
                        </a>
                      </td>
                      <td className="px-6 py-4 text-gray-400 text-sm">{entry.timestamp}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
