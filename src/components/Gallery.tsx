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

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
            Galerie Multimédia
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            Revivez les moments{" "}
            <span className="text-gradient-royal">d'inspiration</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Découvrez nos cultes, événements et moments de transformation à travers l'image et la vidéo
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover-lift cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-secondary-dark via-secondary-dark/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <span className="inline-block text-primary-glow text-sm font-semibold mb-2">
                  {image.category}
                </span>
                <h3 className="font-display text-2xl font-bold text-white transform translate-y-2 group-hover:translate-y-0 transition-transform">
                  {image.title}
                </h3>
              </div>

              {/* Hover Icon */}
              <div className="absolute top-4 right-4 h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="https://www.vasesdhonneur.org/live"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-secondary hover:text-secondary-dark font-semibold text-lg transition-colors group"
          >
            Voir plus sur notre chaîne Live
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
