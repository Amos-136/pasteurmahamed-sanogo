import Hero from "@/components/Hero";
import Mission from "@/components/Mission";
import Gallery from "@/components/Gallery";
import LiveMedia from "@/components/LiveMedia";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Mission />
      <Gallery />
      <LiveMedia />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
