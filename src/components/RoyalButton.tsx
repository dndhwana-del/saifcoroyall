import { forwardRef } from "react";

interface RoyalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const RoyalButton = forwardRef<HTMLButtonElement, RoyalButtonProps>(
  ({ variant = "primary", size = "md", children, className = "", ...props }, ref) => {
    const baseStyles = "relative inline-flex items-center justify-center font-royal tracking-[0.15em] uppercase transition-all duration-500 ease-out overflow-hidden";
    
    const variants = {
      primary: "btn-royal",
      secondary: "bg-card border border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50",
      outline: "border-2 border-primary text-primary hover:bg-primary hover:text-accent-foreground",
    };

    const sizes = {
      sm: "px-6 py-2 text-xs",
      md: "px-8 py-3 text-sm",
      lg: "px-12 py-4 text-base",
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        <span className="relative z-10">{children}</span>
      </button>
    );
  }
);

RoyalButton.displayName = "RoyalButton";

export default RoyalButton;
