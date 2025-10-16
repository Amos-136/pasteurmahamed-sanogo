import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const phoneNumber = "2250102025309"; // Format international sans le +
  const message = encodeURIComponent("Bonjour, je souhaite obtenir plus d'informations sur l'Église Vases d'Honneur.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
      aria-label="Contactez-nous sur WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
      <span className="absolute right-full mr-3 px-3 py-2 bg-card text-foreground rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap text-sm font-medium border border-border">
        Contactez-nous sur WhatsApp
      </span>
    </a>
  );
};

export default WhatsAppButton;
