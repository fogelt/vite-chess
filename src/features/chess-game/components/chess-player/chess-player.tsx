//TODO Implement time control 
import { PrimaryContainer } from "@/components/ui";
import bgImage from '@/assets/avatar-1.webp';

interface ChessInfoProps {
  playerColor: string | null;
  playerName: string;
  elo: string;
}

export function ChessPlayer({ playerColor, playerName, elo }: ChessInfoProps) {
  return (
    <div className="flex flex-row items-center justify-between w-full p-2 bg-slate-100/50 rounded-lg">
      <div className="flex flex-row items-center gap-3">
        <span
          className={`w-12 h-12 rounded-full transition-all duration-500 shadow-md bg-cover bg-center ring-2
            ${playerColor === "White" ? 'ring-white' : 'ring-black'}`}
          style={{ backgroundImage: `url(${bgImage})` }}
        />
        <div className="flex flex-col">
          <p className="text-sm font-bold uppercase tracking-tight text-black/60">
            {playerName}
          </p>
          <p className="text-sm font-light tracking-[0.1em] text-black/60">
            Rating: {elo}
          </p>
        </div>
      </div>

      <PrimaryContainer className="ml-auto px-4 py-2 rounded-md shadow-inner">
        <p className="text-lg font-mono text-white/60 tracking-tighter">
          05:00
        </p>
      </PrimaryContainer>

    </div>
  );
}