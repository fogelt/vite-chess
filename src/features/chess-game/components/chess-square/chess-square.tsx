import { useDroppable } from '@dnd-kit/core';

export function ChessSquare({ row, col, children, isAvailableMove }: any) {
  const { setNodeRef, isOver } = useDroppable({
    id: `${row}-${col}`,
  });

  return (
    <div
      ref={setNodeRef}
      className={`w-20 h-20 flex items-center justify-center relative
        ${(row + col) % 2 === 0 ? 'bg-white/30' : 'bg-black/30'}
        ${isOver && isAvailableMove ? 'ring-2 ring-white ring-inset' : ''}
      `}
    >
      {children}
      {isAvailableMove && (
        <div className="absolute w-4 h-4 md:w-6 md:h-6 bg-black/20 ring-1 ring-white/40 rounded-full pointer-events-none" />
      )}
    </div>
  );
}