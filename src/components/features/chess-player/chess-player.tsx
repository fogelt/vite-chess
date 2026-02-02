import { PrimaryContainer } from "@/components/ui";

interface ChessInfoProps {
  playerColor: string;
  playerName: string;
  playerTurn: string;
}

export function ChessPlayer({ playerColor, playerName, playerTurn }: ChessInfoProps) {

  return (
    <PrimaryContainer className="flex items-center justify-center">
      <div className="flex flex-col items-center gap-2 min-w-20">
        <span
          className={`w-10 h-10 rounded-full transition-all duration-500 shadow-lg inline-block
            ${playerColor === "White"
              ? 'bg-white'
              : 'bg-black'
            }
          ${playerTurn === playerColor
              ? 'ring-2 ring-emerald-500'
              : ''
            }`}
        />
        <p className="text-xs font-semibold uppercase tracking-widest opacity-60">
          {playerName}
        </p>
      </div>
    </PrimaryContainer>
  );
}