export default function DiscordWidget() {
  return (
    <section className="discord py-24 px-4 bg-black">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-5xl md:text-6xl font-black glow-green mb-8">
          JOIN OUR SERVER
        </h2>
        <p className="text-gray-400 text-lg mb-8">
          Ready to start your story? Join the MainStreet community and become part of something legendary.
        </p>
        <a
          href="https://discord.gg/UXMxcP86"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-10 py-5 bg-gradient-to-r from-green-500 to-green-400 text-black font-black rounded-lg text-xl hover:scale-105 transition-transform duration-300 neon-border"
        >
          💬 DISCORD SERVER
        </a>
      </div>
    </section>
  );
}
