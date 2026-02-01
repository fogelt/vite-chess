import { ChessRook, ChessKnight, ChessBishop, ChessKing, ChessQueen, ChessPawn } from "lucide-react";

const PIECE_ICONS: Record<string, React.ElementType> = {
  Pawn: ChessPawn,
  Rook: ChessRook,
  Knight: ChessKnight,
  Bishop: ChessBishop,
  Queen: ChessQueen,
  King: ChessKing,
};

interface PieceProps {
  type: string;
  color: string;
  onClick: () => void;
}

export function ChessPiece({ type, color, onClick }: PieceProps) {
  const Icon = PIECE_ICONS[type];
  if (!Icon) return null;

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="w-full h-full flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
    >
      <Icon
        size={40}
        className={`${color === 'White'
          ? 'stroke-white'
          : 'stroke-black'
          }`}
      />
    </button>
  );
}