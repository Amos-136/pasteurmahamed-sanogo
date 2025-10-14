import { Button } from "@/components/ui/button";
import { Radio, Video, Music, MessageCircle } from "lucide-react";

const LiveMedia = () => {
  const mediaLinks = [
    {
      icon: <Video className="h-8 w-8" />,
      title: "Live Streaming",
      description: "Suivez nos cultes en direct",
      link: "https://www.vasesdhonneur.org/live",
      color: "from-red-500 to-red-600"
    },
    {
      icon: <Radio className="h-8 w-8" />,
      title: "Podcast",
      description: "Prédications & enseignements",
      link: "#",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: <Music className="h-8 w-8" />,
      title: "Gospel Music",
      description: "Chants de louange",
      link: "#",
      color: "from-primary to-primary-glow"
    },
    {
      icon: <MessageCircle className="h-8 w-8" />,
      title: "VaseBot",
      description: "Assistant spirituel IA",
      link: "#",
      color: "from-secondary to-secondary-dark"
    }
  ];

  const socialLinks = [
    {
      name: "Facebook",
      username: "@vasesdhonneur",
      link: "https://facebook.com/vasesdhonneur",
      icon: "📘"
    },
    {
      name: "Instagram",
      username: "@vases_dhonneur",
      link: "https://instagram.com/vases_dhonneur",
      icon: "📸"
    },
    {
      name: "YouTube",
      username: "Vases d'Honneur",
      link: "#",
      icon: "📺"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-accent to-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-secondary rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
            Live & Médias
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            Restez{" "}
            <span className="text-gradient-divine">connectés</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Rejoignez notre communauté digitale et ne manquez aucun moment d'inspiration
          </p>
        </div>

        {/* Media Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {mediaLinks.map((media, index) => (
            <a
              key={index}
              href={media.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="bg-card rounded-2xl p-8 border border-border hover-lift hover:shadow-royal transition-all duration-300">
                <div className={`h-16 w-16 rounded-xl bg-gradient-to-br ${media.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                  {media.icon}
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {media.title}
                </h3>
                <p className="text-muted-foreground">
                  {media.description}
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* Social Media Section */}
        <div className="bg-gradient-celestial rounded-3xl p-12 border border-primary/10">
          <div className="text-center mb-8">
            <h3 className="font-display text-3xl font-bold text-foreground mb-4">
              Suivez-nous sur les réseaux sociaux
            </h3>
            <p className="text-muted-foreground">
              Rejoignez notre communauté en ligne et partagez la bonne nouvelle
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <div className="bg-card rounded-xl p-6 border border-border hover:border-primary hover:shadow-divine transition-all duration-300 text-center">
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                    {social.icon}
                  </div>
                  <h4 className="font-semibold text-foreground mb-1">
                    {social.name}
                  </h4>
                  <p className="text-sm text-primary">
                    {social.username}
                  </p>
                </div>
              </a>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button 
              size="lg"
              className="bg-gradient-divine text-white shadow-divine hover:shadow-glow transition-all duration-300 text-lg px-8 py-6 rounded-full"
            >
              Rejoindre la communauté
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveMedia;
