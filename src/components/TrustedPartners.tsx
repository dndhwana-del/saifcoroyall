import { motion } from "framer-motion";

const partners = [
  { name: "RERA Certified", initials: "RERA" },
  { name: "Forbes Middle East", initials: "FME" },
  { name: "Arabian Business", initials: "AB" },
  { name: "Luxury Lifestyle Awards", initials: "LLA" },
  { name: "Gulf News Property", initials: "GNP" },
];

const TrustedPartners = () => {
  return (
    <section className="relative py-10 bg-cream/50 border-y border-gold/10 overflow-hidden z-20">
      {/* Subtle gold gradient overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, hsla(42, 55%, 58%, 0.03) 50%, transparent 100%)',
        }}
      />
      
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.p
          className="text-center font-body text-xs tracking-[0.35em] uppercase text-gold/70 mb-8"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Trusted By The Elite
        </motion.p>
        
        {/* Partner Logos */}
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              className="flex flex-col items-center gap-2 group cursor-default"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Logo placeholder - elegant monochrome gold badge */}
              <motion.div
                className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center border border-gold/30 bg-gradient-to-br from-gold/5 to-bronze/5 relative overflow-hidden"
                whileHover={{ 
                  scale: 1.05,
                  borderColor: 'hsla(42, 55%, 58%, 0.6)',
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-gold/40" />
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-gold/40" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-gold/40" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-gold/40" />
                
                <span className="font-royal text-lg md:text-xl text-gold/80 tracking-wider">
                  {partner.initials}
                </span>
              </motion.div>
              
              {/* Partner name */}
              <span className="font-body text-[10px] md:text-xs tracking-wider text-muted-foreground/60 text-center max-w-[80px] md:max-w-[100px]">
                {partner.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedPartners;
