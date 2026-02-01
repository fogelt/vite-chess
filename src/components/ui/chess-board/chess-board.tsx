import { useBoard, useMoves } from "@/services";
import { ChessPiece } from "@/components/features";
import { useState } from "react";

export function ChessBoard() {
  const { board } = useBoard();
  const { fetchMoves, availableMoves, setAvailableMoves } = useMoves();
  const squares = Array.from({ length: 64 });
  const [selectedPos, setSelectedPos] = useState<{ r: number, c: number } | null>(null);

  const handleShowMoves = async (row: number, col: number) => {
    if (selectedPos?.r === row && selectedPos?.c === col) {
      setSelectedPos(null);
      setAvailableMoves([]);
      return;
    }

    setSelectedPos({ r: row, c: col });
    await fetchMoves(row, col);
  };

  return (
    <div className="flex flex-col items-center p-8">
      <div className="grid grid-cols-8 grid-rows-8 ring-2 ring-white/60 shadow-2xl bg-orange-900/20">
        {squares.map((_, index) => {
          const row = Math.floor(index / 8);
          const col = index % 8;
          const isLight = (row + col) % 2 === 0;

          const pieceData = board.find(p => p.key.row === row && p.key.column === col);
          const isAvailableMove = availableMoves.some(m => m.row === row && m.column === col);
          const isSelected = selectedPos?.r === row && selectedPos?.c === col;

          return (
            <div
              key={index}
              className={`w-12 h-12 md:w-20 md:h-20 flex items-center justify-center relative transition-all
                ${isLight ? 'bg-orange-100/90' : 'bg-orange-800/80'}
                ${isSelected ? 'ring-4 ring-emerald-600 ring-inset bg-emerald-400' : ''}
              `}
            >
              {pieceData?.type && (
                <ChessPiece
                  type={pieceData.type}
                  color={pieceData.color || 'White'}
                  onClick={() => handleShowMoves(row, col)}
                />
              )}

              {isAvailableMove && (
                <div className="absolute w-4 h-4 md:w-6 md:h-6 bg-black/20 rounded-full pointer-events-none z-10" />
              )}

              <span className="text-[10px] text-black/30 absolute bottom-1 right-1 select-none pointer-events-none">
                {row},{col}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}