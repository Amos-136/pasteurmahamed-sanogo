import { motion } from "framer-motion";
import { Heart, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";

const prayerSchema = z.object({
  name: z.string().trim().min(1, "Le nom est requis").max(100, "Le nom ne peut pas dépasser 100 caractères"),
  email: z.string().trim().email("Adresse email invalide").max(255, "L'email ne peut pas dépasser 255 caractères").optional().or(z.literal('')),
  intention: z.string().trim().min(1, "L'intention est requise").max(1000, "L'intention ne peut pas dépasser 1000 caractères"),
  is_anonymous: z.boolean().default(false),
});

type PrayerFormData = z.infer<typeof prayerSchema>;

const PrayerIntentions = () => {
  const { toast } = useToast();
  const { register, handleSubmit, reset, watch, setValue, formState: { errors, isSubmitting } } = useForm<PrayerFormData>({
    resolver: zodResolver(prayerSchema),
    defaultValues: {
      is_anonymous: false,
    }
  });
  const isAnonymous = watch("is_anonymous");

  const onSubmit = async (data: PrayerFormData) => {
    try {
      const { error: dbError } = await supabase
        .from("prayer_intentions")
        .insert([
          {
            name: data.is_anonymous ? "Anonyme" : data.name,
            email: data.is_anonymous ? null : (data.email || null),
            intention: data.intention,
            is_anonymous: data.is_anonymous,
          },
        ]);

      if (dbError) throw dbError;

      // Send confirmation email if email provided
      if (data.email && !data.is_anonymous) {
        const { error: emailError } = await supabase.functions.invoke(
          "send-thank-you-email",
          {
            body: { name: data.name, email: data.email, type: "prayer" },
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

      reset();
    } catch (error) {
      console.error("Prayer intention error:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
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
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex items-center space-x-2 mb-4">
                <Checkbox
                  id="anonymous"
                  checked={isAnonymous}
                  onCheckedChange={(checked) => setValue("is_anonymous", checked as boolean)}
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
                      {...register("name")}
                      type="text"
                      placeholder="Votre nom *"
                      className={errors.name ? "border-destructive" : ""}
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <Input
                      {...register("email")}
                      type="email"
                      placeholder="Votre email (optionnel)"
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </>
              )}

              <div>
                <Textarea
                  {...register("intention")}
                  placeholder="Partagez votre intention de prière... *"
                  rows={6}
                  className={`resize-none ${errors.intention ? "border-destructive" : ""}`}
                />
                {errors.intention && (
                  <p className="text-sm text-destructive mt-1">{errors.intention.message}</p>
                )}
              </div>

              <div className="bg-secondary/20 rounded-lg p-4">
                <p className="text-sm text-muted-foreground">
                  💙 Vos intentions seront traitées avec confidentialité et respect. Notre équipe d'intercession priera pour vous.
                </p>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-primary to-primary-glow hover:shadow-divine transition-all"
              >
                {isSubmitting ? (
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