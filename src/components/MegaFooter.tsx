import { motion } from "framer-motion";
import { MapPin, Phone, Instagram, Facebook, Twitter, Linkedin } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import CalligraphyAccent from "./CalligraphyAccent";
import { useToast } from "@/hooks/use-toast";
import saifcoLogo from "@/assets/saifco-logo.jpg";
const emailSchema = z.string().email("Please enter a valid email address");
const MegaFooter = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const {
    toast
  } = useToast();
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (emailError) {
      setEmailError(null);
    }
  };
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      setEmailError(result.error.errors[0].message);
      return;
    }
    toast({
      title: "Thank you for subscribing",
      description: "You'll receive exclusive property previews soon."
    });
    setEmail("");
    setEmailError(null);
  };
  const offices = [{
    city: "Dubai",
    address: "Emirates Towers, DIFC"
  }, {
    city: "Riyadh",
    address: "Kingdom Centre, Olaya"
  }, {
    city: "London",
    address: "One Hyde Park, Knightsbridge"
  }];
  const quickLinks = [{
    label: "Our Heritage",
    href: "#heritage"
  }, {
    label: "Royal Collection",
    href: "#collection"
  }, {
    label: "Off-Plan Estates",
    href: "#"
  }, {
    label: "Private Viewings",
    href: "#"
  }, {
    label: "Press & Media",
    href: "#"
  }];
  const socialLinks = [{
    icon: Instagram,
    href: "#",
    label: "Instagram"
  }, {
    icon: Facebook,
    href: "#",
    label: "Facebook"
  }, {
    icon: Twitter,
    href: "#",
    label: "Twitter"
  }, {
    icon: Linkedin,
    href: "#",
    label: "LinkedIn"
  }];
  return <footer className="relative bg-espresso text-sand overflow-hidden">
      {/* Islamic Geometric Pattern Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30z M30 10L50 30L30 50L10 30z M30 20L40 30L30 40L20 30z' fill='%23CCA35A' fill-opacity='1'/%3E%3C/svg%3E")`,
      backgroundSize: '60px 60px'
    }} />

      {/* Massive Watermark */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
        <span className="font-royal text-[20vw] tracking-[0.3em] uppercase whitespace-nowrap opacity-[0.05]" style={{
        color: 'hsl(42, 55%, 58%)',
        textShadow: '0 0 100px hsla(42, 55%, 58%, 0.4)'
      }}>
          ROYAL GULF
        </span>
      </div>

      {/* Glowing Gold Top Separator with Diamond/Star */}
      <div className="absolute top-0 left-0 right-0 h-px">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold to-transparent opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold to-transparent opacity-50 blur-sm" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold to-transparent opacity-30 blur-md" />
        {/* Central Star/Diamond Accent */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-2">
          <div className="relative">
            {/* Outer glow */}
            <div className="absolute inset-0 w-4 h-4 rotate-45" style={{
            background: 'radial-gradient(circle, hsla(42, 55%, 58%, 0.6) 0%, transparent 70%)',
            filter: 'blur(8px)',
            transform: 'rotate(45deg) scale(2)'
          }} />
            {/* Diamond */}
            <div className="w-4 h-4 rotate-45 border border-gold/80" style={{
            background: 'linear-gradient(135deg, hsl(45, 65%, 75%) 0%, hsl(42, 55%, 55%) 50%, hsl(38, 60%, 45%) 100%)',
            boxShadow: '0 0 20px hsla(42, 55%, 58%, 0.6), 0 0 40px hsla(42, 55%, 58%, 0.3)'
          }} />
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative container mx-auto px-4 md:px-6 py-12 md:py-20 pt-16 md:pt-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Column 1: Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-royal text-lg tracking-[0.25em] text-gold">
                ROYAL GULF
              </span>
            </div>
            <p className="font-display text-sand/70 italic mb-4">
              Defining Luxury Since 1999
            </p>
            <p className="font-body text-sm text-sand/50 leading-relaxed">
              Curators of the Arabian Peninsula's most distinguished residences. 
              Where heritage meets magnificence.
            </p>
          </div>

          {/* Column 2: Office Locations */}
          <div>
            <h4 className="text-lg tracking-[0.25em] mb-6 flex items-center gap-2 uppercase font-serif" style={{
            color: 'hsl(45, 70%, 75%)'
          }}>
              <MapPin size={18} strokeWidth={1.5} className="text-bronze" />
              Global Offices
            </h4>
            <ul className="space-y-4">
              {offices.map(office => <motion.li key={office.city} className="group cursor-pointer" whileHover={{
              x: 5
            }} transition={{
              duration: 0.2
            }}>
                  <span className="font-body text-sand font-medium block transition-all duration-300 group-hover:text-gold" style={{
                textShadow: 'none',
                transition: 'text-shadow 0.3s ease, color 0.3s ease'
              }} onMouseEnter={e => e.currentTarget.style.textShadow = '0 0 15px hsla(42, 55%, 58%, 0.5)'} onMouseLeave={e => e.currentTarget.style.textShadow = 'none'}>
                    {office.city}
                  </span>
                  <span className="font-body text-sm text-sand/50">
                    {office.address}
                  </span>
                </motion.li>)}
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h4 className="text-lg tracking-[0.25em] mb-6 uppercase font-serif" style={{
            color: 'hsl(45, 70%, 75%)'
          }}>
              Explore
            </h4>
            <ul className="space-y-3">
              {quickLinks.map(link => <li key={link.label}>
                  <motion.a href={link.href} className="font-body text-sand/70 inline-block transition-colors duration-300" whileHover={{
                x: 5,
                color: 'hsl(42, 55%, 58%)'
              }} transition={{
                duration: 0.2
              }} style={{
                textShadow: 'none'
              }} onMouseEnter={e => e.currentTarget.style.textShadow = '0 0 12px hsla(42, 55%, 58%, 0.4)'} onMouseLeave={e => e.currentTarget.style.textShadow = 'none'}>
                    {link.label}
                  </motion.a>
                </li>)}
            </ul>
          </div>

          {/* Column 4: Contact & Newsletter */}
          <div>
            <h4 className="text-lg tracking-[0.25em] mb-6 uppercase font-serif" style={{
            color: 'hsl(45, 70%, 75%)'
          }}>
              Private Invitation
            </h4>
            
            {/* Phone Number - Prominent Gold */}
            <motion.a href="tel:+971528218452" className="flex items-center gap-3 mb-6 group" whileHover={{
            x: 5
          }} transition={{
            duration: 0.2
          }}>
              <Phone size={20} strokeWidth={1.5} className="text-gold" />
              <span className="text-xl tracking-wide transition-all duration-300 font-sans text-ring" style={{
              color: 'hsl(42, 55%, 58%)',
              textShadow: 'none'
            }} onMouseEnter={e => e.currentTarget.style.textShadow = '0 0 20px hsla(42, 55%, 58%, 0.5)'} onMouseLeave={e => e.currentTarget.style.textShadow = 'none'}>
                +971 52 821 8452
              </span>
            </motion.a>

            <p className="font-body text-sm text-sand/60 mb-4">
              Receive exclusive previews of off-market properties.
            </p>
            
            {/* Luxury Newsletter Input - Minimalist Gold Line */}
            <form onSubmit={handleNewsletterSubmit} className="mb-8">
              <div className="flex items-end gap-3">
                <div className="flex-1 relative">
                  <input type="email" value={email} onChange={handleEmailChange} placeholder="Your Email" required aria-label="Email address for newsletter" aria-describedby={emailError ? "email-error" : undefined} className={`w-full bg-transparent border-0 border-b-2 ${emailError ? 'border-red-400' : 'border-gold/40'} px-0 py-3 font-body text-sand placeholder:text-sand/40 focus:outline-none focus:border-gold transition-colors`} />
                  {/* Subtle glow line under input */}
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
                </div>
                {/* Solid Gold Metallic Button */}
                <motion.button type="submit" className="px-6 py-2.5 font-royal text-sm tracking-[0.15em] uppercase" style={{
                background: 'linear-gradient(135deg, hsl(45, 65%, 70%) 0%, hsl(42, 55%, 55%) 50%, hsl(38, 60%, 45%) 100%)',
                color: 'hsl(8, 27%, 12%)',
                boxShadow: '0 4px 15px hsla(42, 55%, 40%, 0.4), inset 0 1px 0 hsla(45, 70%, 85%, 0.4)',
                border: '1px solid hsla(42, 55%, 65%, 0.5)'
              }} whileHover={{
                scale: 1.02,
                boxShadow: '0 6px 25px hsla(42, 55%, 40%, 0.5), inset 0 1px 0 hsla(45, 70%, 85%, 0.5)'
              }} whileTap={{
                scale: 0.98
              }}>
                  Join
                </motion.button>
              </div>
              {emailError && <p id="email-error" className="mt-2 text-xs text-red-400 font-body">
                  {emailError}
                </p>}
            </form>

            {/* Social Icons */}
            <div className="flex items-center gap-4">
              {socialLinks.map(social => <motion.a key={social.label} href={social.href} aria-label={social.label} className="w-10 h-10 border border-bronze/40 flex items-center justify-center text-bronze transition-all duration-300" whileHover={{
              scale: 1.1,
              borderColor: 'hsl(42, 55%, 58%)',
              backgroundColor: 'hsla(42, 55%, 58%, 0.1)',
              boxShadow: '0 0 20px hsla(42, 55%, 58%, 0.3)'
            }} whileTap={{
              scale: 0.95
            }}>
                  <social.icon size={18} strokeWidth={1.5} />
                </motion.a>)}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar with Gold Line Separator */}
      <div className="relative">
        {/* Fading Gold Line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-px">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/30 to-transparent blur-sm" />
        </div>
        
        <div className="container mx-auto px-4 md:px-6 py-6 md:py-8">
          <div className="flex flex-col items-center gap-6">
            {/* Copyright + Saifco Branding */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
              <p className="font-body text-sm text-center" style={{
              color: 'hsl(42, 50%, 60%)'
            }}>
                © 2024 Royal Gulf Estates. All Rights Reserved.
              </p>
              
              {/* Saifco Branding */}
              <div className="flex items-center gap-2">
                <span className="font-body tracking-wide text-sm text-primary" style={{
                color: 'hsl(42, 50%, 55%)'
              }}>
                  Made by Saifco 
                </span>
                <a href="#" className="flex items-center gap-1.5 group" aria-label="Saifco - Website Creator">
                  
                </a>
              </div>
            </div>
            
            {/* Legal Links */}
            <div className="flex items-center justify-center gap-6 md:gap-8">
              {['Privacy Policy', 'Terms of Service', 'Cookie Preferences'].map(link => <motion.a key={link} href="#" className="font-body text-xs text-sand/40 transition-all duration-300" whileHover={{
              x: 3,
              color: 'hsl(42, 55%, 58%)',
              textShadow: '0 0 10px hsla(42, 55%, 58%, 0.3)'
            }}>
                  {link}
                </motion.a>)}
            </div>
          </div>
        </div>
      </div>
    </footer>;
};
export default MegaFooter;