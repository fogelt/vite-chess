import { useState, useCallback } from "react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface ChessPiece {
  key: { row: number; column: number; };
  type: string | null;
  color: string | null;
}

export function useBoard() {
  const [board, setBoard] = useState<ChessPiece[]>([]);

  const fetchBoard = useCallback(async (gameId: string) => {
    if (!gameId) return;
    try {
      const response = await fetch(`${BASE_URL}/api/game/${gameId}/board`, {
        cache: 'no-store'
      });
      if (!response.ok) throw new Error("Failed to fetch board");

      const data = await response.json();
      setBoard(data.board);
      return data;
    } catch (error) {
      console.error("Error getting board:", error);
    }
  }, []);

  return { board, setBoard, fetchBoard };
}