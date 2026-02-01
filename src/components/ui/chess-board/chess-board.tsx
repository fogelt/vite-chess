import { useBoard } from "@/services";
import { ChessRook, ChessKnight, ChessBishop, ChessKing, ChessQueen, ChessPawn } from "lucide-react";

const PIECE_ICONS: Record<string, React.ElementType> = {
  Pawn: ChessPawn,
  Rook: ChessRook,
  Knight: ChessKnight,
  Bishop: ChessBishop,
  Queen: ChessQueen,
  King: ChessKing,
};

export function ChessBoard() {
  const { board } = useBoard();
  const squares = Array.from({ length: 64 });

  return (
    <div className="flex flex-col items-center p-8">
      <div className="grid grid-cols-8 grid-rows-8 ring-2 ring-white/60 shadow-2xl">
        {squares.map((_, index) => {
          const row = Math.floor(index / 8);
          const col = index % 8;
          const isLight = (row + col) % 2 === 0;

          const pieceData = board.find(p => p.key.row === row && p.key.column === col);
          const PieceIcon = pieceData?.type ? PIECE_ICONS[pieceData.type] : null;

          return (
            <div
              key={index}
              className={`w-12 h-12 md:w-20 md:h-20 flex items-center justify-center relative transition-colors
                ${isLight ? 'bg-white/40' : 'bg-black/40'}`}
            >
              {PieceIcon && (
                <PieceIcon
                  size={32}
                  className={`
                    ${pieceData?.color === 'White'
                      ? 'stroke-white'
                      : 'stroke-slate-900'}
                  `}
                />
              )}

              <span className="text-[10px] text-black absolute bottom-1 right-1 select-none">
                {row}, {col}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}