'use client';

import { useEffect, useState } from 'react';

export default function CountdownPage() {
  const [countdown, setCountdown] = useState<string>('');

  useEffect(() => {
    const targetDate = new Date(Date.UTC(2026, 4, 5, 22, 0, 0)); // 01:00 EEST = 22:00 UTC 5.05

    function updateCountdown() {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();

      if (diff <= 0) {
        setCountdown('🚀 Event started!');
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      const localTime = targetDate.toLocaleString(undefined, { timeZoneName: 'short' });

      setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s\nEvent time: ${localTime}`);
    }

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center bg-black text-white overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-black opacity-50"></div>
      
      {/* Glow Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-2xl mx-auto px-4">
        <h1 className="text-6xl md:text-7xl font-black mb-6 glow-green">
          The Streets Are Coming Alive
        </h1>
        
        <h2 className="text-3xl md:text-4xl text-white mb-8 font-bold">
          Join the City!
        </h2>

        <div className="text-2xl md:text-3xl glow-green font-mono whitespace-pre-line mb-8">
          {countdown || 'Loading...'}
        </div>

        <a
          href="https://discord.gg/UXMxcP86"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-8 px-8 py-4 bg-green-500 text-black font-black text-xl rounded-lg hover:bg-green-400 transition-all duration-300 neon-border shadow-2xl"
        >
          💬 Join Discord
        </a>
      </div>
    </div>
  );
}
