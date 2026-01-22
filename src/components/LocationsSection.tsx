import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useCallback, useMemo } from "react";
import { Maximize2 } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import CalligraphyAccent from "./CalligraphyAccent";
import FullscreenMapExplorer from "./FullscreenMapExplorer";

// Category types for filtering
type LocationCategory = "all" | "waterfront" | "urban" | "cultural";
interface LocationMarker {
  name: string;
  position: {
    top: string;
    left: string;
  };
  description: string;
  vibe: string; // The "feel" of the area
  avgPrice: string;
  properties: number;
  availableUnits: number;
  backgroundImage: string;
  category: LocationCategory[];
  city: string;
  isHub: boolean; // Major hub = larger dot
  parentHub?: string; // Connect to parent hub with line
}

// Filter categories
const filterCategories = [{
  id: "all" as LocationCategory,
  label: "All Locations",
  count: 12
}, {
  id: "waterfront" as LocationCategory,
  label: "Waterfront & Islands",
  count: 5
}, {
  id: "urban" as LocationCategory,
  label: "Urban & Skyline",
  count: 4
}, {
  id: "cultural" as LocationCategory,
  label: "Cultural & Leisure",
  count: 3
}];
const LocationsSection = () => {
  const [activeLocation, setActiveLocation] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<LocationCategory>("all");
  const locations: LocationMarker[] = [
  // ========== DUBAI HUB ==========
  {
    name: "Dubai",
    position: {
      top: "38%",
      left: "35%"
    },
    description: "The Crown Jewel of the Gulf",
    vibe: "Where Dreams Touch the Sky",
    avgPrice: "AED 75M",
    properties: 45,
    availableUnits: 12,
    backgroundImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=80",
    category: ["all"],
    city: "Dubai",
    isHub: true
  }, {
    name: "Palm Jumeirah",
    position: {
      top: "32%",
      left: "28%"
    },
    description: "Iconic waterfront living",
    vibe: "Island Paradise Redefined",
    avgPrice: "AED 85M",
    properties: 12,
    availableUnits: 3,
    backgroundImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=80",
    category: ["all", "waterfront"],
    city: "Dubai",
    isHub: false,
    parentHub: "Dubai"
  }, {
    name: "Downtown Dubai",
    position: {
      top: "42%",
      left: "38%"
    },
    description: "Heart of the metropolis",
    vibe: "The Heart of Now",
    avgPrice: "AED 65M",
    properties: 8,
    availableUnits: 5,
    backgroundImage: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1920&q=80",
    category: ["all", "urban"],
    city: "Dubai",
    isHub: false,
    parentHub: "Dubai"
  }, {
    name: "Dubai Marina",
    position: {
      top: "28%",
      left: "32%"
    },
    description: "Yacht life & coastal glamour",
    vibe: "Where Yachts Meet the Stars",
    avgPrice: "AED 55M",
    properties: 14,
    availableUnits: 6,
    backgroundImage: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=1920&q=80",
    category: ["all", "waterfront"],
    city: "Dubai",
    isHub: false,
    parentHub: "Dubai"
  }, {
    name: "DIFC",
    position: {
      top: "45%",
      left: "42%"
    },
    description: "Business luxury district",
    vibe: "Power Meets Prestige",
    avgPrice: "AED 72M",
    properties: 6,
    availableUnits: 2,
    backgroundImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80",
    category: ["all", "urban"],
    city: "Dubai",
    isHub: false,
    parentHub: "Dubai"
  }, {
    name: "Bluewaters Island",
    position: {
      top: "25%",
      left: "25%"
    },
    description: "Leisure & entertainment paradise",
    vibe: "Play in Paradise",
    avgPrice: "AED 48M",
    properties: 9,
    availableUnits: 4,
    backgroundImage: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1920&q=80",
    category: ["all", "cultural", "waterfront"],
    city: "Dubai",
    isHub: false,
    parentHub: "Dubai"
  },
  // ========== ABU DHABI HUB ==========
  {
    name: "Abu Dhabi",
    position: {
      top: "55%",
      left: "22%"
    },
    description: "The Capital of Elegance",
    vibe: "Timeless Majesty",
    avgPrice: "AED 68M",
    properties: 22,
    availableUnits: 7,
    backgroundImage: "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=1920&q=80",
    category: ["all"],
    city: "Abu Dhabi",
    isHub: true
  }, {
    name: "Saadiyat Island",
    position: {
      top: "52%",
      left: "18%"
    },
    description: "Cultural district & museums",
    vibe: "Arts & Culture Sanctuary",
    avgPrice: "AED 92M",
    properties: 8,
    availableUnits: 3,
    backgroundImage: "https://images.unsplash.com/photo-1578895101408-1a36b834405b?w=1920&q=80",
    category: ["all", "cultural", "waterfront"],
    city: "Abu Dhabi",
    isHub: false,
    parentHub: "Abu Dhabi"
  }, {
    name: "Yas Island",
    position: {
      top: "60%",
      left: "26%"
    },
    description: "Entertainment & racing capital",
    vibe: "Thrill Seekers' Haven",
    avgPrice: "AED 45M",
    properties: 11,
    availableUnits: 5,
    backgroundImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80",
    category: ["all", "cultural"],
    city: "Abu Dhabi",
    isHub: false,
    parentHub: "Abu Dhabi"
  },
  // ========== DOHA HUB ==========
  {
    name: "Doha",
    position: {
      top: "48%",
      left: "72%"
    },
    description: "Qatar's Rising Star",
    vibe: "The Future is Here",
    avgPrice: "AED 88M",
    properties: 18,
    availableUnits: 6,
    backgroundImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80",
    category: ["all"],
    city: "Doha",
    isHub: true
  }, {
    name: "The Pearl, Doha",
    position: {
      top: "42%",
      left: "68%"
    },
    description: "Qatar's luxury island",
    vibe: "Mediterranean Dreams",
    avgPrice: "AED 95M",
    properties: 6,
    availableUnits: 4,
    backgroundImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80",
    category: ["all", "waterfront"],
    city: "Doha",
    isHub: false,
    parentHub: "Doha"
  }, {
    name: "Lusail City",
    position: {
      top: "52%",
      left: "76%"
    },
    description: "Qatar's smart city of the future",
    vibe: "Tomorrow's Metropolis",
    avgPrice: "AED 78M",
    properties: 10,
    availableUnits: 8,
    backgroundImage: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1920&q=80",
    category: ["all", "urban"],
    city: "Doha",
    isHub: false,
    parentHub: "Doha"
  },
  // ========== RIYADH HUB ==========
  {
    name: "Riyadh",
    position: {
      top: "68%",
      left: "55%"
    },
    description: "Saudi's Ambitious Capital",
    vibe: "Vision of Tomorrow",
    avgPrice: "AED 62M",
    properties: 15,
    availableUnits: 9,
    backgroundImage: "https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?w=1920&q=80",
    category: ["all"],
    city: "Riyadh",
    isHub: true
  }, {
    name: "KAFD",
    position: {
      top: "72%",
      left: "58%"
    },
    description: "King Abdullah Financial District",
    vibe: "Kingdom's Financial Crown",
    avgPrice: "AED 58M",
    properties: 7,
    availableUnits: 3,
    backgroundImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80",
    category: ["all", "urban"],
    city: "Riyadh",
    isHub: false,
    parentHub: "Riyadh"
  }];

  // Filter locations based on active filter
  const filteredLocations = useMemo(() => {
    if (activeFilter === "all") return locations;
    return locations.filter(loc => loc.category.includes(activeFilter));
  }, [activeFilter]);

  // Get hub connections for drawing lines
  const hubConnections = useMemo(() => {
    return locations.filter(loc => loc.parentHub).map(loc => {
      const parent = locations.find(l => l.name === loc.parentHub);
      if (!parent) return null;
      return {
        from: parent.position,
        to: loc.position,
        child: loc.name
      };
    }).filter(Boolean);
  }, []);

  // Default abstract background
  const defaultBackground = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80";
  return <section className="relative py-20 overflow-hidden">
      {/* Cinematic Video-Style Background Container */}
      <div className="absolute inset-0">
        {/* Default Background with Slow Zoom */}
        <motion.div className="absolute inset-0" initial={{
        scale: 1
      }} animate={{
        scale: activeLocation ? 1 : 1.1
      }} transition={{
        duration: 20,
        ease: "linear",
        repeat: Infinity,
        repeatType: "reverse"
      }}>
          <div className="absolute inset-0 bg-cover bg-center" style={{
          backgroundImage: `url(${defaultBackground})`
        }} />
        </motion.div>

        {/* Location-Specific Background with Cross-Fade */}
        <AnimatePresence>
          {activeLocation && <motion.div key={activeLocation} className="absolute inset-0" initial={{
          opacity: 0,
          scale: 1
        }} animate={{
          opacity: 1,
          scale: 1.15
        }} exit={{
          opacity: 0
        }} transition={{
          opacity: {
            duration: 1,
            ease: "easeInOut"
          },
          scale: {
            duration: 8,
            ease: "linear"
          }
        }}>
              <div className="absolute inset-0 bg-cover bg-center" style={{
            backgroundImage: `url(${locations.find(l => l.name === activeLocation)?.backgroundImage})`
          }} />
            </motion.div>}
        </AnimatePresence>

        {/* Dark Gold/Brown Gradient Overlay (80% opacity) */}
        <div className="absolute inset-0 pointer-events-none" style={{
        background: `linear-gradient(
              135deg,
              hsla(8, 27%, 12%, 0.85) 0%,
              hsla(30, 40%, 15%, 0.80) 50%,
              hsla(8, 27%, 10%, 0.90) 100%
            )`
      }} />

        {/* Gold Dust Particle Effect */}
        <div className="absolute inset-0 pointer-events-none opacity-30">
          {[...Array(20)].map((_, i) => <motion.div key={i} className="absolute w-1 h-1 bg-primary rounded-full" style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`
        }} animate={{
          y: [-20, 20],
          x: [-10, 10],
          opacity: [0, 0.8, 0]
        }} transition={{
          duration: 4 + Math.random() * 4,
          repeat: Infinity,
          delay: Math.random() * 4,
          ease: "easeInOut"
        }} />)}
        </div>
      </div>
      
      {/* Seamless pattern continuation */}
      <div className="absolute inset-0 mashrabiya-pattern opacity-30 pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-12">
          <CalligraphyAccent className="mx-auto mb-6 w-32 h-8" />
          <h2 className="text-3xl md:text-5xl font-royal mb-4 text-primary drop-shadow-[0_2px_10px_hsla(42,55%,58%,0.3)]">
            Prime Coordinates
          </h2>
          <p className="font-body text-lg text-secondary/70 leading-relaxed">
            Our portfolio spans the most coveted addresses across the Arabian Gulf
          </p>
        </ScrollReveal>

        {/* Gold Pill Navigation Filters */}
        <ScrollReveal delay={0.15} className="mb-8">
          <div className="flex flex-wrap justify-center gap-3">
            {filterCategories.map(filter => <motion.button key={filter.id} onClick={() => setActiveFilter(filter.id)} className={`relative px-5 py-2.5 rounded-full font-body text-sm tracking-wide transition-all duration-300 border ${activeFilter === filter.id ? 'bg-primary text-foreground border-primary shadow-[0_0_20px_hsla(42,55%,58%,0.4)]' : 'bg-foreground/40 text-primary/80 border-primary/30 hover:border-primary/60 hover:bg-primary/10'}`} whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.98
          }}>
                {filter.label}
                <span className={`ml-2 text-xs ${activeFilter === filter.id ? 'text-foreground/70' : 'text-primary/50'}`}>
                  ({filter.id === "all" ? locations.length : locations.filter(l => l.category.includes(filter.id)).length})
                </span>
                
                {/* Active indicator glow */}
                {activeFilter === filter.id && <motion.div className="absolute inset-0 rounded-full" initial={{
              opacity: 0
            }} animate={{
              opacity: [0.5, 0.2, 0.5]
            }} transition={{
              duration: 2,
              repeat: Infinity
            }} style={{
              background: 'radial-gradient(circle, hsla(42, 55%, 58%, 0.3) 0%, transparent 70%)'
            }} />}
              </motion.button>)}
          </div>
        </ScrollReveal>

        {/* Command Center Map Container */}
        <ScrollReveal delay={0.2}>
          <div className="relative max-w-5xl mx-auto">
            {/* Map Frame with Enhanced Border */}
            <div className="relative border-2 border-primary/40 p-2 shadow-[0_0_60px_-20px_hsla(42,55%,58%,0.4)]">
              <div className="border border-primary/20 p-1">
                {/* Map Area */}
                <div className="relative aspect-[16/9] bg-foreground/40 backdrop-blur-sm overflow-hidden">
                  {/* Enhanced Map Grid Pattern */}
                  <div className="absolute inset-0 opacity-25" style={{
                  backgroundImage: `
                        linear-gradient(to right, hsl(var(--primary) / 0.4) 1px, transparent 1px),
                        linear-gradient(to bottom, hsl(var(--primary) / 0.4) 1px, transparent 1px)
                      `,
                  backgroundSize: '40px 40px'
                }} />
                  
                  {/* Decorative Coastline SVG */}
                  <svg className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 800 450" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="lineGradientV2" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="hsl(42, 55%, 58%)" stopOpacity="0" />
                        <stop offset="50%" stopColor="hsl(42, 55%, 58%)" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="hsl(42, 55%, 58%)" stopOpacity="0" />
                      </linearGradient>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                        <feMerge>
                          <feMergeNode in="coloredBlur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>
                    
                    <path d="M0,200 Q100,180 200,220 T400,200 T600,240 T800,200 L800,450 L0,450 Z" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary) / 0.5)" strokeWidth="1" filter="url(#glow)" />
                    <path d="M0,280 Q150,260 300,300 T500,270 T700,290 T800,260 L800,450 L0,450 Z" fill="hsl(var(--primary) / 0.08)" stroke="hsl(var(--primary) / 0.3)" strokeWidth="0.5" />
                    
                    {/* Dynamic Hub Connection Lines */}
                    {hubConnections.map((conn, idx) => {
                    if (!conn) return null;
                    const isVisible = filteredLocations.some(l => l.name === conn.child);

                    // Convert percentage positions to viewBox coordinates
                    const x1 = parseFloat(conn.from.left) * 8;
                    const y1 = parseFloat(conn.from.top) * 4.5;
                    const x2 = parseFloat(conn.to.left) * 8;
                    const y2 = parseFloat(conn.to.top) * 4.5;
                    return <motion.line key={`conn-${idx}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="url(#lineGradientV2)" strokeWidth="1" filter="url(#glow)" initial={{
                      pathLength: 0,
                      opacity: 0
                    }} animate={{
                      pathLength: isVisible ? 1 : 0,
                      opacity: isVisible ? 0.5 : 0
                    }} transition={{
                      duration: 1.5,
                      delay: 0.5 + idx * 0.1
                    }} />;
                  })}
                  </svg>

                  {/* Location Markers with Enhanced Effects */}
                  <AnimatePresence mode="popLayout">
                    {filteredLocations.map((location, index) => <HolographicMarker key={location.name} location={location} index={index} isActive={activeLocation === location.name} onHover={() => setActiveLocation(location.name)} onLeave={() => setActiveLocation(null)} isHub={location.isHub} vibe={location.vibe} />)}
                  </AnimatePresence>

                  {/* Compass Rose */}
                  <div className="absolute bottom-6 right-6 opacity-50">
                    <motion.svg width="60" height="60" viewBox="0 0 60 60" className="text-primary" animate={{
                    rotate: [0, 360]
                  }} transition={{
                    duration: 120,
                    repeat: Infinity,
                    ease: "linear"
                  }}>
                      <circle cx="30" cy="30" r="28" fill="none" stroke="currentColor" strokeWidth="0.5" />
                      <circle cx="30" cy="30" r="20" fill="none" stroke="currentColor" strokeWidth="0.5" />
                      <path d="M30,5 L33,25 L30,15 L27,25 Z" fill="currentColor" opacity="0.8" />
                      <path d="M30,55 L33,35 L30,45 L27,35 Z" fill="currentColor" opacity="0.4" />
                      <path d="M5,30 L25,27 L15,30 L25,33 Z" fill="currentColor" opacity="0.4" />
                      <path d="M55,30 L35,27 L45,30 L35,33 Z" fill="currentColor" opacity="0.4" />
                      <text x="30" y="3" textAnchor="middle" fontSize="6" fill="currentColor" className="font-royal">N</text>
                    </motion.svg>
                  </div>

                  {/* Map Title Cartouche */}
                  <div className="absolute top-6 left-6">
                    <motion.div className="border border-primary/40 bg-foreground/60 backdrop-blur-md px-4 py-2" whileHover={{
                    borderColor: "hsla(42, 55%, 58%, 0.8)"
                  }}>
                      <p className="text-xs tracking-[0.2em] text-primary/90 uppercase font-serif font-light">
                        Arabian Gulf Region
                      </p>
                    </motion.div>
                  </div>

                  {/* Fullscreen Button */}
                  <motion.button className="absolute top-6 right-6 w-10 h-10 border border-primary/40 bg-foreground/60 backdrop-blur-md flex items-center justify-center text-primary hover:bg-primary/20 hover:border-primary/60 transition-colors z-30" onClick={() => setIsFullscreen(true)} whileHover={{
                  scale: 1.1
                }} whileTap={{
                  scale: 0.95
                }} title="Open Fullscreen Map Explorer">
                    <Maximize2 size={16} />
                  </motion.button>

                  {/* Active Location Indicator */}
                  <AnimatePresence>
                    {activeLocation && <motion.div className="absolute bottom-6 left-6 flex items-center gap-3" initial={{
                    opacity: 0,
                    y: 10
                  }} animate={{
                    opacity: 1,
                    y: 0
                  }} exit={{
                    opacity: 0,
                    y: 10
                  }}>
                        <motion.div className="w-2 h-2 bg-green-400 rounded-full" animate={{
                      scale: [1, 1.3, 1]
                    }} transition={{
                      duration: 1,
                      repeat: Infinity
                    }} />
                        <span className="font-body text-sm text-primary/80">
                          Viewing: {activeLocation}
                        </span>
                      </motion.div>}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Corner Decorations */}
            <div className="absolute -top-3 -left-3 w-12 h-12 border-t-2 border-l-2 border-primary/50" />
            <div className="absolute -top-3 -right-3 w-12 h-12 border-t-2 border-r-2 border-primary/50" />
            <div className="absolute -bottom-3 -left-3 w-12 h-12 border-b-2 border-l-2 border-primary/50" />
            <div className="absolute -bottom-3 -right-3 w-12 h-12 border-b-2 border-r-2 border-primary/50" />
          </div>
        </ScrollReveal>

        {/* Location Legend - Show Hubs and Filtered Districts */}
        <ScrollReveal delay={0.4} className="mt-10">
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {/* Show Hub cities first */}
            {locations.filter(l => l.isHub).map(location => <motion.div key={location.name} className="flex items-center gap-2 group cursor-pointer px-3 py-1.5 rounded-full border border-primary/20 bg-foreground/30 hover:bg-primary/10 hover:border-primary/40 transition-all" whileHover={{
            scale: 1.05
          }} onHoverStart={() => setActiveLocation(location.name)} onHoverEnd={() => setActiveLocation(null)}>
                <motion.div className="w-3 h-3 bg-primary rounded-full relative flex items-center justify-center" animate={{
              boxShadow: activeLocation === location.name ? ["0 0 0px hsla(42,55%,58%,0)", "0 0 15px hsla(42,55%,58%,1)", "0 0 0px hsla(42,55%,58%,0)"] : ["0 0 0px hsla(42,55%,58%,0)", "0 0 8px hsla(42,55%,58%,0.6)", "0 0 0px hsla(42,55%,58%,0)"]
            }} transition={{
              duration: 2,
              repeat: Infinity
            }}>
                  <div className="w-1.5 h-1.5 bg-foreground rounded-full" />
                </motion.div>
                <span className={`font-royal text-sm tracking-wide transition-colors ${activeLocation === location.name ? 'text-primary' : 'text-primary/70 group-hover:text-primary'}`}>
                  {location.city}
                </span>
                <span className="text-xs text-secondary/40">
                  ({locations.filter(l => l.city === location.city && !l.isHub).length} districts)
                </span>
              </motion.div>)}
          </div>
        </ScrollReveal>
      </div>

      {/* Fullscreen Map Explorer Modal */}
      <FullscreenMapExplorer isOpen={isFullscreen} onClose={() => setIsFullscreen(false)} locations={locations} initialLocation={activeLocation} />
    </section>;
};

// Holographic Marker Component with 3D Tilt Effect
interface HolographicMarkerProps {
  location: LocationMarker;
  index: number;
  isActive: boolean;
  onHover: () => void;
  onLeave: () => void;
  isHub: boolean;
  vibe: string;
}
const HolographicMarker = ({
  location,
  index,
  isActive,
  onHover,
  onLeave,
  isHub,
  vibe
}: HolographicMarkerProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({
    x: 0,
    y: 0
  });
  const [showRipple, setShowRipple] = useState(false);
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      x: y * 20,
      y: x * -20
    });
  }, []);
  const handleMouseEnter = () => {
    onHover();
    setShowRipple(true);
    setTimeout(() => setShowRipple(false), 600);
  };
  const handleMouseLeave = () => {
    onLeave();
    setTilt({
      x: 0,
      y: 0
    });
  };

  // Different sizes for hubs vs districts
  const markerSize = isHub ? 'w-6 h-6' : 'w-3.5 h-3.5';
  const ringMargin = isHub ? '-m-6' : '-m-4';
  const rippleMargin = isHub ? '-m-3' : '-m-2';
  return <motion.div className="absolute group cursor-pointer z-20" style={{
    top: location.position.top,
    left: location.position.left
  }} initial={{
    opacity: 0,
    scale: 0
  }} animate={{
    opacity: 1,
    scale: 1
  }} exit={{
    opacity: 0,
    scale: 0
  }} transition={{
    delay: 0.3 + index * 0.08,
    duration: 0.4
  }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} layout>
      {/* Ripple/Shockwave Effect on Hover */}
      <AnimatePresence>
        {showRipple && <>
            {[1, 2, 3, 4].map(ring => <motion.div key={ring} className={`absolute inset-0 ${rippleMargin} rounded-full border-2 ${isHub ? 'border-primary' : 'border-primary/60'}`} initial={{
          scale: 1,
          opacity: 0.8
        }} animate={{
          scale: (isHub ? 5 : 4) + ring,
          opacity: 0
        }} exit={{
          opacity: 0
        }} transition={{
          duration: isHub ? 0.8 : 0.6,
          delay: ring * 0.1,
          ease: "easeOut"
        }} />)}
          </>}
      </AnimatePresence>

      {/* Pulsing Concentric Rings - More prominent for hubs */}
      {(isHub ? [1, 2, 3, 4] : [1, 2]).map(ring => <motion.div key={ring} className={`absolute inset-0 ${ringMargin} rounded-full border ${isHub ? 'border-primary/50' : 'border-primary/30'}`} animate={{
      scale: [1, (isHub ? 2.5 : 2) + ring * 0.5, 1],
      opacity: [isHub ? 0.6 : 0.4, 0, isHub ? 0.6 : 0.4]
    }} transition={{
      duration: 2 + ring * 0.2,
      repeat: Infinity,
      ease: "easeInOut",
      delay: index * 0.1 + ring * 0.15
    }} />)}
      
      {/* Marker Dot with Enhanced Glow - Larger for hubs */}
      <motion.div className={`relative ${markerSize} bg-primary rounded-full transition-transform duration-300 flex items-center justify-center`} style={{
      boxShadow: isActive ? `0 0 ${isHub ? '40px 15px' : '30px 10px'} hsla(42, 55%, 58%, 0.8)` : `0 0 ${isHub ? '35px 12px' : '25px 6px'} hsla(42, 55%, 58%, 0.6)`
    }} animate={isActive ? {
      scale: 1.4
    } : {
      scale: 1
    }}>
        {/* Hub indicator - inner dot */}
        {isHub && <div className="w-2 h-2 bg-foreground rounded-full" />}
      </motion.div>

      {/* City label for hubs */}
      {isHub && <motion.div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap" initial={{
      opacity: 0,
      y: -5
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      delay: 0.5 + index * 0.1
    }}>
          <span className="font-royal text-xs text-primary/80 tracking-wider uppercase">
            {location.city}
          </span>
        </motion.div>}
      
      {/* Holographic 3D Glass Card Tooltip */}
      <motion.div ref={cardRef} className="absolute left-10 top-1/2 -translate-y-1/2 pointer-events-auto z-30" style={{
      perspective: "1000px",
      opacity: isActive ? 1 : 0,
      pointerEvents: isActive ? "auto" : "none"
    }} initial={{
      opacity: 0,
      x: -20,
      scale: 0.9
    }} animate={isActive ? {
      opacity: 1,
      x: 0,
      scale: 1
    } : {
      opacity: 0,
      x: -20,
      scale: 0.9
    }} transition={{
      duration: 0.3,
      ease: "easeOut"
    }} onMouseMove={handleMouseMove}>
        <motion.div className="relative min-w-[240px] overflow-hidden" style={{
        transformStyle: "preserve-3d",
        transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 0.1s ease-out"
      }}>
          {/* Glass Background */}
          <div className="absolute inset-0 rounded-lg" style={{
          background: "hsla(8, 27%, 12%, 0.7)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(212, 175, 55, 0.3)"
        }} />
          
          {/* Holographic Shimmer Effect */}
          <motion.div className="absolute inset-0 rounded-lg pointer-events-none" style={{
          background: `linear-gradient(
                ${135 + tilt.y * 2}deg,
                transparent 0%,
                hsla(42, 55%, 70%, 0.1) 45%,
                hsla(42, 55%, 80%, 0.15) 50%,
                hsla(42, 55%, 70%, 0.1) 55%,
                transparent 100%
              )`
        }} />
          
          {/* Card Content */}
          <div className="relative p-5 rounded-lg">
            {/* Header with Live Pulse */}
            <div className="flex items-center justify-between mb-1">
              <p className="font-royal text-base text-primary tracking-wide">
                {location.name}
              </p>
              {/* Hub/District Badge */}
              {isHub ? <span className="px-2 py-0.5 rounded text-[9px] font-body uppercase tracking-wider bg-primary/20 text-primary border border-primary/30">
                  Hub
                </span> : <div className="flex items-center gap-1.5">
                  <motion.div className="w-2 h-2 bg-green-400 rounded-full" animate={{
                scale: [1, 1.3, 1],
                boxShadow: ["0 0 0 0 rgba(74, 222, 128, 0.7)", "0 0 0 4px rgba(74, 222, 128, 0)", "0 0 0 0 rgba(74, 222, 128, 0)"]
              }} transition={{
                duration: 1.5,
                repeat: Infinity
              }} />
                  <span className="font-body text-[10px] text-green-400 uppercase tracking-wider">
                    Live
                  </span>
                </div>}
            </div>

            {/* Vibe - The Feel of the Area */}
            <p className="font-display text-sm text-primary/70 italic mb-2">
              "{vibe}"
            </p>
            
            <p className="font-body text-xs text-secondary/50 mb-4">
              {location.description}
            </p>
            
            {/* Divider */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent mb-4" />
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="font-body text-[10px] text-secondary/50 uppercase tracking-wider mb-1">
                  Avg. Price
                </p>
                <p className="font-royal text-lg text-primary">
                  {location.avgPrice}
                </p>
              </div>
              <div className="text-right">
                <p className="font-body text-[10px] text-secondary/50 uppercase tracking-wider mb-1">
                  Listings
                </p>
                <p className="font-royal text-lg text-secondary">
                  {location.properties}
                </p>
              </div>
            </div>

            {/* Available Units Badge */}
            <div className="flex items-center justify-center gap-2 py-2 rounded" style={{
            background: "hsla(42, 55%, 58%, 0.1)",
            border: "1px solid hsla(42, 55%, 58%, 0.2)"
          }}>
              <motion.div className="w-2 h-2 bg-green-400 rounded-full" animate={{
              opacity: [1, 0.5, 1]
            }} transition={{
              duration: 1,
              repeat: Infinity
            }} />
              <span className="font-body text-xs text-primary">
                Available Units: {location.availableUnits}
              </span>
            </div>
          </div>
          
          {/* Arrow Connector */}
          <div className="absolute left-0 top-1/2 -translate-x-2 -translate-y-1/2 w-4 h-4 rotate-45" style={{
          background: "hsla(8, 27%, 12%, 0.7)",
          backdropFilter: "blur(20px)",
          borderLeft: "1px solid rgba(212, 175, 55, 0.3)",
          borderBottom: "1px solid rgba(212, 175, 55, 0.3)"
        }} />
        </motion.div>
      </motion.div>
    </motion.div>;
};
export default LocationsSection;