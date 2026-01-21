interface GoldenArchwayProps {
  children: React.ReactNode;
  className?: string;
}

const GoldenArchway = ({ children, className = "" }: GoldenArchwayProps) => {
  return (
    <div className={`relative ${className}`}>
      {/* Outer archway frame */}
      <div className="absolute inset-0 archway-frame pointer-events-none" />
      
      {/* Corner ornaments */}
      <svg className="absolute top-0 left-0 w-16 h-16 text-primary opacity-60" viewBox="0 0 64 64" fill="none">
        <path d="M4 4 L4 24 Q4 4, 24 4" stroke="currentColor" strokeWidth="2" fill="none" />
        <circle cx="14" cy="14" r="3" fill="currentColor" opacity="0.5" />
      </svg>
      <svg className="absolute top-0 right-0 w-16 h-16 text-primary opacity-60 rotate-90" viewBox="0 0 64 64" fill="none">
        <path d="M4 4 L4 24 Q4 4, 24 4" stroke="currentColor" strokeWidth="2" fill="none" />
        <circle cx="14" cy="14" r="3" fill="currentColor" opacity="0.5" />
      </svg>
      <svg className="absolute bottom-0 left-0 w-16 h-16 text-primary opacity-60 -rotate-90" viewBox="0 0 64 64" fill="none">
        <path d="M4 4 L4 24 Q4 4, 24 4" stroke="currentColor" strokeWidth="2" fill="none" />
        <circle cx="14" cy="14" r="3" fill="currentColor" opacity="0.5" />
      </svg>
      <svg className="absolute bottom-0 right-0 w-16 h-16 text-primary opacity-60 rotate-180" viewBox="0 0 64 64" fill="none">
        <path d="M4 4 L4 24 Q4 4, 24 4" stroke="currentColor" strokeWidth="2" fill="none" />
        <circle cx="14" cy="14" r="3" fill="currentColor" opacity="0.5" />
      </svg>

      {/* Inner glow */}
      <div className="absolute inset-4 bg-gradient-to-b from-primary/5 via-transparent to-primary/5 pointer-events-none rounded-t-archway" />
      
      {children}
    </div>
  );
};

export default GoldenArchway;
