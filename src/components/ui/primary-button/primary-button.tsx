interface PrimaryButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export function PrimaryButton({ className, children }: PrimaryButtonProps) {
  return (
    <button className={`      
      hover:text-white

      uppercase tracking-[0.2em] font-light text-white/50
      hover:scale-[0.98] duration-300
      text-2xl p-3 
      ${className}`}>
      {children}
    </button>
  );
}