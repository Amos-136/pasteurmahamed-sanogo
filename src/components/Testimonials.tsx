import { motion } from "framer-motion";
import { Quote, Play } from "lucide-react";
import { useState } from "react";

const testimonials = [
  {
    name: "Marie K.",
    role: "Membre depuis 2020",
    testimony: "Ma vie a été complètement transformée. J'ai trouvé ma destinée et ma place dans le corps de Christ.",
    image: "/placeholder.svg",
    videoUrl: null,
    audioUrl: null,
  },
  {
    name: "Jean-Paul M.",
    role: "Leader de cellule",
    testimony: "Les enseignements du Pasteur Mohammed m'ont permis de devenir le leader que Dieu voulait que je sois.",
    image: "/placeholder.svg",
    videoUrl: null,
    audioUrl: null,
  },
  {
    name: "Esther D.",
    role: "Membre depuis 2018",
    testimony: "Vases d'Honneur est bien plus qu'une église, c'est une famille qui m'a accueillie et aidée à grandir spirituellement.",
    image: "/placeholder.svg",
    videoUrl: null,
    audioUrl: null,
  },
];

const Testimonials = () => {
  const [selectedTestimony, setSelectedTestimony] = useState<number | null>(null);

  return (
    <section className="py-24 bg-gradient-to-b from-secondary/5 to-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-gradient-divine">
            Témoignages
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Des vies transformées par la grâce de Dieu
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimony, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-card rounded-2xl p-8 shadow-xl border border-border hover:border-primary/50 transition-all duration-300 relative overflow-hidden group"
            >
              {/* Decorative gradient */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500" />
              
              <div className="relative">
                <Quote className="w-10 h-10 text-primary/30 mb-4" />
                
                <p className="text-muted-foreground mb-6 italic leading-relaxed">
                  "{testimony.testimony}"
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center text-white font-bold text-lg">
                    {testimony.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">{testimony.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimony.role}</p>
                  </div>
                </div>

                {(testimony.videoUrl || testimony.audioUrl) && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedTestimony(index)}
                    className="mt-6 w-full flex items-center justify-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary px-4 py-3 rounded-lg transition-colors"
                  >
                    <Play className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {testimony.videoUrl ? "Voir la vidéo" : "Écouter le témoignage"}
                    </span>
                  </motion.button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-glow transition-colors font-medium"
          >
            Partagez votre témoignage
            <span className="text-xl">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
