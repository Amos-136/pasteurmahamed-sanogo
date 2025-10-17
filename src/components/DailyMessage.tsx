import { motion } from "framer-motion";
import { BookOpen, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";

interface Verse {
  text: string;
  reference: string;
  reflection: string;
}

const verses: Verse[] = [
  {
    text: "Car je connais les projets que j'ai formés sur vous, dit l'Éternel, projets de paix et non de malheur, afin de vous donner un avenir et de l'espérance.",
    reference: "Jérémie 29:11",
    reflection: "Dieu a un plan parfait pour votre vie. Faites-Lui confiance aujourd'hui.",
  },
  {
    text: "Je puis tout par celui qui me fortifie.",
    reference: "Philippiens 4:13",
    reflection: "La force de Christ en vous est suffisante pour tout accomplir selon Sa volonté.",
  },
  {
    text: "L'Éternel est ma lumière et mon salut : de qui aurais-je peur ? L'Éternel est le soutien de ma vie : de qui aurais-je de la crainte ?",
    reference: "Psaume 27:1",
    reflection: "Marchez dans la confiance aujourd'hui, car le Seigneur est avec vous.",
  },
  {
    text: "Cherchez premièrement le royaume et la justice de Dieu ; et toutes ces choses vous seront données par-dessus.",
    reference: "Matthieu 6:33",
    reflection: "Faites du Royaume de Dieu votre priorité, et Il prendra soin de tout le reste.",
  },
  {
    text: "Confie-toi en l'Éternel de tout ton cœur, et ne t'appuie pas sur ta sagesse ; reconnais-le dans toutes tes voies, et il aplanira tes sentiers.",
    reference: "Proverbes 3:5-6",
    reflection: "Abandonnez vos propres plans et laissez Dieu diriger votre chemin.",
  },
];

const DailyMessage = () => {
  const [currentVerse, setCurrentVerse] = useState<Verse>(verses[0]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    // Get verse based on day of year
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    setCurrentVerse(verses[dayOfYear % verses.length]);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    const randomIndex = Math.floor(Math.random() * verses.length);
    setTimeout(() => {
      setCurrentVerse(verses[randomIndex]);
      setIsRefreshing(false);
    }, 500);
  };

  return (
    <section className="py-24 bg-gradient-to-br from-primary/5 via-background to-secondary/5 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-card/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-border">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                  Message du Jour
                </h2>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors"
              >
                <RefreshCw className={`w-5 h-5 text-primary ${isRefreshing ? 'animate-spin' : ''}`} />
              </motion.button>
            </div>

            <motion.div
              key={currentVerse.reference}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <blockquote className="text-xl md:text-2xl font-medium text-foreground leading-relaxed italic border-l-4 border-primary pl-6">
                "{currentVerse.text}"
              </blockquote>

              <p className="text-primary font-bold text-lg">
                — {currentVerse.reference}
              </p>

              <div className="bg-secondary/20 rounded-xl p-6 mt-6">
                <p className="text-muted-foreground leading-relaxed">
                  <span className="font-bold text-foreground">Réflexion : </span>
                  {currentVerse.reflection}
                </p>
              </div>
            </motion.div>

            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground text-center">
                Que cette Parole vous inspire et vous fortifie tout au long de cette journée
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DailyMessage;
