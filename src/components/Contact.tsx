import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const Contact = () => {
  const contactInfo = [
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Adresse",
      details: ["Cocody 2 Plateaux-Vallons", "Abidjan, Côte d'Ivoire"]
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Téléphone",
      details: ["+225 01 02 02 53 09"]
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      details: ["info@vasesdhonneur.org", "digital@vasesdhonneur.info"]
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Horaires des cultes",
      details: ["Dimanche: 9h - 12h", "Mercredi: 18h - 20h"]
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background to-accent">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Contact Info */}
          <div>
            <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
              Contactez-nous
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Venez nous{" "}
              <span className="text-gradient-royal">rencontrer</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-12">
              Nous serions ravis de vous accueillir dans notre communauté. 
              N'hésitez pas à nous contacter pour toute question.
            </p>

            <div className="space-y-8">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-gradient-divine flex items-center justify-center text-white shadow-divine">
                    {info.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      {info.title}
                    </h3>
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-muted-foreground">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Quick Contact Form */}
          <div className="bg-card rounded-3xl p-8 md:p-12 border border-border shadow-royal">
            <h3 className="font-display text-2xl font-bold text-foreground mb-6">
              Envoyez-nous un message
            </h3>
            
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Nom complet
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  placeholder="Votre nom"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  placeholder="votre@email.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                  Téléphone
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  placeholder="+225 XX XX XX XX XX"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                  placeholder="Partagez votre message..."
                />
              </div>

              <Button 
                type="submit"
                size="lg"
                className="w-full bg-gradient-royal text-white shadow-royal hover:shadow-glow transition-all duration-300 text-lg py-6 rounded-xl"
              >
                Envoyer le message
              </Button>
            </form>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="mt-16 rounded-3xl overflow-hidden border border-border shadow-lg h-96 bg-muted flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-16 w-16 text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">
              Carte interactive à venir
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
