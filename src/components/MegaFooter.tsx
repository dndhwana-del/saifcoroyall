import { Instagram, Twitter, Linkedin, Facebook, Send } from "lucide-react";
import { useState } from "react";
import CalligraphyAccent from "./CalligraphyAccent";

const MegaFooter = () => {
  const [email, setEmail] = useState("");

  const offices = [
    { city: "Dubai", address: "DIFC Gate Village" },
    { city: "Riyadh", address: "KAFD Tower" },
    { city: "London", address: "Mayfair" },
  ];

  const quickLinks = [
    { label: "Heritage", href: "#heritage" },
    { label: "Collections", href: "#collection" },
    { label: "Off-Plan", href: "#" },
    { label: "Private Sales", href: "#" },
    { label: "Investments", href: "#" },
  ];

  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Facebook, href: "#", label: "Facebook" },
  ];

  return (
    <footer className="bg-espresso border-t border-gold/20">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Logo & Tagline */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <CalligraphyAccent className="w-16 h-5" />
              <span className="font-royal text-xl tracking-[0.2em] text-gold">
                ROYAL GULF
              </span>
            </div>
            <p className="font-display text-lg text-sand/70 italic">
              Defining Luxury Since 1999
            </p>
            <p className="font-body text-sm text-sand/50 leading-relaxed">
              The Arabian Peninsula's most distinguished property house, 
              curating exceptional residences for discerning collectors.
            </p>
          </div>

          {/* Column 2: Office Locations */}
          <div className="space-y-6">
            <h4 className="font-royal text-lg text-gold tracking-wider">
              Global Presence
            </h4>
            <div className="space-y-4">
              {offices.map((office) => (
                <div key={office.city} className="group">
                  <p className="font-body text-sand/90 group-hover:text-gold transition-colors cursor-pointer">
                    {office.city}
                  </p>
                  <p className="font-body text-sm text-sand/50">
                    {office.address}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Quick Links */}
          <div className="space-y-6">
            <h4 className="font-royal text-lg text-gold tracking-wider">
              Discover
            </h4>
            <nav className="space-y-3">
              {quickLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block font-body text-sand/70 hover:text-gold hover:translate-x-2 transition-all duration-300"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Column 4: Newsletter & Social */}
          <div className="space-y-6">
            <h4 className="font-royal text-lg text-gold tracking-wider">
              Private Invitation
            </h4>
            <p className="font-body text-sm text-sand/50">
              Receive exclusive previews of new listings before they reach the market.
            </p>
            
            {/* Newsletter Input */}
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full bg-espresso-dark border border-gold/30 px-4 py-3 pr-12 font-body text-sand placeholder:text-sand/40 focus:outline-none focus:border-gold/60 transition-colors"
              />
              <button 
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gold hover:text-gold-light transition-colors"
                aria-label="Subscribe"
              >
                <Send size={18} />
              </button>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold/70 hover:bg-gold hover:text-espresso hover:border-gold transition-all duration-300"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gold/10">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-body text-sm text-sand/40">
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
                Cookie Settings
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MegaFooter;
