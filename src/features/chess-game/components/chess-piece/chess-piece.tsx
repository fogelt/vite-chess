import { ChessRook, ChessKnight, ChessBishop, ChessKing, ChessQueen, ChessPawn } from "lucide-react";
import { useDraggable } from '@dnd-kit/core';

const PIECE_ICONS: Record<string, React.ElementType> = {
  Pawn: ChessPawn,
  Rook: ChessRook,
  Knight: ChessKnight,
  Bishop: ChessBishop,
  Queen: ChessQueen,
  King: ChessKing,
};

export function ChessPiece({ type, color, id }: { type: string, color: string, id: string }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: id,
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    cursor: 'grabbing',
  } : undefined;

  const Icon = PIECE_ICONS[type];

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`z-50 ${isDragging ? 'opacity-50' : ''} cursor-grab active:cursor-grabbing`}
    >
      <Icon size={40} className={color === 'White' ? 'stroke-white' : 'stroke-black'} />
    </div>
  );
}