import { motion } from "framer-motion";
import { Calendar, Cross, Globe, Heart, Users } from "lucide-react";

const timelineEvents = [
  {
    year: "2008",
    title: "Fondation de Vases d'Honneur",
    description: "Le Pasteur Mohammed Sanogo reçoit l'appel divin et fonde l'Église Vases d'Honneur à Abidjan.",
    icon: Cross,
  },
  {
    year: "2012",
    title: "Première Grande Rencontre",
    description: "Organisation du premier rassemblement majeur réunissant des milliers de fidèles.",
    icon: Users,
  },
  {
    year: "2015",
    title: "Expansion internationale",
    description: "Ouverture de branches en France, Belgique et Canada.",
    icon: Globe,
  },
  {
    year: "2018",
    title: "Programme Kodesh",
    description: "Lancement du programme de formation spirituelle Kodesh pour les jeunes leaders.",
    icon: Heart,
  },
  {
    year: "2024",
    title: "Vision 2030",
    description: "Lancement de la vision stratégique pour atteindre 100 000 âmes d'ici 2030.",
    icon: Calendar,
  },
];

const History = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background via-muted/30 to-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-gradient-divine">
            Notre Histoire
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Un parcours de foi, de transformation et d'impact depuis 2008
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary-glow to-primary transform -translate-x-1/2 hidden md:block" />

          {/* Timeline Events */}
          {timelineEvents.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative flex items-center mb-16 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } flex-col`}
            >
              {/* Content */}
              <div
                className={`w-full md:w-5/12 ${
                  index % 2 === 0 ? "md:text-right md:pr-12" : "md:text-left md:pl-12"
                } text-center`}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-card rounded-2xl p-6 shadow-lg border border-border hover:border-primary/50 transition-all duration-300"
                >
                  <div className="text-3xl font-display font-bold text-primary mb-2">
                    {event.year}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">
                    {event.title}
                  </h3>
                  <p className="text-muted-foreground">{event.description}</p>
                </motion.div>
              </div>

              {/* Center Icon */}
              <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center my-4 md:my-0">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                  className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center shadow-divine z-10"
                >
                  <event.icon className="w-8 h-8 text-white" />
                </motion.div>
              </div>

              {/* Spacer */}
              <div className="w-full md:w-5/12" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default History;
