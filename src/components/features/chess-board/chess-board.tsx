import { useBoard, useMoves } from "@/services";
import { ChessPiece, ChessSquare } from "@/components/features";
import { useState } from "react";
import { DndContext, DragStartEvent, DragEndEvent } from '@dnd-kit/core';

export function ChessBoard() {
  const { board, setBoard } = useBoard();
  const { fetchMoves, availableMoves, setAvailableMoves, makeMove } = useMoves();
  const [selectedPos, setSelectedPos] = useState<{ r: number, c: number } | null>(null);

  const handleDragStart = async (event: DragStartEvent) => {
    const id = event.active.id as string;
    const [row, col] = id.replace('piece-', '').split('-').map(Number);

    setSelectedPos({ r: row, c: col });
    await fetchMoves(row, col);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      setSelectedPos(null);
      setAvailableMoves([]);
      return;
    }

    const [toRow, toCol] = (over.id as string).replace('square-', '').split('-').map(Number);
    const [fromRow, fromCol] = (active.id as string).replace('piece-', '').split('-').map(Number);

    const isAvailableMove = availableMoves.some(m => m.row === toRow && m.column === toCol);

    if (isAvailableMove) {
      const updatedBoard = await makeMove(
        { row: fromRow, column: fromCol },
        { row: toRow, column: toCol }
      );
      if (updatedBoard) setBoard(updatedBoard);
    }

    setSelectedPos(null);
    setAvailableMoves([]);
  };

  return (
    <div className="flex flex-col items-center p-8">
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-8 grid-rows-8 ring-2 ring-white/60 shadow-2xl">
          {Array.from({ length: 64 }).map((_, index) => {
            const row = Math.floor(index / 8);
            const col = index % 8;
            const pieceData = board.find(p => p.key.row === row && p.key.column === col);
            const isAvailableMove = availableMoves.some(m => m.row === row && m.column === col);

            return (
              <ChessSquare
                key={`${row}-${col}`}
                id={`square-${row}-${col}`}
                row={row}
                col={col}
                isAvailableMove={isAvailableMove}
              >
                {pieceData?.type && (
                  <ChessPiece
                    id={`piece-${row}-${col}`}
                    type={pieceData.type}
                    color={pieceData.color || 'White'}
                  />
                )}
              </ChessSquare>
            );
          })}
        </div>
      </DndContext>
    </div>
  );
}