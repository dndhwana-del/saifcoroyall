import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Instagram, Twitter, Linkedin, Facebook, Send, MapPin, Phone, Mail } from "lucide-react";
import CalligraphyAccent from "@/components/CalligraphyAccent";
import GlassPanel from "@/components/GlassPanel";
import RoyalButton from "@/components/RoyalButton";

const SlideFooter = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const formElements = [
    { id: "name", delay: 0.2 },
    { id: "email", delay: 0.4 },
    { id: "message", delay: 0.6 },
    { id: "button", delay: 0.8 },
  ];

  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Facebook, href: "#", label: "Facebook" },
  ];

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden snap-start bg-espresso"
    >
      {/* Mashrabiya pattern */}
      <div className="absolute inset-0 mashrabiya-pattern opacity-20" />
      
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-espresso-dark via-transparent to-espresso" />

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Contact Form - Assembles piece by piece */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <GlassPanel intensity="heavy" className="p-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.1 }}
              >
                <CalligraphyAccent className="mb-6 w-24 h-6" />
                <h2 className="text-3xl md:text-4xl font-royal text-gold mb-2">
                  Begin Your Journey
                </h2>
                <p className="font-body text-sand/60 mb-8">
                  Every exceptional estate begins with a conversation
                </p>
              </motion.div>

              <form className="space-y-6">
                {/* Name Field */}
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={isInView ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <label className="font-body text-sm text-sand/60 mb-2 block">Your Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-espresso-dark/50 border border-gold/30 px-4 py-3 font-body text-sand placeholder:text-sand/30 focus:outline-none focus:border-gold/60 transition-colors"
                    placeholder="Enter your name"
                  />
                </motion.div>

                {/* Email Field */}
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={isInView ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <label className="font-body text-sm text-sand/60 mb-2 block">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-espresso-dark/50 border border-gold/30 px-4 py-3 font-body text-sand placeholder:text-sand/30 focus:outline-none focus:border-gold/60 transition-colors"
                    placeholder="your@email.com"
                  />
                </motion.div>

                {/* Message Field */}
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={isInView ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <label className="font-body text-sm text-sand/60 mb-2 block">Your Message</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    className="w-full bg-espresso-dark/50 border border-gold/30 px-4 py-3 font-body text-sand placeholder:text-sand/30 focus:outline-none focus:border-gold/60 transition-colors resize-none"
                    placeholder="Tell us about your dream property..."
                  />
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  <RoyalButton size="lg" className="w-full">
                    <span className="flex items-center justify-center gap-2">
                      Schedule Consultation
                      <Send size={18} />
                    </span>
                  </RoyalButton>
                </motion.div>
              </form>
            </GlassPanel>
          </motion.div>

          {/* Right: Contact Info & Branding */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-8"
          >
            {/* Brand */}
            <div className="text-center lg:text-left">
              <div className="flex items-center gap-4 justify-center lg:justify-start mb-4">
                <CalligraphyAccent className="w-20 h-6" />
                <span className="font-royal text-2xl tracking-[0.2em] text-gold">
                  ROYAL GULF
                </span>
              </div>
              <p className="font-display text-xl text-sand/70 italic">
                Defining Luxury Since 1999
              </p>
            </div>

            {/* Contact Details */}
            <GlassPanel intensity="light" className="p-8">
              <div className="space-y-6">
                <motion.div 
                  className="flex items-start gap-4"
                  initial={{ x: 50, opacity: 0 }}
                  animate={isInView ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <MapPin className="text-gold mt-1" size={20} />
                  <div>
                    <p className="font-body text-sand">DIFC Gate Village, Dubai</p>
                    <p className="font-body text-sand/50 text-sm">Primary Headquarters</p>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-start gap-4"
                  initial={{ x: 50, opacity: 0 }}
                  animate={isInView ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Phone className="text-gold mt-1" size={20} />
                  <div>
                    <p className="font-body text-sand">+971 4 XXX XXXX</p>
                    <p className="font-body text-sand/50 text-sm">By Appointment Only</p>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-start gap-4"
                  initial={{ x: 50, opacity: 0 }}
                  animate={isInView ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <Mail className="text-gold mt-1" size={20} />
                  <div>
                    <p className="font-body text-sand">concierge@royalgulf.ae</p>
                    <p className="font-body text-sand/50 text-sm">Discretion Assured</p>
                  </div>
                </motion.div>
              </div>
            </GlassPanel>

            {/* Social Links */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
              transition={{ delay: 0.9 }}
              className="flex items-center justify-center lg:justify-start gap-4"
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center text-gold/70 hover:bg-gold hover:text-espresso hover:border-gold transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </motion.div>

            {/* Copyright */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 1.2 }}
              className="font-body text-sm text-sand/40 text-center lg:text-left"
            >
              © 2024 Royal Gulf Estates. All Rights Reserved.
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Decorative corners */}
      <div className="absolute top-8 left-8 w-24 h-24 border-t-2 border-l-2 border-gold/10" />
      <div className="absolute bottom-8 right-8 w-24 h-24 border-b-2 border-r-2 border-gold/10" />
    </section>
  );
};

export default SlideFooter;
