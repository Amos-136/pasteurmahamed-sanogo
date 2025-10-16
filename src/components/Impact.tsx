import { motion } from "framer-motion";
import { Globe2, Heart, MapPin, Users } from "lucide-react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const impactStats = [
  {
    icon: Users,
    value: 2000,
    suffix: "+",
    label: "Membres actifs",
    description: "Une communauté vibrante et engagée",
  },
  {
    icon: MapPin,
    value: 15,
    suffix: "",
    label: "Pays touchés",
    description: "Impact à travers le monde",
  },
  {
    icon: Heart,
    value: 5000,
    suffix: "+",
    label: "Vies transformées",
    description: "Témoignages de transformation",
  },
  {
    icon: Globe2,
    value: 8,
    suffix: "",
    label: "Branches internationales",
    description: "Présence mondiale",
  },
];

const missions = [
  {
    title: "Mission Évangélisation",
    description: "Apporter l'évangile dans les zones rurales et urbaines",
    impact: "3 500 âmes gagnées en 2023",
  },
  {
    title: "Programme Humanitaire",
    description: "Soutien aux communautés défavorisées",
    impact: "1 200 familles assistées",
  },
  {
    title: "Formation Leadership",
    description: "Former la prochaine génération de leaders spirituels",
    impact: "500+ leaders formés",
  },
  {
    title: "Soutien Jeunesse",
    description: "Accompagnement spirituel et social des jeunes",
    impact: "2 000+ jeunes encadrés",
  },
];

const Impact = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-24 bg-gradient-to-b from-background to-secondary/5">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-gradient-divine">
            Notre Impact Mondial
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Des vies transformées, des nations touchées par la grâce de Dieu
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {impactStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-card rounded-2xl p-8 shadow-lg border border-border hover:border-primary/50 transition-all duration-300 text-center group"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-glow mb-4 group-hover:shadow-divine"
              >
                <stat.icon className="w-8 h-8 text-white" />
              </motion.div>
              <div className="text-4xl font-display font-bold text-primary mb-2">
                {inView && (
                  <CountUp
                    end={stat.value}
                    duration={2.5}
                    suffix={stat.suffix}
                  />
                )}
              </div>
              <h3 className="text-lg font-bold mb-2 text-foreground">
                {stat.label}
              </h3>
              <p className="text-sm text-muted-foreground">{stat.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Missions Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="font-display text-3xl font-bold text-center mb-12 text-foreground">
            Nos Missions Actives
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {missions.map((mission, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-card rounded-xl p-6 shadow-lg border border-border hover:border-primary/50 transition-all duration-300"
              >
                <h4 className="text-xl font-bold mb-3 text-primary">
                  {mission.title}
                </h4>
                <p className="text-muted-foreground mb-4">
                  {mission.description}
                </p>
                <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                  {mission.impact}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Impact;
