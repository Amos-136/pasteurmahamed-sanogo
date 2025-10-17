import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !name) {
      toast({
        title: "Champs requis",
        description: "Veuillez remplir tous les champs",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Insert into database
      const { error: dbError } = await supabase
        .from("newsletter_subscribers")
        .insert([{ email, name }]);

      if (dbError) {
        if (dbError.code === "23505") {
          toast({
            title: "Déjà inscrit",
            description: "Cette adresse email est déjà inscrite à notre newsletter",
            variant: "destructive",
          });
          return;
        }
        throw dbError;
      }

      // Send confirmation email
      const { error: emailError } = await supabase.functions.invoke(
        "send-thank-you-email",
        {
          body: { name, email, type: "newsletter" },
        }
      );

      if (emailError) {
        console.error("Email error:", emailError);
      }

      toast({
        title: "Inscription réussie !",
        description: "Vous recevrez bientôt nos actualités. Vérifiez vos emails !",
      });

      setEmail("");
      setName("");
    } catch (error) {
      console.error("Newsletter error:", error);
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
    <section className="py-24 bg-gradient-to-br from-primary/10 via-background to-secondary/10 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-glow mb-6">
            <Mail className="w-8 h-8 text-white" />
          </div>

          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Restez Connecté(e)
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Recevez nos enseignements, actualités et programmes directement dans votre boîte mail
          </p>

          <motion.form
            onSubmit={handleSubmit}
            className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-border"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="space-y-4 mb-6">
              <Input
                type="text"
                placeholder="Votre nom"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full"
                required
              />
              <Input
                type="email"
                placeholder="Votre adresse email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary to-primary-glow hover:shadow-divine transition-all"
            >
              {loading ? (
                "Inscription en cours..."
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  S'inscrire à la Newsletter
                </>
              )}
            </Button>

            <p className="text-xs text-muted-foreground mt-4">
              En vous inscrivant, vous acceptez de recevoir nos communications. Vous pouvez vous désinscrire à tout moment.
            </p>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
