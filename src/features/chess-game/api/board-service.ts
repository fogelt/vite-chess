import { useState } from "react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface ChessPiece {
  key: {
    row: number;
    column: number;
  };
  type: string | null;
  color: string | null;
}

export function useStart() {
  const startGame = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/game/start-game`, {
        method: "POST"
      });

      if (!response.ok) throw new Error("Failed to initialize game");

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Could not post start:", error);
      throw error;
    }
  };

  return { startGame };
}

export function useBoard() {
  const [board, setBoard] = useState<ChessPiece[]>([]);

  const fetchBoard = async (gameId: string) => {
    if (!gameId) return;
    try {
      const response = await fetch(`${BASE_URL}/api/game/${gameId}/board`, {
        cache: 'no-store'
      });

      if (!response.ok) throw new Error("Failed to fetch board");

      const data = await response.json();
      setBoard(data);
      return data;
    } catch (error) {
      console.error("Error getting board:", error);
    }
  };

  return { board, setBoard, fetchBoard };
}