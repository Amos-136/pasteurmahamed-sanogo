import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import heroImage from "@/assets/hero-worship.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Culte d'adoration à l'Église Vases d'Honneur"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary-dark/95 via-secondary/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 py-20">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-2 mb-8 fade-in-up backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">Église Chrétienne Internationale</span>
          </div>

          {/* Main Title */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 fade-in-up text-white" style={{ animationDelay: "0.1s" }}>
            Vases d'Honneur
          </h1>

          {/* Tagline */}
          <p className="text-2xl md:text-3xl lg:text-4xl font-display text-primary-glow mb-8 fade-in-up" style={{ animationDelay: "0.2s" }}>
            Des vases façonnés pour la gloire de Dieu
          </p>

          {/* Description */}
          <p className="text-lg md:text-xl text-white/90 mb-12 max-w-2xl fade-in-up leading-relaxed" style={{ animationDelay: "0.3s" }}>
            Rejoignez une communauté vibrante où la transformation spirituelle rencontre l'excellence. 
            Sous la direction du Pasteur Mohammed Sanogo, nous façonnons des vies pour la gloire divine.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 fade-in-up" style={{ animationDelay: "0.4s" }}>
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary-glow text-white shadow-divine text-lg px-8 py-6 rounded-full group transition-all duration-300 hover:scale-105"
            >
              Rejoindre un culte
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-secondary backdrop-blur-sm text-lg px-8 py-6 rounded-full group transition-all duration-300 hover:scale-105"
            >
              <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Voir le Live
            </Button>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 fade-in-up" style={{ animationDelay: "0.5s" }}>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover-lift">
              <div className="text-3xl font-display font-bold text-primary mb-2">2000+</div>
              <div className="text-white/80">Membres de la communauté</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover-lift">
              <div className="text-3xl font-display font-bold text-primary mb-2">15 ans</div>
              <div className="text-white/80">De mission et impact</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover-lift">
              <div className="text-3xl font-display font-bold text-primary mb-2">24/7</div>
              <div className="text-white/80">Prière et intercession</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/50 flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
