//TODO Grab from db/accounts
//TODO Implement time control 
import { PrimaryContainer } from "@/components/ui";
import bgImage from '@/assets/avatar-1.webp';

interface ChessInfoProps {
  playerColor: string | null;
  playerName: string;
  playerTurn: string;
}

export function ChessPlayer({ playerColor, playerName, playerTurn }: ChessInfoProps) {

  return (
    <PrimaryContainer className="flex flex-col items-center justify-center">
      <div className="flex flex-row items-center gap-2 min-w-20">
        <span
          className={`w-16 h-16 rounded-full transition-all duration-500 shadow-lg inline-block bg-cover bg-center ring-2 ring-inset
            ${playerColor === "White"
              ? 'ring-white'
              : 'ring-black'
            }
          ${playerTurn === playerColor
              ? ''
              : ''
            }`}
          style={{ backgroundImage: `url(${bgImage})` }}
        />
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest opacity-60">
            {playerName}
          </p>
          <p className="text-xs text-amber-200 font-semibold uppercase tracking-widest opacity-60">
            Time: 5:00
          </p>
        </div>
      </div>
    </PrimaryContainer>
  );
}