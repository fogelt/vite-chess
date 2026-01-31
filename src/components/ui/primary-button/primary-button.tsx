interface PrimaryButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export function PrimaryButton({ className, children }: PrimaryButtonProps) {
  return (
    <button className={`border-b-[2px] border-b-orange-700 border-t-orange-500 border-t-[2px]
      border-x-[2px] border-x-orange-500 uppercase tracking-[0.2em]
      font-bold text-orange-100 hover:scale-[0.98] duration-200 hover:border-b-[1px]
      hover:border-t-[1px] hover:border-x-[1px]
      hover:border-t-orange-700 hover:border-x-orange-700
      bg-orange-600 shadow-xl text-6xl hover:shadow-lg rounded-lg px-10 p-3 ${className}`}>
      {children}
    </button>
  );
}