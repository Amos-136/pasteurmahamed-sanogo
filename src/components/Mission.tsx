import pastorImage from "@/assets/pastor-preaching.jpg";

const Mission = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-accent">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-divine opacity-20 blur-3xl rounded-full" />
            <div className="relative rounded-3xl overflow-hidden shadow-royal hover-lift">
              <img
                src={pastorImage}
                alt="Pasteur Mohammed Sanogo"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary-dark/80 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <h3 className="font-display text-3xl font-bold text-white mb-2">
                  Pasteur Mohammed Sanogo
                </h3>
                <p className="text-primary-glow text-lg">
                  Fondateur & Apôtre
                </p>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="space-y-8">
            <div>
              <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
                Notre Mission
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
                Transformer des vies pour la{" "}
                <span className="text-gradient-divine">gloire de Dieu</span>
              </h2>
            </div>

            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                L'Église Vases d'Honneur est née d'une vision divine : façonner des hommes et des femmes 
                qui deviennent des instruments d'honneur entre les mains du Tout-Puissant.
              </p>
              
              <p>
                Sous la direction apostolique du Pasteur Mohammed Sanogo, nous sommes dédiés à la 
                transformation spirituelle, l'excellence dans l'adoration, et l'impact communautaire 
                à travers l'évangile de Jésus-Christ.
              </p>

              <div className="bg-gradient-celestial rounded-2xl p-8 border border-primary/10 mt-8">
                <p className="font-display text-2xl text-secondary-dark italic mb-4">
                  "Dans une grande maison, il n'y a pas seulement des vases d'or et d'argent, 
                  mais aussi de bois et de terre ; les uns pour un usage honorable, les autres pour un usage vil."
                </p>
                <p className="text-primary font-semibold">
                  — 2 Timothée 2:20
                </p>
              </div>
            </div>

            {/* Vision Points */}
            <div className="grid sm:grid-cols-2 gap-6 pt-6">
              <div className="space-y-3">
                <div className="h-12 w-12 rounded-xl bg-gradient-divine flex items-center justify-center shadow-divine">
                  <span className="text-2xl">🙏</span>
                </div>
                <h4 className="font-display text-xl font-semibold text-foreground">
                  Formation Spirituelle
                </h4>
                <p className="text-muted-foreground">
                  Équiper les saints pour l'œuvre du ministère et la maturité en Christ
                </p>
              </div>

              <div className="space-y-3">
                <div className="h-12 w-12 rounded-xl bg-gradient-royal flex items-center justify-center shadow-royal">
                  <span className="text-2xl">🌍</span>
                </div>
                <h4 className="font-display text-xl font-semibold text-foreground">
                  Impact Global
                </h4>
                <p className="text-muted-foreground">
                  Transformer les nations par l'évangile et les œuvres de compassion
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;
