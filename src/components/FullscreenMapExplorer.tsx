import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useCallback, useEffect } from "react";
import { X, ZoomIn, ZoomOut, Maximize2, MapPin, Home, DollarSign, Users, Building, ChevronLeft, ChevronRight } from "lucide-react";

interface LocationMarker {
  name: string;
  position: { top: string; left: string };
  description: string;
  vibe?: string;
  avgPrice: string;
  properties: number;
  availableUnits: number;
  backgroundImage: string;
  category?: string[];
  city?: string;
  isHub?: boolean;
  parentHub?: string;
  highlights?: string[];
  propertyTypes?: string[];
}

interface FullscreenMapExplorerProps {
  isOpen: boolean;
  onClose: () => void;
  locations: LocationMarker[];
  initialLocation?: string | null;
}

const FullscreenMapExplorer = ({ isOpen, onClose, locations, initialLocation }: FullscreenMapExplorerProps) => {
  const [activeLocation, setActiveLocation] = useState<LocationMarker | null>(
    initialLocation ? locations.find(l => l.name === initialLocation) || null : null
  );
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const mapContainerRef = useRef<HTMLDivElement>(null);

  // Default abstract background
  const defaultBackground = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80";

  // Handle zoom
  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.25, 0.5));
  const handleResetZoom = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  // Handle panning
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) {
      setIsPanning(true);
      setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning) {
      setPan({
        x: e.clientX - panStart.x,
        y: e.clientY - panStart.y,
      });
    }
  };

  const handleMouseUp = () => setIsPanning(false);

  // Navigate between locations
  const navigateLocation = (direction: 'prev' | 'next') => {
    const currentIndex = activeLocation 
      ? locations.findIndex(l => l.name === activeLocation.name)
      : -1;
    
    if (direction === 'next') {
      const nextIndex = currentIndex >= locations.length - 1 ? 0 : currentIndex + 1;
      setActiveLocation(locations[nextIndex]);
    } else {
      const prevIndex = currentIndex <= 0 ? locations.length - 1 : currentIndex - 1;
      setActiveLocation(locations[prevIndex]);
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case '+':
        case '=':
          handleZoomIn();
          break;
        case '-':
          handleZoomOut();
          break;
        case 'ArrowLeft':
          navigateLocation('prev');
          break;
        case 'ArrowRight':
          navigateLocation('next');
          break;
        case '0':
          handleResetZoom();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, activeLocation]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] bg-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Cinematic Background */}
          <div className="absolute inset-0">
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1 }}
              animate={{ scale: 1.05 }}
              transition={{ duration: 30, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${activeLocation?.backgroundImage || defaultBackground})` }}
              />
            </motion.div>
            
            {/* Dark overlay */}
            <div 
              className="absolute inset-0"
              style={{
                background: `linear-gradient(
                  135deg,
                  hsla(8, 27%, 8%, 0.92) 0%,
                  hsla(30, 40%, 12%, 0.88) 50%,
                  hsla(8, 27%, 6%, 0.95) 100%
                )`
              }}
            />
          </div>

          {/* Map Content Container */}
          <div 
            ref={mapContainerRef}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <motion.div
              className="absolute inset-0 origin-center"
              animate={{ 
                scale: zoom,
                x: pan.x,
                y: pan.y,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Map Grid */}
              <div 
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, hsl(var(--primary) / 0.3) 1px, transparent 1px),
                    linear-gradient(to bottom, hsl(var(--primary) / 0.3) 1px, transparent 1px)
                  `,
                  backgroundSize: `${60 / zoom}px ${60 / zoom}px`,
                }}
              />

              {/* Decorative Coastline */}
              <svg 
                className="absolute inset-0 w-full h-full opacity-30" 
                viewBox="0 0 1920 1080" 
                preserveAspectRatio="xMidYMid slice"
              >
                <defs>
                  <linearGradient id="fullscreenLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="hsl(42, 55%, 58%)" stopOpacity="0" />
                    <stop offset="50%" stopColor="hsl(42, 55%, 58%)" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="hsl(42, 55%, 58%)" stopOpacity="0" />
                  </linearGradient>
                  <filter id="glowFullscreen">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                
                <path
                  d="M0,400 Q200,350 400,420 T800,380 T1200,440 T1600,400 T1920,420 L1920,1080 L0,1080 Z"
                  fill="hsl(var(--primary) / 0.08)"
                  stroke="hsl(var(--primary) / 0.4)"
                  strokeWidth="2"
                  filter="url(#glowFullscreen)"
                />
                <path
                  d="M0,600 Q300,550 600,620 T1000,580 T1400,620 T1920,580 L1920,1080 L0,1080 Z"
                  fill="hsl(var(--primary) / 0.05)"
                  stroke="hsl(var(--primary) / 0.2)"
                  strokeWidth="1"
                />
              </svg>

              {/* Location Markers */}
              {locations.map((location, index) => (
                <FullscreenMarker
                  key={location.name}
                  location={location}
                  index={index}
                  isActive={activeLocation?.name === location.name}
                  onClick={() => setActiveLocation(location)}
                  zoom={zoom}
                />
              ))}
            </motion.div>
          </div>

          {/* Top Control Bar */}
          <div className="absolute top-0 left-0 right-0 z-10">
            <div className="flex items-center justify-between p-6">
              {/* Title */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="font-royal text-2xl text-primary tracking-wider">
                  Map Explorer
                </h2>
                <p className="font-body text-sm text-secondary/50">
                  Click locations to explore • Drag to pan • Scroll to zoom
                </p>
              </motion.div>

              {/* Close Button */}
              <motion.button
                className="w-12 h-12 rounded-full border border-primary/40 bg-foreground/60 backdrop-blur-md flex items-center justify-center text-primary hover:bg-primary/20 transition-colors"
                onClick={onClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <X size={20} />
              </motion.button>
            </div>
          </div>

          {/* Zoom Controls */}
          <motion.div 
            className="absolute right-6 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <motion.button
              className="w-10 h-10 rounded border border-primary/40 bg-foreground/70 backdrop-blur-md flex items-center justify-center text-primary hover:bg-primary/20 transition-colors"
              onClick={handleZoomIn}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              disabled={zoom >= 3}
            >
              <ZoomIn size={18} />
            </motion.button>
            
            <div className="text-center py-2">
              <span className="font-body text-xs text-primary/60">
                {Math.round(zoom * 100)}%
              </span>
            </div>

            <motion.button
              className="w-10 h-10 rounded border border-primary/40 bg-foreground/70 backdrop-blur-md flex items-center justify-center text-primary hover:bg-primary/20 transition-colors"
              onClick={handleZoomOut}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              disabled={zoom <= 0.5}
            >
              <ZoomOut size={18} />
            </motion.button>

            <motion.button
              className="w-10 h-10 rounded border border-primary/40 bg-foreground/70 backdrop-blur-md flex items-center justify-center text-primary hover:bg-primary/20 transition-colors mt-2"
              onClick={handleResetZoom}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Maximize2 size={18} />
            </motion.button>
          </motion.div>

          {/* Location Navigation Pills */}
          <motion.div 
            className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-2 bg-foreground/70 backdrop-blur-md border border-primary/30 rounded-full px-4 py-2">
              <button
                onClick={() => navigateLocation('prev')}
                className="w-8 h-8 rounded-full flex items-center justify-center text-primary/60 hover:text-primary hover:bg-primary/10 transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
              
              {locations.map((location) => (
                <button
                  key={location.name}
                  onClick={() => setActiveLocation(location)}
                  className={`px-4 py-1.5 rounded-full font-body text-sm transition-all ${
                    activeLocation?.name === location.name
                      ? 'bg-primary text-foreground'
                      : 'text-secondary/60 hover:text-primary hover:bg-primary/10'
                  }`}
                >
                  {location.name}
                </button>
              ))}
              
              <button
                onClick={() => navigateLocation('next')}
                className="w-8 h-8 rounded-full flex items-center justify-center text-primary/60 hover:text-primary hover:bg-primary/10 transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </motion.div>

          {/* Property Detail Overlay Panel */}
          <AnimatePresence>
            {activeLocation && (
              <PropertyOverlayPanel
                location={activeLocation}
                onClose={() => setActiveLocation(null)}
              />
            )}
          </AnimatePresence>

          {/* Keyboard Shortcuts Hint */}
          <motion.div
            className="absolute bottom-6 left-6 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex gap-4 text-primary/40 font-body text-xs">
              <span>ESC to close</span>
              <span>+/- to zoom</span>
              <span>← → to navigate</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Fullscreen Marker Component
interface FullscreenMarkerProps {
  location: LocationMarker;
  index: number;
  isActive: boolean;
  onClick: () => void;
  zoom: number;
}

const FullscreenMarker = ({ location, index, isActive, onClick, zoom }: FullscreenMarkerProps) => {
  const [showRipple, setShowRipple] = useState(false);

  const handleClick = () => {
    onClick();
    setShowRipple(true);
    setTimeout(() => setShowRipple(false), 800);
  };

  // Scale marker size inversely with zoom to maintain consistent visual size
  const markerScale = 1 / Math.sqrt(zoom);

  return (
    <motion.div
      className="absolute cursor-pointer z-20"
      style={{ 
        top: location.position.top, 
        left: location.position.left,
        transform: `translate(-50%, -50%) scale(${markerScale})`,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: markerScale }}
      transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
      onClick={handleClick}
    >
      {/* Ripple Effect */}
      <AnimatePresence>
        {showRipple && (
          <>
            {[1, 2, 3, 4].map((ring) => (
              <motion.div
                key={ring}
                className="absolute inset-0 -m-3 rounded-full border-2 border-primary"
                initial={{ scale: 1, opacity: 0.8 }}
                animate={{ scale: 6 + ring * 2, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ 
                  duration: 0.8,
                  delay: ring * 0.1,
                  ease: "easeOut"
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Pulsing Rings */}
      {[1, 2].map((ring) => (
        <motion.div
          key={ring}
          className={`absolute inset-0 -m-6 rounded-full border ${isActive ? 'border-primary/60' : 'border-primary/30'}`}
          animate={{
            scale: [1, 2 + ring, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: ring * 0.3,
          }}
        />
      ))}
      
      {/* Marker Dot */}
      <motion.div 
        className="relative w-6 h-6 rounded-full flex items-center justify-center"
        style={{
          background: isActive 
            ? 'hsl(42, 55%, 58%)' 
            : 'hsla(42, 55%, 58%, 0.8)',
          boxShadow: isActive 
            ? '0 0 40px 15px hsla(42, 55%, 58%, 0.6)' 
            : '0 0 30px 10px hsla(42, 55%, 58%, 0.4)',
        }}
        whileHover={{ scale: 1.3 }}
        animate={isActive ? { scale: 1.4 } : { scale: 1 }}
      >
        <MapPin size={14} className="text-foreground" />
      </motion.div>

      {/* Location Label */}
      <motion.div
        className="absolute left-10 top-1/2 -translate-y-1/2 whitespace-nowrap"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 + index * 0.1 }}
      >
        <div 
          className="px-3 py-1.5 rounded"
          style={{
            background: 'hsla(8, 27%, 10%, 0.8)',
            backdropFilter: 'blur(10px)',
            border: isActive ? '1px solid hsla(42, 55%, 58%, 0.5)' : '1px solid hsla(42, 55%, 58%, 0.2)',
          }}
        >
          <p className={`font-royal text-sm tracking-wide ${isActive ? 'text-primary' : 'text-primary/70'}`}>
            {location.name}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Property Overlay Panel Component
interface PropertyOverlayPanelProps {
  location: LocationMarker;
  onClose: () => void;
}

const PropertyOverlayPanel = ({ location, onClose }: PropertyOverlayPanelProps) => {
  // Enhanced location data with additional details
  const locationDetails = {
    "Palm Jumeirah": {
      highlights: ["Beachfront Villas", "Private Beach Access", "Marina Views", "World-Class Amenities"],
      propertyTypes: ["Signature Villas", "Penthouses", "Garden Homes"],
      description: "The iconic palm-shaped island offering unparalleled waterfront luxury living with stunning Arabian Gulf views.",
    },
    "Downtown Dubai": {
      highlights: ["Burj Khalifa Views", "Dubai Mall Access", "City Center Location", "Premium Lifestyle"],
      propertyTypes: ["Sky Residences", "Boulevard Apartments", "Luxury Lofts"],
      description: "The heart of Dubai's urban landscape, home to the world's tallest building and finest urban amenities.",
    },
    "Emirates Hills": {
      highlights: ["Golf Course Views", "Gated Community", "Mega Mansions", "Ultimate Privacy"],
      propertyTypes: ["Mansions", "Estate Villas", "Custom Homes"],
      description: "Dubai's most prestigious gated community, often called the Beverly Hills of Dubai.",
    },
    "The Pearl, Doha": {
      highlights: ["Marina Living", "Riviera Lifestyle", "Exclusive Island", "World-Class Dining"],
      propertyTypes: ["Waterfront Villas", "Marina Residences", "Townhouses"],
      description: "Qatar's premier man-made island offering Mediterranean-inspired luxury living.",
    },
  };

  const details = locationDetails[location.name as keyof typeof locationDetails] || {
    highlights: ["Luxury Living", "Premium Location", "Exclusive Access"],
    propertyTypes: ["Villas", "Apartments", "Penthouses"],
    description: location.description,
  };

  return (
    <motion.div
      className="absolute left-6 top-24 bottom-24 w-[380px] z-20"
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div 
        className="h-full rounded-lg overflow-hidden flex flex-col"
        style={{
          background: 'hsla(8, 27%, 10%, 0.85)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          border: '1px solid hsla(42, 55%, 58%, 0.3)',
          boxShadow: '0 20px 60px -20px hsla(0, 0%, 0%, 0.5)',
        }}
      >
        {/* Header Image */}
        <div className="relative h-48 overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${location.backgroundImage})` }}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/20 to-transparent" />
          
          {/* Live Badge */}
          <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-foreground/60 backdrop-blur-sm border border-green-400/30">
            <motion.div
              className="w-2 h-2 bg-green-400 rounded-full"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="font-body text-xs text-green-400 uppercase tracking-wider">Live Data</span>
          </div>

          {/* Location Name */}
          <div className="absolute bottom-4 left-5 right-5">
            <h3 className="font-royal text-2xl text-primary mb-1">{location.name}</h3>
            <p className="font-body text-sm text-secondary/60">{details.description}</p>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-5">
          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="text-center p-3 rounded border border-primary/20 bg-primary/5">
              <DollarSign size={18} className="text-primary mx-auto mb-2" />
              <p className="font-body text-[10px] text-secondary/50 uppercase tracking-wider mb-1">Avg. Price</p>
              <p className="font-royal text-lg text-primary">{location.avgPrice}</p>
            </div>
            <div className="text-center p-3 rounded border border-primary/20 bg-primary/5">
              <Building size={18} className="text-primary mx-auto mb-2" />
              <p className="font-body text-[10px] text-secondary/50 uppercase tracking-wider mb-1">Listings</p>
              <p className="font-royal text-lg text-secondary">{location.properties}</p>
            </div>
            <div className="text-center p-3 rounded border border-primary/20 bg-primary/5">
              <Home size={18} className="text-primary mx-auto mb-2" />
              <p className="font-body text-[10px] text-secondary/50 uppercase tracking-wider mb-1">Available</p>
              <p className="font-royal text-lg text-green-400">{location.availableUnits}</p>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mb-6" />

          {/* Highlights */}
          <div className="mb-6">
            <h4 className="font-royal text-sm text-primary/80 uppercase tracking-wider mb-3">Location Highlights</h4>
            <div className="flex flex-wrap gap-2">
              {details.highlights.map((highlight, index) => (
                <motion.span
                  key={highlight}
                  className="px-3 py-1.5 rounded-full text-xs font-body text-primary/80 border border-primary/20 bg-primary/5"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index }}
                >
                  {highlight}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Property Types */}
          <div className="mb-6">
            <h4 className="font-royal text-sm text-primary/80 uppercase tracking-wider mb-3">Property Types</h4>
            <div className="space-y-2">
              {details.propertyTypes.map((type, index) => (
                <motion.div
                  key={type}
                  className="flex items-center gap-3 p-3 rounded border border-primary/10 bg-primary/5 hover:border-primary/30 transition-colors cursor-pointer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 * index }}
                  whileHover={{ x: 5 }}
                >
                  <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                    <Home size={16} className="text-primary" />
                  </div>
                  <span className="font-body text-sm text-secondary/80">{type}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="p-5 border-t border-primary/20">
          <motion.button
            className="w-full py-3 rounded font-royal text-sm tracking-wider uppercase"
            style={{
              background: 'linear-gradient(135deg, hsl(42, 55%, 58%) 0%, hsl(38, 70%, 45%) 100%)',
              color: 'hsl(8, 27%, 12%)',
              boxShadow: '0 4px 20px hsla(42, 55%, 50%, 0.3)',
            }}
            whileHover={{ 
              scale: 1.02,
              boxShadow: '0 6px 30px hsla(42, 55%, 50%, 0.5)',
            }}
            whileTap={{ scale: 0.98 }}
          >
            View All {location.properties} Properties
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default FullscreenMapExplorer;
