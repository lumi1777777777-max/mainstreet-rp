export default function Features() {
  const features = [
    {
      icon: "🎮",
      title: "FULLY CUSTOM",
      desc: "Everything is built from scratch",
    },
    {
      icon: "💯",
      title: "100% ORIGINAL",
      desc: "No copy-paste roleplay",
    },
    {
      icon: "👥",
      title: "ACTIVE COMMUNITY",
      desc: "Real players, real stories",
    },
    {
      icon: "⚡",
      title: "SERIOUS & SEMI-SERIOUS RP",
      desc: "Your choice of experience",
    },
  ];

  return (
    <section className="features py-24 px-4 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-black text-center glow-green mb-16">
          WHY MAINSTREET?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="neon-border p-6 backdrop-blur-sm hover:shadow-2xl transition-all duration-300"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-bold glow-green mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
