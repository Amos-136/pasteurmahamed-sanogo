import { motion } from "framer-motion";
import { Calendar, MapPin, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Program {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string | null;
  image_url: string | null;
  event_type: string;
  is_featured: boolean;
}

const UpcomingPrograms = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const { data, error } = await supabase
        .from("programs")
        .select("*")
        .gte("date", new Date().toISOString())
        .order("date", { ascending: true })
        .limit(6);

      if (error) throw error;
      setPrograms(data || []);
    } catch (error) {
      console.error("Error fetching programs:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les programmes",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "culte":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "conference":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20";
      case "formation":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      default:
        return "bg-primary/10 text-primary border-primary/20";
    }
  };

  const getEventTypeLabel = (type: string) => {
    switch (type) {
      case "culte":
        return "Culte";
      case "conference":
        return "Conférence";
      case "formation":
        return "Formation";
      default:
        return type;
    }
  };

  if (loading) {
    return (
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card rounded-2xl p-6 animate-pulse">
                <div className="h-40 bg-muted rounded-xl mb-4" />
                <div className="h-6 bg-muted rounded mb-2" />
                <div className="h-4 bg-muted rounded w-3/4" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-gradient-divine">
            Programmes à Venir
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Rejoignez-nous pour des moments de gloire et de transformation
          </p>
        </motion.div>

        {programs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center py-12"
          >
            <p className="text-muted-foreground text-lg">
              Aucun programme prévu pour le moment. Restez connectés !
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`bg-card rounded-2xl overflow-hidden shadow-xl border-2 transition-all duration-300 ${
                  program.is_featured
                    ? "border-primary shadow-divine"
                    : "border-border hover:border-primary/50"
                }`}
              >
                {/* Event Type Badge */}
                <div className="relative">
                  {program.image_url ? (
                    <img
                      src={program.image_url}
                      alt={program.title}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      <Calendar className="w-16 h-16 text-primary/40" />
                    </div>
                  )}
                  <div className="absolute top-4 right-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold border ${getEventTypeColor(
                        program.event_type
                      )}`}
                    >
                      {getEventTypeLabel(program.event_type)}
                    </span>
                  </div>
                  {program.is_featured && (
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-primary text-white shadow-lg">
                        ⭐ Événement phare
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-foreground">
                    {program.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {program.description}
                  </p>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground capitalize">
                        {formatDate(program.date)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">
                        {formatTime(program.date)}
                      </span>
                    </div>
                    {program.location && (
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span className="text-muted-foreground">
                          {program.location}
                        </span>
                      </div>
                    )}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full mt-6 bg-gradient-to-r from-primary to-primary-glow text-white py-3 rounded-lg font-medium hover:shadow-divine transition-all"
                  >
                    En savoir plus
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default UpcomingPrograms;
