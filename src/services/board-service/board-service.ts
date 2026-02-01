import { useState, useEffect } from "react";

const BOARD_API = import.meta.env.VITE_GET_BOARD_API
const START_API = import.meta.env.VITE_START_GAME_API

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
      const response = await fetch(START_API, {
        method: "POST"
      });

      if (!response.ok) {
        throw new Error("Failed to initialize game");
      }

    } catch (error) {
      console.error("Could not post start:", error);
      throw error;
    }
  };

  return { startGame };
}

export function useBoard() {
  const [board, setBoard] = useState<ChessPiece[]>([]);

  useEffect(() => {
    async function fetchPiece() {
      try {
        const response = await fetch(BOARD_API, {
          cache: 'no-store'
        });

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