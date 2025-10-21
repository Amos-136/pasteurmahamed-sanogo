import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const newsletterSchema = z.object({
  name: z.string().trim().min(1, "Le nom est requis").max(100, "Le nom ne peut pas dépasser 100 caractères"),
  email: z.string().trim().email("Adresse email invalide").max(255, "L'email ne peut pas dépasser 255 caractères"),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

const Newsletter = () => {
  const { toast } = useToast();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = async (data: NewsletterFormData) => {
    try {
      // Insert into database
      const { error: dbError } = await supabase
        .from("newsletter_subscribers")
        .insert([{ email: data.email, name: data.name }]);

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
          body: { name: data.name, email: data.email, type: "newsletter" },
        }
      );

      if (emailError) {
        console.error("Email error:", emailError);
      }

      toast({
        title: "Inscription réussie !",
        description: "Vous recevrez bientôt nos actualités. Vérifiez vos emails !",
      });

      reset();
    } catch (error) {
      console.error("Newsletter error:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
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
            onSubmit={handleSubmit(onSubmit)}
            className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-border"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="space-y-4 mb-6">
              <div>
                <Input
                  {...register("name")}
                  type="text"
                  placeholder="Votre nom"
                  className={errors.name ? "border-destructive" : ""}
                />
                {errors.name && (
                  <p className="text-sm text-destructive mt-1 text-left">{errors.name.message}</p>
                )}
              </div>
              <div>
                <Input
                  {...register("email")}
                  type="email"
                  placeholder="Votre adresse email"
                  className={errors.email ? "border-destructive" : ""}
                />
                {errors.email && (
                  <p className="text-sm text-destructive mt-1 text-left">{errors.email.message}</p>
                )}
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-primary to-primary-glow hover:shadow-divine transition-all"
            >
              {isSubmitting ? (
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