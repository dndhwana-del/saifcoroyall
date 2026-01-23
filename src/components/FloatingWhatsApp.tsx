import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const FloatingWhatsApp = () => {
  const whatsappNumber = "+971528218452"; // Placeholder - update with actual number
  const message = encodeURIComponent("Hello, I'm interested in your luxury properties.");
  const whatsappLink = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${message}`;

  return (
    <motion.a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact us on WhatsApp for luxury property inquiries"
      className="fixed bottom-6 right-4 md:bottom-8 md:right-8 z-[100] group"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Pulse Ring Animation */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gold/30"
        animate={{
          scale: [1, 1.4, 1.4],
          opacity: [0.6, 0, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeOut",
        }}
      />
      
      {/* Secondary Pulse */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gold/20"
        animate={{
          scale: [1, 1.6, 1.6],
          opacity: [0.4, 0, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeOut",
          delay: 0.3,
        }}
      />

      {/* Main Button */}
      <div
        className="relative w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-lg transition-all duration-300"
        style={{
          background: 'linear-gradient(135deg, hsl(45, 65%, 70%) 0%, hsl(42, 55%, 55%) 50%, hsl(38, 60%, 45%) 100%)',
          boxShadow: '0 4px 20px hsla(42, 55%, 40%, 0.5), 0 8px 40px hsla(42, 55%, 50%, 0.3)',
        }}
      >
        {/* WhatsApp Icon */}
        <svg 
          viewBox="0 0 24 24" 
          className="w-7 h-7 md:w-8 md:h-8 text-espresso fill-current"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>

        {/* Hover Tooltip */}
        <motion.div
          className="absolute right-full mr-3 px-3 py-2 bg-espresso text-sand text-sm font-body rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none hidden md:block"
          style={{
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          }}
        >
          Chat with us
          {/* Arrow */}
          <div 
            className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-espresso rotate-45"
          />
        </motion.div>
      </div>
    </motion.a>
  );
};

export default FloatingWhatsApp;
