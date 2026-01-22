import { motion } from "framer-motion";
import { MapPin, Instagram, Facebook, Twitter, Linkedin } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import CalligraphyAccent from "./CalligraphyAccent";
import RoyalButton from "./RoyalButton";
import { useToast } from "@/hooks/use-toast";

const emailSchema = z.string().email("Please enter a valid email address");

const MegaFooter = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    // Clear error when user starts typing
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

    // Show success toast (no backend yet)
    toast({
      title: "Thank you for subscribing",
      description: "You'll receive exclusive property previews soon.",
    });
    setEmail("");
    setEmailError(null);
  };

  const offices = [
    { city: "Dubai", address: "Emirates Towers, DIFC" },
    { city: "Riyadh", address: "Kingdom Centre, Olaya" },
    { city: "London", address: "One Hyde Park, Knightsbridge" },
  ];

  const quickLinks = [
    { label: "Our Heritage", href: "#heritage" },
    { label: "Royal Collection", href: "#collection" },
    { label: "Off-Plan Estates", href: "#" },
    { label: "Private Viewings", href: "#" },
    { label: "Press & Media", href: "#" },
  ];

  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-espresso text-sand border-t border-gold/20">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Column 1: Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <CalligraphyAccent className="w-16 h-5" />
              <span className="font-royal text-lg tracking-[0.2em] text-gold">
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
            <h4 className="font-royal text-lg text-gold tracking-wider mb-6 flex items-center gap-2">
              <MapPin size={18} strokeWidth={1.5} className="text-bronze" />
              Global Offices
            </h4>
            <ul className="space-y-4">
              {offices.map((office) => (
                <li key={office.city} className="group">
                  <span className="font-body text-sand font-medium block group-hover:text-gold transition-colors">
                    {office.city}
                  </span>
                  <span className="font-body text-sm text-sand/50">
                    {office.address}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h4 className="font-royal text-lg text-gold tracking-wider mb-6">
              Explore
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-sand/70 hover:text-gold transition-colors duration-300 inline-block relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-gold hover:after:w-full after:transition-all after:duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter & Social */}
          <div>
            <h4 className="font-royal text-lg text-gold tracking-wider mb-6">
              Private Invitation
            </h4>
            <p className="font-body text-sm text-sand/60 mb-4">
              Receive exclusive previews of off-market properties.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="mb-8">
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Your Email"
                  required
                  aria-label="Email address for newsletter"
                  aria-describedby={emailError ? "email-error" : undefined}
                  className={`flex-1 bg-espresso-dark/50 border ${
                    emailError ? 'border-red-400' : 'border-bronze/30'
                  } px-4 py-2.5 font-body text-sm text-sand placeholder:text-sand/40 focus:outline-none focus:border-gold/60 transition-colors`}
                />
                <RoyalButton type="submit" size="sm" className="px-4">
                  Join
                </RoyalButton>
              </div>
              {emailError && (
                <p id="email-error" className="mt-2 text-xs text-red-400 font-body">
                  {emailError}
                </p>
              )}
            </form>

            {/* Social Icons */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 border border-bronze/40 flex items-center justify-center text-bronze hover:text-gold hover:border-gold hover:bg-gold/10 transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon size={18} strokeWidth={1.5} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gold/10">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-body text-sm text-sand/50">
              © 2024 Royal Gulf Estates. All Rights Reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="font-body text-xs text-sand/40 hover:text-gold transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="font-body text-xs text-sand/40 hover:text-gold transition-colors">
                Terms of Service
              </a>
              <a href="#" className="font-body text-xs text-sand/40 hover:text-gold transition-colors">
                Cookie Preferences
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MegaFooter;
