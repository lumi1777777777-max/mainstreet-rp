'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

interface MusicEntry {
  id: string;
  artist: string;
  songName: string;
  musicLink: string;
  suggestedBy: string;
  timestamp: string;
  platform: 'YouTube' | 'Spotify';
}

export default function MusicSuggestions() {
  const [entries, setEntries] = useState<MusicEntry[]>([]);
  const [formData, setFormData] = useState({
    artist: '',
    songName: '',
    musicLink: '',
    suggestedBy: '',
  });
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
      // Send to API
      const response = await axios.post('/api/music/submit', formData);

      if (response.data.success) {
        // Add to local list
        const newEntry: MusicEntry = {
          id: Date.now().toString(),
          artist: formData.artist,
          songName: formData.songName,
          musicLink: formData.musicLink,
          suggestedBy: formData.suggestedBy,
          timestamp: new Date().toLocaleString('et-EE'),
          platform: determinePlatform(formData.musicLink),
        };

        const updatedEntries = [newEntry, ...entries];
        setEntries(updatedEntries);
        localStorage.setItem('musicSuggestions', JSON.stringify(updatedEntries));

        setMessage(`✅ Muusika lisatud! Discord channel'ile saadetud!`);
        setFormData({
          artist: '',
          songName: '',
          musicLink: '',
          suggestedBy: '',
        });

        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error: any) {
      const errorMsg = error.response?.data?.error || error.message || 'Viga!';
      setMessage(`❌ ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="music-suggestions py-24 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-black glow-green mb-4 text-center">
          🎵 MUUSIKA SOOVITUSED
        </h2>
        <p className="text-gray-400 text-center mb-12">
          Lisa siia YouTube või Spotify muusika link - teade läheb Discord channel'ile!
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Form */}
          <div className="border-2 border-green-500 rounded-lg p-6 backdrop-blur-sm" style={{
            boxShadow: '0 0 20px rgba(0, 255, 0, 0.2)',
          }}>
            <h3 className="text-2xl font-bold text-green-400 mb-6">Lisada uus muusika</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="artist"
                placeholder="Artisti nimi"
                value={formData.artist}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-gray-800 border border-green-500 rounded text-white placeholder-gray-400 focus:outline-none focus:border-green-400"
              />
              <input
                type="text"
                name="songName"
                placeholder="Laulu nimi"
                value={formData.songName}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-gray-800 border border-green-500 rounded text-white placeholder-gray-400 focus:outline-none focus:border-green-400"
              />
              <input
                type="url"
                name="musicLink"
                placeholder="YouTube või Spotify link"
                value={formData.musicLink}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-gray-800 border border-green-500 rounded text-white placeholder-gray-400 focus:outline-none focus:border-green-400"
              />
              <input
                type="text"
                name="suggestedBy"
                placeholder="Sinu nimi"
                value={formData.suggestedBy}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-gray-800 border border-green-500 rounded text-white placeholder-gray-400 focus:outline-none focus:border-green-400"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-green-500 text-black font-bold rounded hover:bg-green-400 transition-all duration-300 disabled:opacity-50"
              >
                {loading ? 'Saadatakse...' : '📤 Lisa muusika'}
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
            <h3 className="text-2xl font-bold text-green-400 mb-6">Statistika</h3>
            <div className="space-y-4">
              <div className="bg-gray-800 p-4 rounded">
                <div className="text-gray-400 text-sm">Kokku laulud</div>
                <div className="text-3xl font-bold text-green-400">{entries.length}</div>
              </div>
              <div className="bg-gray-800 p-4 rounded">
                <div className="text-gray-400 text-sm">YouTube</div>
                <div className="text-3xl font-bold text-red-400">
                  {entries.filter((e) => e.platform === 'YouTube').length}
                </div>
              </div>
              <div className="bg-gray-800 p-4 rounded">
                <div className="text-gray-400 text-sm">Spotify</div>
                <div className="text-3xl font-bold text-green-500">
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
                  <th className="px-6 py-4 text-left text-green-400 font-bold">Plaat</th>
                  <th className="px-6 py-4 text-left text-green-400 font-bold">Artist</th>
                  <th className="px-6 py-4 text-left text-green-400 font-bold">Laul</th>
                  <th className="px-6 py-4 text-left text-green-400 font-bold">Lisanut</th>
                  <th className="px-6 py-4 text-left text-green-400 font-bold">Aeg</th>
                  <th className="px-6 py-4 text-center text-green-400 font-bold">Link</th>
                </tr>
              </thead>
              <tbody>
                {entries.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-400">
                      Veel muusika pole lisatud...
                    </td>
                  </tr>
                ) : (
                  entries.map((entry) => (
                    <tr key={entry.id} className="border-b border-gray-700 hover:bg-gray-800 bg-opacity-50 transition-colors">
                      <td className="px-6 py-4">
                        <span className="text-2xl">
                          {entry.platform === 'YouTube' ? '🎥' : '🎵'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-300">{entry.artist}</td>
                      <td className="px-6 py-4 text-gray-300">{entry.songName}</td>
                      <td className="px-6 py-4 text-gray-300">{entry.suggestedBy}</td>
                      <td className="px-6 py-4 text-gray-400 text-sm">{entry.timestamp}</td>
                      <td className="px-6 py-4 text-center">
                        <a
                          href={entry.musicLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-400 hover:text-green-300 font-bold transition-colors"
                        >
                          Avaa →
                        </a>
                      </td>
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
