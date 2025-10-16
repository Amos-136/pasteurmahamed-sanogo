import Hero from "@/components/Hero";
import Mission from "@/components/Mission";
import History from "@/components/History";
import Impact from "@/components/Impact";
import Gallery from "@/components/Gallery";
import YouTubeVideos from "@/components/YouTubeVideos";
import LiveMedia from "@/components/LiveMedia";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";
import WhatsAppButton from "@/components/WhatsAppButton";
import ThemeToggle from "@/components/ThemeToggle";

const Index = () => {
  return (
    <div className="min-h-screen">
      <ThemeToggle />
      <Hero />
      <Mission />
      <History />
      <Impact />
      <Gallery />
      <YouTubeVideos />
      <LiveMedia />
      <Contact />
      <Footer />
      <ChatBot />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
