import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  name: string;
  email: string;
  type: "contact" | "newsletter" | "prayer" | "testimony";
}

// Validation functions
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 255;
};

const isValidName = (name: string): boolean => {
  return name.trim().length > 0 && name.length <= 100;
};

const isValidType = (type: string): boolean => {
  return ['contact', 'newsletter', 'prayer', 'testimony'].includes(type);
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { name, email, type } = body as EmailRequest;

    // Validation
    if (!name || !email || !type) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: name, email, type" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    if (!isValidName(name)) {
      return new Response(
        JSON.stringify({ error: "Invalid name (max 100 characters)" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    if (!isValidEmail(email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email format or too long (max 255 characters)" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    if (!isValidType(type)) {
      return new Response(
        JSON.stringify({ error: "Invalid type. Must be one of: contact, newsletter, prayer, testimony" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Sanitize inputs
    const sanitizedName = name.trim();
    const sanitizedEmail = email.trim().toLowerCase();

    console.log(`Sending ${type} email to ${sanitizedEmail}`);

    let subject = "";
    let html = "";

    switch (type) {
      case "contact":
        subject = "Merci pour votre message - Vases d'Honneur";
        html = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #D4AF37 0%, #F4E4C1 100%); padding: 30px; text-align: center;">
              <h1 style="color: white; margin: 0;">Vases d'Honneur</h1>
              <p style="color: white; margin: 10px 0 0 0;">Église Internationale</p>
            </div>
            <div style="padding: 30px; background-color: #ffffff;">
              <h2 style="color: #333;">Cher(e) ${sanitizedName},</h2>
              <p style="color: #666; line-height: 1.6;">
                Nous avons bien reçu votre message et vous en remercions sincèrement.
              </p>
              <p style="color: #666; line-height: 1.6;">
                Notre équipe reviendra vers vous dans les plus brefs délais.
              </p>
              <p style="color: #666; line-height: 1.6;">
                Que Dieu vous bénisse abondamment !
              </p>
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                <p style="color: #999; font-size: 12px; text-align: center;">
                  Pasteur Mohammed Sanogo<br>
                  Cocody 2 Plateaux-Vallons, Abidjan<br>
                  +225 0102025309<br>
                  www.vasesdhonneur.org
                </p>
              </div>
            </div>
          </div>
        `;
        break;

      case "newsletter":
        subject = "Bienvenue dans notre communauté - Vases d'Honneur";
        html = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #D4AF37 0%, #F4E4C1 100%); padding: 30px; text-align: center;">
              <h1 style="color: white; margin: 0;">Bienvenue !</h1>
            </div>
            <div style="padding: 30px; background-color: #ffffff;">
              <h2 style="color: #333;">Cher(e) ${sanitizedName},</h2>
              <p style="color: #666; line-height: 1.6;">
                Merci de vous être inscrit(e) à notre newsletter ! Vous recevrez désormais :
              </p>
              <ul style="color: #666; line-height: 1.8;">
                <li>Les dernières nouvelles de l'église</li>
                <li>Les programmes et événements à venir</li>
                <li>Des enseignements inspirants</li>
                <li>Des témoignages de transformation</li>
              </ul>
              <p style="color: #666; line-height: 1.6;">
                Que la grâce et la paix de Dieu soient avec vous !
              </p>
            </div>
          </div>
        `;
        break;

      case "prayer":
        subject = "Votre intention de prière - Vases d'Honneur";
        html = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #D4AF37 0%, #F4E4C1 100%); padding: 30px; text-align: center;">
              <h1 style="color: white; margin: 0;">🙏 Prière</h1>
            </div>
            <div style="padding: 30px; background-color: #ffffff;">
              <h2 style="color: #333;">Cher(e) ${sanitizedName},</h2>
              <p style="color: #666; line-height: 1.6;">
                Merci d'avoir partagé votre intention de prière avec nous.
              </p>
              <p style="color: #666; line-height: 1.6;">
                Notre équipe d'intercession priera pour vous. Dieu vous entend et Il agit en votre faveur.
              </p>
              <blockquote style="border-left: 4px solid #D4AF37; padding-left: 20px; margin: 20px 0; color: #666; font-style: italic;">
                "Ne vous inquiétez de rien ; mais en toute chose faites connaître vos besoins à Dieu par des prières et des supplications, avec des actions de grâces."<br>
                <small>- Philippiens 4:6</small>
              </blockquote>
            </div>
          </div>
        `;
        break;

      case "testimony":
        subject = "Merci pour votre témoignage - Vases d'Honneur";
        html = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #D4AF37 0%, #F4E4C1 100%); padding: 30px; text-align: center;">
              <h1 style="color: white; margin: 0;">✨ Témoignage</h1>
            </div>
            <div style="padding: 30px; background-color: #ffffff;">
              <h2 style="color: #333;">Cher(e) ${sanitizedName},</h2>
              <p style="color: #666; line-height: 1.6;">
                Merci d'avoir partagé votre témoignage avec nous !
              </p>
              <p style="color: #666; line-height: 1.6;">
                Votre histoire inspirera d'autres personnes et glorifiera Dieu. Nous examinerons votre témoignage et vous contacterons prochainement.
              </p>
              <p style="color: #666; line-height: 1.6;">
                Que Dieu continue de vous bénir et de vous utiliser pour Sa gloire !
              </p>
            </div>
          </div>
        `;
        break;
    }

    const emailResponse = await resend.emails.send({
      from: "Vases d'Honneur <onboarding@resend.dev>",
      to: [sanitizedEmail],
      subject: subject,
      html: html,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-thank-you-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
