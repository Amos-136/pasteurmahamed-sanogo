import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Le nom est requis").max(100, "Le nom ne peut pas dépasser 100 caractères"),
  email: z.string().trim().email("Adresse email invalide").max(255, "L'email ne peut pas dépasser 255 caractères"),
  phone: z.string().trim().max(20, "Le numéro ne peut pas dépasser 20 caractères").optional(),
  message: z.string().trim().min(1, "Le message est requis").max(1000, "Le message ne peut pas dépasser 1000 caractères"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
  const { toast } = useToast();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([
          {
            name: data.name,
            email: data.email,
            phone: data.phone || null,
            message: data.message,
          },
        ]);

      if (error) throw error;

      // Send confirmation email
      const { error: emailError } = await supabase.functions.invoke(
        "send-thank-you-email",
        {
          body: { 
            name: data.name, 
            email: data.email, 
            type: "contact" 
          },
        }
      );

      if (emailError) {
        console.error("Email error:", emailError);
      }

      toast({
        title: "Message envoyé !",
        description: "Nous vous répondrons dans les plus brefs délais. Vérifiez vos emails !",
      });

      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  };

  const contactInfo = [
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Adresse",
      details: ["Cocody 2 Plateaux-Vallons", "Abidjan, Côte d'Ivoire"]
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Téléphone",
      details: ["+225 01 02 02 53 09"]
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      details: ["info@vasesdhonneur.org", "digital@vasesdhonneur.info"]
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Horaires des cultes",
      details: ["Dimanche: 9h - 12h", "Mercredi: 18h - 20h"]
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background to-accent">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Contact Info */}
          <div>
            <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
              Contactez-nous
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Venez nous{" "}
              <span className="text-gradient-royal">rencontrer</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-12">
              Nous serions ravis de vous accueillir dans notre communauté. 
              N'hésitez pas à nous contacter pour toute question.
            </p>

            <div className="space-y-8">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-gradient-divine flex items-center justify-center text-white shadow-divine">
                    {info.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      {info.title}
                    </h3>
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-muted-foreground">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Quick Contact Form */}
          <div className="bg-card rounded-3xl p-8 md:p-12 border border-border shadow-royal">
            <h3 className="font-display text-2xl font-bold text-foreground mb-6">
              Envoyez-nous un message
            </h3>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Nom complet
                </label>
                <input
                  {...register("name")}
                  id="name"
                  className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-destructive' : 'border-input'} bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all`}
                  placeholder="Votre nom"
                />
                {errors.name && (
                  <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <input
                  {...register("email")}
                  type="email"
                  id="email"
                  className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-destructive' : 'border-input'} bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all`}
                  placeholder="votre@email.com"
                />
                {errors.email && (
                  <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                  Téléphone
                </label>
                <input
                  {...register("phone")}
                  type="tel"
                  id="phone"
                  className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? 'border-destructive' : 'border-input'} bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all`}
                  placeholder="+225 XX XX XX XX XX"
                />
                {errors.phone && (
                  <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <textarea
                  {...register("message")}
                  id="message"
                  rows={4}
                  className={`w-full px-4 py-3 rounded-xl border ${errors.message ? 'border-destructive' : 'border-input'} bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none`}
                  placeholder="Partagez votre message..."
                />
                {errors.message && (
                  <p className="text-sm text-destructive mt-1">{errors.message.message}</p>
                )}
              </div>

              <Button 
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full bg-gradient-royal text-white shadow-royal hover:shadow-glow transition-all duration-300 text-lg py-6 rounded-xl"
              >
                {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
              </Button>
            </form>
          </div>
        </div>

        {/* Interactive Map */}
        <div className="mt-16 rounded-3xl overflow-hidden border border-border shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15888.731770371984!2d-3.9945481024467564!3d5.389066613437968!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfc1eb553c7e36d1%3A0x1c9994c7e7fe3412!2sEglise%20VASES%20D'HONNEUR%20-%20Centre%20Kodesh!5e0!3m2!1sfr!2sci!4v1760522785262!5m2!1sfr!2sci"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Localisation de l'Église Vases d'Honneur - Centre Kodesh, Cocody 2 Plateaux-Vallons, Abidjan"
            className="w-full"
          ></iframe>
          <div className="bg-card p-6 border-t border-border">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-gradient-divine flex items-center justify-center text-white shadow-divine">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  Notre Emplacement
                </h3>
                <p className="text-muted-foreground mb-1">
                  Cocody 2 Plateaux-Vallons
                </p>
                <p className="text-muted-foreground mb-3">
                  Non loin de l'école ESIT, Abidjan, Côte d'Ivoire
                </p>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Église+Vases+d'Honneur+Cocody+2+Plateaux+Vallons+Abidjan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:text-primary-hover font-medium transition-colors"
                >
                  Ouvrir dans Google Maps
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
