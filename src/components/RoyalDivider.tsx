interface RoyalDividerProps {
  className?: string;
}

const RoyalDivider = ({ className = "" }: RoyalDividerProps) => {
  return (
    <div className={`royal-divider py-4 ${className}`}>
      <svg width="24" height="24" viewBox="0 0 24 24" className="text-primary">
        <path
          d="M12 2L14 8L20 8L15 12L17 18L12 14L7 18L9 12L4 8L10 8Z"
          fill="currentColor"
          opacity="0.8"
        />
      </svg>
    </div>
  );
};

export default RoyalDivider;
