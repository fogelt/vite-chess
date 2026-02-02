import { PrimaryContainer } from "@/components/ui";

interface ChessInfoProps {
  playerTurn: string;
}

export function ChessInfo({ playerTurn }: ChessInfoProps) {

  return (
    <PrimaryContainer className="flex items-center justify-center p-4">
      <div className="flex flex-col items-center gap-2">
        <span
          className={`w-10 h-10 rounded-full border-2 transition-all duration-500 shadow-lg inline-block
            ${playerTurn === "White"
              ? 'bg-white border-slate-200'
              : 'bg-slate-900 border-slate-700'
            }`}
        />
        <p className="text-xs font-semibold uppercase tracking-widest opacity-60">
          {playerTurn} to move
        </p>
      </div>
    </PrimaryContainer>
  );
}