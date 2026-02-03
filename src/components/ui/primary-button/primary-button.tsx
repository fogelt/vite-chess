interface PrimaryButtonProps {
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  border?: boolean;
}

export function PrimaryButton({ className, children, onClick, border = true }: PrimaryButtonProps) {
  return (
    <button className={`
      ${border ? 'ring-2 ring-slate-200 rounded-md shadow-xl bg-slate-400' : ''}
      hover:text-white
      whitespace-nowrap

      uppercase tracking-[0.2em] font-light text-white/50
      hover:scale-[0.98] duration-300
      text-2xl p-3 
      ${className}`}
      onClick={onClick}>
      {children}
    </button>
  );
}