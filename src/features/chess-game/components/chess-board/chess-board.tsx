import { ChessPiece, ChessSquare } from "@/features";
import { useState } from "react";
import { DndContext, DragStartEvent, DragEndEvent } from '@dnd-kit/core';

interface Move {
  row: number;
  column: number;
}

interface ChessBoardProps {
  board: any[];
  setBoard: (board: any[]) => void;
  fetchMoves: (r: number, c: number) => Promise<Move[] | undefined>;
  availableMoves: Move[];
  setAvailableMoves: (moves: Move[]) => void;
  makeMove: (from: Move, to: Move) => Promise<any>;
}

export function ChessBoard({ board, setBoard, fetchMoves, availableMoves, setAvailableMoves, makeMove, isFlipped = false }: ChessBoardProps & { isFlipped?: boolean }) {
  const [selectedPos, setSelectedPos] = useState<{ r: number, c: number } | null>(null);

  const handleSquareClick = async (row: number, col: number) => {
    const isDestination = availableMoves.some(m => m.row === row && m.column === col);

    if (selectedPos && isDestination) {
      const updatedBoard = await makeMove(
        { row: selectedPos.r, column: selectedPos.c },
        { row: row, column: col }
      );
      if (updatedBoard) setBoard(updatedBoard);

      setSelectedPos(null);
      setAvailableMoves([]);
      return;
    }

    const clickedPiece = board.find(p => p.key.row === row && p.key.column === col);

    if (clickedPiece?.type) {
      if (selectedPos?.r === row && selectedPos?.c === col) {
        setSelectedPos(null);
        setAvailableMoves([]);
      } else {
        setSelectedPos({ r: row, c: col });
        await fetchMoves(row, col);
      }
    } else {
      setSelectedPos(null);
      setAvailableMoves([]);
    }
  };

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
    const hasMoved = toRow !== fromRow || toCol !== fromCol;

    if (hasMoved) {
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
    }
  };

  return (
    <div className="flex flex-col items-center p-2">
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} >
        <div className="grid grid-cols-8 grid-rows-8 ring-2 ring-white/60 shadow-2xl">
          {Array.from({ length: 64 }).map((_, index) => {
            let row = Math.floor(index / 8);
            let col = index % 8;

            if (isFlipped) {
              row = 7 - row;
              col = 7 - col;
            }

            const pieceData = board.find(p => p.key.row === row && p.key.column === col);
            const isAvailableMove = availableMoves.some(m => m.row === row && m.column === col);
            const isSelected = selectedPos?.r === row && selectedPos?.c === col;

            return (
              <ChessSquare
                key={`${row}-${col}`}
                id={`square-${row}-${col}`}
                row={row}
                col={col}
                isAvailableMove={isAvailableMove}
                isSelected={isSelected}
                onClick={() => handleSquareClick(row, col)}
              >
                {pieceData?.type && (
                  <ChessPiece
                    id={`piece-${row}-${col}`}
                    type={pieceData.type}
                    color={pieceData.color || 'White'}
                    onClick={() => handleSquareClick(row, col)}
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