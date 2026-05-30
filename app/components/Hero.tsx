'use client';

import { useEffect, useState } from 'react';

export default function Hero() {
  const [countdown, setCountdown] = useState<string>('');
  const [matrixChars, setMatrixChars] = useState<string[]>([]);

  useEffect(() => {
    // Matrix effect
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const newChars = Array(15)
      .fill(0)
      .map(() => chars[Math.floor(Math.random() * chars.length)]);
    setMatrixChars(newChars);
  }, []);

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
      {/* Background with gradient and matrix effect */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black opacity-80"></div>
        
        {/* Matrix rain effect */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          {matrixChars.map((char, i) => (
            <div
              key={i}
              className="absolute glow-green text-sm font-mono animate-pulse"
              style={{
                left: `${(i * 100) / matrixChars.length}%`,
                top: `${Math.random() * 100}%`,
                animation: `fall ${3 + Math.random() * 2}s linear infinite`,
              }}
            >
              {char}
            </div>
          ))}
        </div>

        {/* Glow orbs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        {/* Logo area with neon border */}
        <div className="mb-8 inline-block border-2 border-green-500 rounded-lg p-8 backdrop-blur-sm hover:shadow-2xl transition-all duration-300" style={{
          boxShadow: '0 0 20px #00ff00, inset 0 0 20px rgba(0, 255, 0, 0.1)',
        }}>
          <h1 className="text-8xl md:text-9xl font-black mb-2 glow-green animate-pulse-glow" style={{
            textShadow: '0 0 30px #00ff00, 0 0 60px #00ff00, 0 0 90px #00ff00',
          }}>
            MSRP
          </h1>
          <div className="text-green-400 text-sm font-mono">&gt; MainStreet RP</div>
        </div>

        <p className="text-xl md:text-2xl text-gray-300 mb-8 font-light">
          THIS AIN'T ANOTHER CITY. THIS IS MAINSTREET.
        </p>

        {/* Matrix code line */}
        <div className="mb-8 text-green-500 text-xs font-mono opacity-60">
          &gt; System online // Ready to connect // 01110100 01101000 01101001 01110011
        </div>

        {/* Countdown */}
        <div className="mb-8 text-3xl md:text-4xl glow-green font-mono font-bold" style={{
          textShadow: '0 0 20px #00ff00',
        }}>
          {countdown ? `⏱️ ${countdown}` : 'Loading...'}
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-center items-center mt-8">
          <a
            href="https://discord.gg/UXMxcP86"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-green-500 text-black font-bold rounded-lg hover:bg-green-400 transition-all duration-300 text-lg neon-border animate-slide-up hover:scale-105"
          >
            🎮 JOIN THE CITY
          </a>
          <button className="px-8 py-4 border-2 border-green-500 text-green-500 font-bold rounded-lg hover:bg-green-500 hover:text-black transition-all duration-300 text-lg hover:scale-105">
            LEARN MORE
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}
