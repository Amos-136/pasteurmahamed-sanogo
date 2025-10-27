import { motion } from "framer-motion";
import {
  Accessibility,
  Languages,
  PenSquare,
  SearchCheck,
  UsersRound,
  Sparkles,
  BellRing,
  QrCode,
  Waves,
  BarChart3,
} from "lucide-react";

const features = [
  {
    title: "Accessibilité & SEO",
    icon: Accessibility,
    description:
      "Chaque page est pensée pour être inclusive et facilement trouvable. Nous optimisons la structure du contenu pour les lecteurs d'écran tout en maximisant la visibilité dans les moteurs de recherche.",
    highlights: [
      "Navigation clavier et contrastes renforcés",
      "Balises ARIA et Open Graph enrichies",
      "Plan de site généré automatiquement",
    ],
  },
  {
    title: "Multilingue FR/EN",
    icon: Languages,
    description:
      "Offrez une expérience parfaitement fluide aux fidèles francophones et anglophones grâce à une interface pensée pour le multilingue.",
    highlights: [
      "Détection de la langue du navigateur",
      "Gestion centralisée des traductions",
      "Contenu synchronisé sur les deux langues",
    ],
  },
  {
    title: "Blog spirituel",
    icon: PenSquare,
    description:
      "Un espace éditorial vivant pour partager méditations, enseignements et témoignages qui nourrissent la foi au quotidien.",
    highlights: [
      "Planification des publications",
      "Mises en avant thématiques",
      "Partage social instantané",
    ],
  },
  {
    title: "SEO complet + Rich Snippets",
    icon: SearchCheck,
    description:
      "Nous structurons les contenus pour Google, Bing et les réseaux sociaux avec des schémas JSON-LD et des extraits enrichis.",
    highlights: [
      "Données structurées pour événements et articles",
      "Optimisation des titres et méta-descriptions",
      "Prévisualisation des partages sociaux",
    ],
  },
  {
    title: "Espace membre",
    icon: UsersRound,
    description:
      "Un portail sécurisé permet aux membres de gérer leur profil, suivre les formations et accéder aux ressources exclusives.",
    highlights: [
      "Inscription simplifiée et gestion des rôles",
      "Historique de participation et progression",
      "Partage de documents confidentiels",
    ],
  },
  {
    title: "Fonctionnalités avancées",
    icon: Sparkles,
    description:
      "Des modules intelligents pour dynamiser la vie de l'église et automatiser les tâches récurrentes.",
    highlights: [
      "Automatisation des rappels d'événements",
      "Intégrations streaming et formulaires",
      "Personnalisation par centre d'intérêt",
    ],
  },
  {
    title: "Notifications push",
    icon: BellRing,
    description:
      "Restez en lien avec la communauté grâce à des alertes instantanées sur mobile et desktop.",
    highlights: [
      "Campagnes segmentées par ministère",
      "Programmes et lives envoyés en temps réel",
      "Consentement RGPD intégré",
    ],
  },
  {
    title: "QR Code dynamique",
    icon: QrCode,
    description:
      "Un outil polyvalent pour relier facilement vos supports physiques aux contenus numériques à jour.",
    highlights: [
      "Redirections éditables en un clic",
      "Statistiques de scans détaillées",
      "Design personnalisable aux couleurs de l'église",
    ],
  },
  {
    title: "Son de fond optionnel",
    icon: Waves,
    description:
      "Créez une ambiance immersive avec une bande sonore douce, activable selon les préférences de chacun.",
    highlights: [
      "Contrôle utilisateur accessible",
      "Boucles audio optimisées pour le web",
      "Mémorisation du choix par cookie",
    ],
  },
  {
    title: "Analytics",
    icon: BarChart3,
    description:
      "Analysez l'engagement de vos visiteurs pour orienter vos décisions stratégiques.",
    highlights: [
      "Tableau de bord temps réel",
      "Suivi des conversions et des dons",
      "Rapports exportables pour l'équipe",
    ],
  },
];

const DigitalFeatures = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-secondary/5 via-background to-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gradient-divine mb-6">
            Une plateforme moderne au service du ministère
          </h2>
          <p className="text-lg text-muted-foreground">
            Nous combinons technologie et spiritualité pour offrir une expérience numérique qui honore votre vision tout en
            répondant aux attentes d'une audience connectée.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ y: -5, scale: 1.01 }}
              className="bg-card/80 backdrop-blur-sm border border-border hover:border-primary/50 rounded-2xl p-6 shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-primary-glow text-white shadow-divine">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground">
                  {feature.title}
                </h3>
              </div>
              <p className="text-muted-foreground mb-4 leading-relaxed">{feature.description}</p>
              <ul className="space-y-2 text-sm text-foreground/80">
                {feature.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DigitalFeatures;
