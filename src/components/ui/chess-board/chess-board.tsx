import { usePieces } from "@/services";

export function ChessBoard() {
  const { piece } = usePieces();
  const squares = Array.from({ length: 64 });

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-8 grid-rows-8 border-2 border-orange-900/60 shadow-2xl">
        {squares.map((_, index) => {
          const row = Math.floor(index / 8);
          const col = index % 8;
          const isLight = (row + col) % 2 === 0;

          return (
            <div
              key={index}
              className={`
                w-12 h-12 md:w-20 md:h-20 
                flex items-center justify-center
                ${isLight ? 'bg-orange-100' : 'bg-orange-700'}
              `}
            >
              <span className="text-xs text-black/50 absolute">
                {row},{col} {piece}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}