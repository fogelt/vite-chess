import { PrimaryContainer } from "@/components/ui";
import bgImage from '@/assets/avatar-1.webp';

interface ChessInfoProps {
  playerColor: string | null;
  playerName?: string | null;
  elo?: number | null;
  reconnecting?: boolean;
  timeRemaining: string;
}

export function ChessPlayer({ playerColor, playerName, elo, timeRemaining, reconnecting }: ChessInfoProps) {
  return (
    <div className={`flex flex-row items-center justify-between w-full p-2 bg-slate-100/50 rounded-lg transition-opacity duration-300 ${reconnecting ? 'opacity-70' : 'opacity-100'}`}>
      <div className="flex flex-row items-center gap-3">
        <span
          className={`w-12 h-12 rounded-full transition-all duration-500 shadow-md bg-cover bg-center ring-2
            ${playerColor === "White" ? 'ring-white' : 'ring-black'}
            ${reconnecting ? 'grayscale contrast-50' : ''}`}
          style={{ backgroundImage: `url(${bgImage})` }}
        />

        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <p className="text-sm font-bold uppercase tracking-tight text-black/60">
              {playerName}
            </p>

            {reconnecting && (
              <span className="flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
            )}
          </div>

          {reconnecting ? (
            <p className="text-[10px] font-bold text-red-500 uppercase animate-pulse">
              Reconnecting...
            </p>
          ) : (
            <p className="text-sm font-light tracking-[0.1em] text-black/60">
              {elo != null ? `Rating: ${elo}` : 'Unrated'}
            </p>
          )}
        </div>
      </div>

      <PrimaryContainer className={`ml-auto px-4 py-2 rounded-md shadow-inner transition-colors ${reconnecting ? 'bg-slate-400/50' : ''}`}>
        <p className="text-lg font-mono text-white/60 tracking-tighter">
          {timeRemaining}
        </p>
      </PrimaryContainer>
    </div>
  );
}