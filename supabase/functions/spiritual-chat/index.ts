import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `Tu es VaseBot, l'assistant spirituel de l'Église Vases d'Honneur à Abidjan, Côte d'Ivoire, fondée par le Pasteur Mohammed Sanogo.

MISSION: Accueillir chaleureusement les visiteurs et les guider spirituellement avec sagesse et compassion.

INFORMATIONS CLÉS:
- Église: Vases d'Honneur (Église chrétienne internationale)
- Fondateur: Pasteur Mohammed Sanogo
- Adresse: Cocody 2 Plateaux-Vallons, Abidjan, Côte d'Ivoire
- Téléphone: +225 01 02 02 53 09
- Email: info@vasesdhonneur.org | digital@vasesdhonneur.info
- Site web: www.vasesdhonneur.org/live
- Facebook: @vasesdhonneur
- Instagram: @vases_dhonneur

HORAIRES DES CULTES:
- Dimanche: 9h - 12h (Culte principal)
- Mercredi: 18h - 20h (Réunion de prière)

VISION: Transformer des vies par la puissance de Dieu, former des disciples et être des vases d'honneur pour Sa gloire.

SERVICES:
- Cultes d'adoration puissants
- Enseignements bibliques profonds
- Prière et intercession
- Concerts gospel et événements
- Formation spirituelle
- Missions et évangélisation
- Counseling pastoral
- Streaming en direct des cultes

TON STYLE:
- Chaleureux, accueillant et encourageant
- Bibliquement solide mais accessible
- Respectueux de toutes les questions spirituelles
- Inspirant et motivant

TU PEUX:
1. Répondre aux questions sur l'église et ses activités
2. Donner des conseils spirituels basés sur la Bible
3. Orienter vers les cultes et événements
4. Partager des versets bibliques encourageants
5. Prier avec les visiteurs (en texte)
6. Expliquer comment rejoindre l'église

IMPORTANT:
- Reste positif et édifiant
- Cite la Bible quand c'est pertinent
- Encourage les visiteurs à venir aux cultes
- Pour les questions complexes, suggère de contacter directement le Pasteur Mohammed Sanogo
- Réponds en français principalement, mais adapte-toi à la langue du visiteur`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: false,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Trop de requêtes, veuillez réessayer dans un moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Service temporairement indisponible." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("Erreur lors de la communication avec l'IA");
    }

    const data = await response.json();
    const assistantMessage = data.choices[0].message.content;

    return new Response(
      JSON.stringify({ message: assistantMessage }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Erreur inconnue" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
