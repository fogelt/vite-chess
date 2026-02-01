import { useState, useEffect } from "react";

const BOARD_API = import.meta.env.VITE_GET_BOARD_API

interface ChessPiece {
  key: {
    row: number;
    column: number;
  };
  type: string | null;
  color: string | null;
}

export function useBoard() {
  const [board, setBoard] = useState<ChessPiece[]>([]);

  useEffect(() => {
    async function fetchPiece() {
      try {
        const response = await fetch(BOARD_API);

        if (!response.ok) {
          throw new Error("Failed to fetch piece");
        }

        const data = await response.json();
        setBoard(data);
      } catch (error) {
        console.error("Error getting piece:", error);
      }
    }

    fetchPiece();
  }, []);

  return { board, setBoard };
}