import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary-dark text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About */}
          <div>
            <h3 className="font-display text-2xl font-bold mb-6 text-primary-glow">
              Vases d'Honneur
            </h3>
            <p className="text-white/80 mb-6 leading-relaxed">
              Une église chrétienne internationale dédiée à façonner des vies pour la gloire de Dieu.
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com/vasesdhonneur"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-lg bg-white/10 hover:bg-primary flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com/vases_dhonneur"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-lg bg-white/10 hover:bg-primary flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="h-10 w-10 rounded-lg bg-white/10 hover:bg-primary flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-bold mb-6 text-primary-glow">
              Liens Rapides
            </h4>
            <ul className="space-y-3">
              {["Accueil", "À Propos", "Galerie", "Live", "Contact"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-white/80 hover:text-primary transition-colors duration-300"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-lg font-bold mb-6 text-primary-glow">
              Nos Services
            </h4>
            <ul className="space-y-3">
              {[
                "Cultes dominicaux",
                "Formations bibliques",
                "Prière & Intercession",
                "Événements spéciaux",
                "Counseling spirituel"
              ].map((service) => (
                <li key={service}>
                  <span className="text-white/80">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display text-lg font-bold mb-6 text-primary-glow">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <span className="text-white/80">
                  Cocody 2 Plateaux-Vallons<br />
                  Abidjan, Côte d'Ivoire
                </span>
              </li>
              <li className="flex gap-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <a 
                  href="tel:+2250102025309"
                  className="text-white/80 hover:text-primary transition-colors"
                >
                  +225 01 02 02 53 09
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <div className="flex flex-col gap-1">
                  <a 
                    href="mailto:info@vasesdhonneur.org"
                    className="text-white/80 hover:text-primary transition-colors"
                  >
                    info@vasesdhonneur.org
                  </a>
                  <a 
                    href="mailto:digital@vasesdhonneur.info"
                    className="text-white/80 hover:text-primary transition-colors"
                  >
                    digital@vasesdhonneur.info
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60">
            <p>
              © {currentYear} Église Vases d'Honneur. Tous droits réservés.
            </p>
            <p className="text-center">
              Conçu avec 💛 pour la gloire de Dieu
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
