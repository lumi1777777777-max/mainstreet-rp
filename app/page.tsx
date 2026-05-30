import Hero from "./components/Hero";
import Features from "./components/Features";
import MusicSuggestions from "./components/MusicSuggestions";
import DiscordWidget from "./components/DiscordWidget";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="w-full bg-black">
      <Hero />
      <Features />
      <MusicSuggestions />
      <DiscordWidget />
      <Footer />
    </main>
  );
}
