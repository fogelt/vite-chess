interface PrimaryContainerProps {
  className?: string;
  children?: React.ReactNode
}

export function PrimaryContainer({ className, children }: PrimaryContainerProps) {
  return (
    <div className={`bg-gray-600/30 rounded-3xl ring-2 ring-white/50 backdrop-blur-sm p-5 shadow-2xl ${className}`}>
      {children}
    </div>
  );
}