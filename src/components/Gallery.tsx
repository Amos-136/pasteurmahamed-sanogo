import { useState } from "react";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import choirImage from "@/assets/choir-worship.jpg";
import churchImage from "@/assets/church-exterior.jpg";
import eventKodesh from "@/assets/event-kodesh.jpg";
import eventStadium from "@/assets/event-stadium.jpg";
import eventRencontre from "@/assets/event-grande-rencontre.jpg";
import eventGodFirst from "@/assets/event-god-first.jpg";
import pastorSpeaking from "@/assets/pastor-speaking.jpg";
import eventSuccothMilan from "@/assets/event-succoth-milan.jpg";
import pastorOutdoor from "@/assets/pastor-outdoor.jpg";
import grandeRencontreCrowd from "@/assets/grande-rencontre-crowd.jpg";
import grandeRencontrePraise from "@/assets/grande-rencontre-praise.jpg";
import grandeRencontreWorship from "@/assets/grande-rencontre-worship.jpg";
import grandeRencontreView from "@/assets/grande-rencontre-view.jpg";
import pastorPreachingOutdoor from "@/assets/pastor-preaching-outdoor.jpg";
import audienceCloseup from "@/assets/audience-closeup.jpg";
import pastorPreaching from "@/assets/pastor-preaching.jpg";

const Gallery = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const images = [
    {
      src: eventGodFirst,
      alt: "Célébration God First - Pasteur Mohammed Sanogo",
      title: "God First",
      category: "Événement"
    },
    {
      src: eventStadium,
      alt: "La Grande Rencontre au Stade",
      title: "Grande Rencontre",
      category: "Événement Spécial"
    },
    {
      src: pastorSpeaking,
      alt: "Pasteur Mohammed Sanogo - La Grande Rencontre",
      title: "Pasteur Sanogo",
      category: "Leadership"
    },
    {
      src: pastorPreaching,
      alt: "Pasteur Mohammed Sanogo en prédication",
      title: "Message Puissant",
      category: "Culte"
    },
    {
      src: eventSuccothMilan,
      alt: "Succoth Milan 2025",
      title: "Succoth Milan",
      category: "Événement"
    },
    {
      src: grandeRencontreCrowd,
      alt: "Grande Rencontre - Foule en adoration",
      title: "Présence Divine",
      category: "Adoration"
    },
    {
      src: eventKodesh,
      alt: "Centre KODESH - Entrepreneurs Influents",
      title: "Centre KODESH",
      category: "Événement"
    },
    {
      src: grandeRencontrePraise,
      alt: "Grande Rencontre - Louange au Stade",
      title: "Louange Collective",
      category: "Adoration"
    },
    {
      src: choirImage,
      alt: "Chorale gospel en adoration",
      title: "Chorale VDH",
      category: "Culte"
    },
    {
      src: grandeRencontreWorship,
      alt: "Grande Rencontre - Adoration au Stade",
      title: "Adoration Massive",
      category: "Événement"
    },
    {
      src: pastorOutdoor,
      alt: "Pasteur Mohammed Sanogo en mission",
      title: "Mission Divine",
      category: "Leadership"
    },
    {
      src: grandeRencontreView,
      alt: "Grande Rencontre - Vue d'ensemble",
      title: "Grande Rencontre 2024",
      category: "Événement Spécial"
    },
    {
      src: eventRencontre,
      alt: "La Grande Rencontre avec Pasteur Mohammed Sanogo",
      title: "Rencontre Transformante",
      category: "Événement"
    },
    {
      src: pastorPreachingOutdoor,
      alt: "Prédication en plein air",
      title: "Évangélisation",
      category: "Mission"
    },
    {
      src: audienceCloseup,
      alt: "Fidèles en adoration",
      title: "Cœurs Adorateurs",
      category: "Culte"
    },
    {
      src: churchImage,
      alt: "Église Vases d'Honneur",
      title: "Notre Temple",
      category: "Lieu"
    }
  ];

  const featuredImages = images.slice(0, 5);
  const displayImages = showAll ? images : featuredImages;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredImages.length) % featuredImages.length);
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
            Galerie Multimédia
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            Revivez les moments{" "}
            <span className="text-gradient-royal">d'inspiration</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Découvrez nos cultes, événements et moments de transformation
          </p>
        </div>

        {/* Featured Carousel */}
        <div className="relative max-w-5xl mx-auto mb-12 rounded-3xl overflow-hidden shadow-2xl">
          <div className="relative aspect-[16/9]">
            <img
              src={featuredImages[currentSlide].src}
              alt={featuredImages[currentSlide].alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <span className="inline-block text-primary-glow text-sm font-semibold mb-2">
                {featuredImages[currentSlide].category}
              </span>
              <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
                {featuredImages[currentSlide].title}
              </h3>
            </div>

            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 flex items-center justify-center transition-all"
              aria-label="Image précédente"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 flex items-center justify-center transition-all"
              aria-label="Image suivante"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {featuredImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentSlide ? "w-8 bg-white" : "w-2 bg-white/50"
                  }`}
                  aria-label={`Aller à l'image ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Compact Grid */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${!showAll ? "mb-8" : ""}`}>
          {displayImages.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl shadow-md hover-scale cursor-pointer aspect-square"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <div>
                  <span className="text-primary-glow text-xs font-semibold block mb-1">
                    {image.category}
                  </span>
                  <h4 className="font-semibold text-white text-sm">
                    {image.title}
                  </h4>
                </div>
              </div>
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Expand className="w-5 h-5 text-white" />
              </div>
            </div>
          ))}
        </div>

        {/* Show More/Less Button */}
        {!showAll ? (
          <div className="text-center">
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-royal text-white rounded-xl shadow-royal hover:shadow-glow transition-all duration-300"
            >
              Voir toutes les photos ({images.length})
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAll(false)}
              className="inline-flex items-center gap-2 text-primary hover:text-primary-hover font-semibold transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              Voir moins
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
