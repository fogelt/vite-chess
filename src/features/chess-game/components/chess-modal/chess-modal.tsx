import { PrimaryContainer } from "@/components/ui";

interface ChessModalProps {
  className?: string;
  children?: React.ReactNode;
}

export function ChessModal({ className, children }: ChessModalProps) {
  return (
    <div className="absolute inset-0 z-[100] flex items-center justify-center">
      <PrimaryContainer className={`min-w-[300px] p-8 text-center ${className}`}>
        <div className="text-lg font-bold">
          {children}
        </div>
      </PrimaryContainer>
    </div>
  );
}