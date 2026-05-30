'use client';

import { useEffect, useState } from 'react';

export default function Hero() {
  const [countdown, setCountdown] = useState<string>('');

  useEffect(() => {
    // 6. juuni 2026 01:00 EEST = 5. juuni 2026 22:00 UTC
    const targetDate = new Date(Date.UTC(2026, 5, 5, 22, 0, 0));

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

      setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-96 h-96 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <h1 className="text-8xl md:text-9xl font-black mb-4 glow-green animate-pulse-glow">
          MSRP
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-6 font-light">
          THIS AIN'T ANOTHER CITY. THIS IS MAINSTREET.
        </p>

        {/* Countdown */}
        <div className="mb-8 text-3xl md:text-4xl glow-green font-mono font-bold">
          {countdown ? `⏱️ ${countdown}` : 'Loading...'}
        </div>
        <p className="text-gray-400 mb-8 text-lg">Server launch: 6. juuni 2026 kell 1:00 AM EEST</p>

        <div className="flex flex-col md:flex-row gap-4 justify-center items-center mt-8">
          <a
            href="https://discord.gg/UXMxcP86"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-green-500 text-black font-bold rounded-lg hover:bg-green-400 transition-all duration-300 text-lg neon-border animate-slide-up"
          >
            🎮 JOIN THE CITY
          </a>
          <button className="px-8 py-4 border-2 border-green-500 text-green-500 font-bold rounded-lg hover:bg-green-500 hover:text-black transition-all duration-300 text-lg">
            LEARN MORE
          </button>
        </div>
      </div>
    </section>
  );
}
