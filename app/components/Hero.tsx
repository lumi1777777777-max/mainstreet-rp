export default function Hero() {
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
