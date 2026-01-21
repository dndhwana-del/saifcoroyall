import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  intensity?: "light" | "medium" | "heavy";
}

const GlassPanel = ({ children, className, intensity = "medium" }: GlassPanelProps) => {
  const intensityClasses = {
    light: "bg-espresso/40 backdrop-blur-sm border-gold/10",
    medium: "bg-espresso/60 backdrop-blur-md border-gold/20",
    heavy: "bg-espresso/80 backdrop-blur-xl border-gold/30",
  };

  return (
    <div
      className={cn(
        "relative border rounded-sm",
        intensityClasses[intensity],
        className
      )}
    >
      {/* Inner glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-bronze/5 pointer-events-none rounded-sm" />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default GlassPanel;
