'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

interface MusicEntry {
  id: string;
  musicLink: string;
  timestamp: string;
  platform: 'YouTube' | 'Spotify';
  thumbnail?: string;
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

  const extractYoutubeThumbnail = (link: string): string | undefined => {
    let videoId: string | null = null;

    if (link.includes('youtube.com')) {
      const url = new URL(link);
      videoId = url.searchParams.get('v');
    } else if (link.includes('youtu.be')) {
      videoId = link.split('/').pop()?.split('?')[0];
    }

    if (videoId) {
      return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    }
    return undefined;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await axios.post('/api/music/submit', { musicLink });

      if (response.data.success) {
        const platform = determinePlatform(musicLink);
        const thumbnail = platform === 'YouTube' ? extractYoutubeThumbnail(musicLink) : undefined;

        const newEntry: MusicEntry = {
          id: Date.now().toString(),
          musicLink,
          timestamp: new Date().toLocaleString('en-US'),
          platform,
          thumbnail,
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
      <div className="max-w-6xl mx-auto">
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

        {/* Grid of Music Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {entries.length === 0 ? (
            <div className="col-span-full text-center text-gray-400 py-12">
              No suggestions yet...
            </div>
          ) : (
            entries.map((entry) => (
              <a
                key={entry.id}
                href={entry.musicLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group border-2 border-green-500 rounded-lg overflow-hidden backdrop-blur-sm hover:scale-105 transition-transform duration-300"
                style={{
                  boxShadow: '0 0 20px rgba(0, 255, 0, 0.2)',
                }}
              >
                {/* Image */}
                {entry.thumbnail ? (
                  <div className="relative w-full aspect-video bg-gray-800 overflow-hidden">
                    <img
                      src={entry.thumbnail}
                      alt="Music thumbnail"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                      <span className="text-4xl">🎥</span>
                    </div>
                  </div>
                ) : (
                  <div className="w-full aspect-video bg-gradient-to-br from-green-600 to-green-900 flex items-center justify-center">
                    <span className="text-5xl">🎵</span>
                  </div>
                )}

                {/* Info */}
                <div className="p-4 bg-gray-900 group-hover:bg-gray-800 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">
                      {entry.platform === 'YouTube' ? '🎥' : '🎵'}
                    </span>
                    <span className="text-sm text-gray-400">{entry.platform}</span>
                  </div>
                  <div className="text-xs text-gray-500">{entry.timestamp}</div>
                  <div className="text-green-400 text-sm mt-2 truncate hover:text-green-300">
                    Open →
                  </div>
                </div>
              </a>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
