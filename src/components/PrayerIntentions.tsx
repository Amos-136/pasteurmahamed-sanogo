import { motion } from "framer-motion";
import { Heart, Send } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";

const PrayerIntentions = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [intention, setIntention] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!intention || (!isAnonymous && !name)) {
      toast({
        title: "Champs requis",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { error: dbError } = await supabase
        .from("prayer_intentions")
        .insert([
          {
            name: isAnonymous ? "Anonyme" : name,
            email: isAnonymous ? null : email,
            intention,
            is_anonymous: isAnonymous,
          },
        ]);

      if (dbError) throw dbError;

      // Send confirmation email if email provided
      if (email && !isAnonymous) {
        const { error: emailError } = await supabase.functions.invoke(
          "send-thank-you-email",
          {
            body: { name, email, type: "prayer" },
          }
        );

        if (emailError) {
          console.error("Email error:", emailError);
        }
      }

      toast({
        title: "Intention envoyée !",
        description: "Nous prierons pour vous. Dieu vous bénisse !",
      });

      setName("");
      setEmail("");
      setIntention("");
      setIsAnonymous(false);
    } catch (error) {
      console.error("Prayer intention error:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-background to-secondary/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-glow mb-6">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Intentions de Prière
            </h2>
            <p className="text-xl text-muted-foreground">
              Partagez vos besoins de prière avec notre communauté
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-card rounded-2xl p-8 shadow-xl border border-border"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex items-center space-x-2 mb-4">
                <Checkbox
                  id="anonymous"
                  checked={isAnonymous}
                  onCheckedChange={(checked) => setIsAnonymous(checked as boolean)}
                />
                <label
                  htmlFor="anonymous"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Rester anonyme
                </label>
              </div>

              {!isAnonymous && (
                <>
                  <div>
                    <Input
                      type="text"
                      placeholder="Votre nom *"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required={!isAnonymous}
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder="Votre email (optionnel)"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </>
              )}

              <div>
                <Textarea
                  placeholder="Partagez votre intention de prière... *"
                  value={intention}
                  onChange={(e) => setIntention(e.target.value)}
                  rows={6}
                  required
                  className="resize-none"
                />
              </div>

              <div className="bg-secondary/20 rounded-lg p-4">
                <p className="text-sm text-muted-foreground">
                  💙 Vos intentions seront traitées avec confidentialité et respect. Notre équipe d'intercession priera pour vous.
                </p>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-primary to-primary-glow hover:shadow-divine transition-all"
              >
                {loading ? (
                  "Envoi en cours..."
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Envoyer mon intention
                  </>
                )}
              </Button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-8 text-center"
          >
            <blockquote className="text-muted-foreground italic">
              "La prière fervente du juste a une grande efficacité"
              <br />
              <span className="text-sm text-primary">- Jacques 5:16</span>
            </blockquote>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default PrayerIntentions;
