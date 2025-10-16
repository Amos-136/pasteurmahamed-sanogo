import Hero from "@/components/Hero";
import Mission from "@/components/Mission";
import Gallery from "@/components/Gallery";
import YouTubeVideos from "@/components/YouTubeVideos";
import LiveMedia from "@/components/LiveMedia";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Mission />
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
