import { useBoard } from "@/services";

export function ChessBoard() {
  const { board } = useBoard();
  const squares = Array.from({ length: 64 });

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-8 grid-rows-8 border-2 border-orange-900/60 shadow-2xl">
        {squares.map((_, index) => {
          const row = Math.floor(index / 8);
          const col = index % 8;
          const isLight = (row + col) % 2 === 0;
          const pieceData = board.find(p => p.key.row === row && p.key.column === col);

          return (
            <div
              key={index}
              className={`w-12 h-12 md:w-20 md:h-20 flex items-center justify-center relative
                ${isLight ? 'bg-orange-100' : 'bg-orange-700'}`}
            >
              {pieceData?.type && (
                <div className="flex flex-col items-center leading-none">
                  <span className={`font-bold ${pieceData.color === 'White' ? 'text-white drop-shadow-md' : 'text-black'}`}>
                    {pieceData.type}
                  </span>
                </div>
              )}
              <span className="text-[10px] text-black absolute bottom-0 right-1">
                {row}, {col}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}