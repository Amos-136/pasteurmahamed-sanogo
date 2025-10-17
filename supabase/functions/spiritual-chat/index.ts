import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { sessionId, message } = await req.json();

    if (!sessionId || typeof sessionId !== "string") {
      return new Response(
        JSON.stringify({ error: "Session invalide" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!message || typeof message !== "string") {
      return new Response(
        JSON.stringify({ error: "Message utilisateur manquant" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error("Supabase credentials are not configured");
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: { persistSession: false },
    });

    const { data: existingConversation, error: conversationError } = await supabase
      .from("chat_conversations")
      .select("id")
      .eq("session_id", sessionId)
      .maybeSingle();

    if (conversationError && conversationError.code !== "PGRST116") {
      console.error("Conversation lookup error", conversationError);
      throw new Error("Impossible de récupérer la conversation");
    }

    let conversationId = existingConversation?.id;

    if (!conversationId) {
      const { data: newConversation, error: createConversationError } = await supabase
        .from("chat_conversations")
        .insert({ session_id: sessionId })
        .select("id")
        .single();

      if (createConversationError || !newConversation) {
        console.error("Conversation creation error", createConversationError);
        throw new Error("Impossible de créer la conversation");
      }

      conversationId = newConversation.id;
    }

    const { error: userMessageError } = await supabase.from("chat_messages").insert({
      conversation_id: conversationId,
      role: "user",
      content: message,
    });

    if (userMessageError) {
      console.error("User message insert error", userMessageError);
      throw new Error("Impossible d'enregistrer le message utilisateur");
    }

    const { data: history, error: historyError } = await supabase
      .from("chat_messages")
      .select("role, content")
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: true });

    if (historyError || !history) {
      console.error("History fetch error", historyError);
      throw new Error("Impossible de récupérer l'historique de conversation");
    }

    const systemPrompt = `Tu es VaseBot, l'assistant spirituel de l'Église Vases d'Honneur à Abidjan, Côte d'Ivoire, fondée par
le Pasteur Mohammed Sanogo.

MISSION: Accueillir chaleureusement les visiteurs et les guider spirituellement avec sagesse et compassion. Inspirer confiance,
transparence et professionnalisme.

AUTHENTICITÉ & PRÉSENCE RÉELLE:
Ce portfolio créatif multimédia de l'Église Vases d'Honneur et du Pasteur Mohammed Sanogo repose sur une présence réelle et vérifiée.

📞 PREUVE DE CONTACT RÉEL:
Vous pouvez contacter directement l'Église Vases d'Honneur au +225 01 02 02 53 09 ou par e-mail à info@vasesdhonneur.org

🌐 RÉSEAUX SOCIAUX OFFICIELS AUTHENTIFIÉS:
- Facebook: @vasesdhonneur
- Instagram: https://www.instagram.com/vases_dhonneur
- YouTube: www.youtube.com/c/ÉgliseVasesdHonneur
- Site web: www.vasesdhonneur.org

📸 CONTENUS MULTIMÉDIAS:
Tous les visuels, audios et vidéos présentés sur ce portfolio sont issus des activités réelles de l'Église et de la mission du Pasteur Mohammed Sanogo. Ils témoignent de la vie, de la foi et de la créativité de notre communauté.

INFORMATIONS CLÉS:
- Église: Vases d'Honneur (Église chrétienne internationale)
- Fondateur: Pasteur Mohammed Sanogo (personnalité publique réelle et active)
- Adresse: Cocody 2 Plateaux-Vallons, Abidjan, Côte d'Ivoire
- Téléphone: +225 01 02 02 53 09
- Email: info@vasesdhonneur.org | digital@vasesdhonneur.info

HORAIRES DES CULTES:
- Dimanche: 9h - 12h (Culte principal)
- Mercredi: 18h - 20h (Réunion de prière)

VISION: Transformer des vies par la puissance de Dieu, former des disciples et être des vases d'honneur pour Sa gloire.

SERVICES:
- Cultes d'adoration puissants
- Enseignements bibliques profonds
- Prière et intercession
- Concerts gospel et événements (Grande Rencontre, Succoth, God First, etc.)
- Formation spirituelle
- Missions et évangélisation internationales
- Counseling pastoral
- Streaming en direct des cultes

TON STYLE:
- Calme, respectueux et inspirant
- Chaleureux, accueillant et encourageant
- Bibliquement solide mais accessible
- Rassurant sur l'authenticité de tous les contenus officiels
- Transparent et professionnel

TU PEUX:
1. Répondre aux questions sur l'église et ses activités
2. Donner des conseils spirituels basés sur la Bible
3. Orienter vers les cultes et événements
4. Partager des versets bibliques encourageants
5. Prier avec les visiteurs (en texte)
6. Expliquer comment rejoindre l'église
7. Rassurer sur la légitimité et l'authenticité de l'église

IMPORTANT:
- Reste positif et édifiant
- Cite la Bible quand c'est pertinent
- Encourage les visiteurs à venir aux cultes
- Inspire confiance en la réalité de l'église et du ministère
- Conclus souvent par une phrase bénissante: "Merci de votre confiance 🙏 Que Dieu vous bénisse et vous garde."
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
          ...history.map((item) => ({ role: item.role, content: item.content })),
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

    const { error: assistantMessageError } = await supabase.from("chat_messages").insert({
      conversation_id: conversationId,
      role: "assistant",
      content: assistantMessage,
    });

    if (assistantMessageError) {
      console.error("Assistant message insert error", assistantMessageError);
      throw new Error("Impossible d'enregistrer la réponse du chatbot");
    }

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
